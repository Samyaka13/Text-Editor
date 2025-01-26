import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values"
import { paginationOptsValidator } from "convex/server";

export const getByIds = query({
    args: { ids: v.array(v.id("documents")) },
    handler: async (ctx, { ids }) => {
        const documents = [];
        for (const id of ids) {
            const document = await ctx.db.get(id);
            if (document) {
                documents.push({ id: document._id, name: document.title })
            } else {
                documents.push({ id, name: "[Removed]" })
            }
        }
        return documents;
    }
})

export const create = mutation({
    args: { title: v.optional(v.string()), intialContent: v.optional(v.string()) },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if (!user) {
            throw new ConvexError("Unauthorized")
        }

        const organizationId = (user.organization_id ?? undefined) as string | undefined;
        return await ctx.db.insert("documents", {
            title: args.title ?? "Untitiled Document",
            ownerId: user.subject,
            organizationId,
            initialContent: args.intialContent
        })
    }
});

export const get = query({
    args: { paginationOpts: paginationOptsValidator, search: v.optional(v.string()) },
    handler: async (ctx, { search, paginationOpts }) => {
        const user = await ctx.auth.getUserIdentity();
        if (!user) {
            throw new ConvexError("Unauthorized")
        }
        console.log(user);
        const orgRole = (user.organization_role ?? undefined) as string | undefined;


        const organizationId = (user.organization_id ?? undefined) as string | undefined

        //for search within organisation
        if (search && organizationId) {
            return await ctx.db
                .query("documents")
                .withSearchIndex("search_title",
                    (q) => q.search("title", search).eq("organizationId", organizationId))
                .paginate(paginationOpts)
        }

        //for search within user
        if (search) {
            return await ctx.db
                .query("documents")
                .withSearchIndex("search_title", (q) =>
                    q.search("title", search).eq("ownerId", user.subject)
                )
                .paginate(paginationOpts)
        }

        //for representing all the documents within organisation
        if (organizationId) {
            return await ctx.db.query("documents")
                .withIndex("by_organization_id", (q) => q.eq("organizationId", organizationId))
                .paginate(paginationOpts);
        }

        //for representing all the documents within user
        return await ctx.db.query("documents").
            withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject)).
            paginate(paginationOpts)
        // do something with `tasks`
    },
});
export const removeId = mutation({
    args: { id: v.id("documents") },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new ConvexError("You are not the owner of this document and neither you are the admin of this organization")
        }
        const organizationId = (user.organization_id ?? undefined) as string | undefined;
        const orgRole = (user.organization_role ?? undefined) as string | undefined;
        const document = await ctx.db.get(args.id);
        if (!document) {
            throw new ConvexError("Document not found");
        }


        const isOwner = document.ownerId === user.subject;


        //ToDO: Make the changes who can remove from the organisation and who cannot (Members cannot and Admins can)

        if (!isOwner && !organizationId) {
            throw new ConvexError("Unauthorized");
        }
        if (orgRole === "org:member") {
            if (!isOwner) {
                throw new ConvexError("Member can only delete files that they have created");
            }
        }
        return await ctx.db.delete(args.id);
    },
});
export const updateById = mutation({
    args: { id: v.id("documents"), title: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if (!user) {
            throw new ConvexError("Unauthorized")
        }
        const organizationId = (user.organization_id ?? undefined) as string | undefined
        const document = await ctx.db.get(args.id);
        if (!document) {
            throw new ConvexError("Document not found");
        }

        const isOwner = document.ownerId === user.subject;
        const isOrganizationMember = !!(document.organizationId && document.organizationId === organizationId); // this checks if there is a document.organization id then compare
        if (!isOrganizationMember && !isOwner) {
            throw new ConvexError("Unauthorized")
        }

        return ctx.db.patch(args.id, { title: args.title });
    }
});

export const getById = query({
    args: { id: v.id("documents") },
    handler: async (ctx, { id }) => {
        const document = await ctx.db.get(id);
        if (!document) throw new ConvexError("Document not found");
        return document;
    },
});