import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values"
import { paginationOptsValidator } from "convex/server";

export const create = mutation({
    args: { title: v.optional(v.string()), intialContent: v.optional(v.string()) },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if (!user) {
            throw new ConvexError("Unauthorized")
        }
        return await ctx.db.insert("documents", {
            title: args.title ?? "Untitiled Document",
            ownerId: user.subject,
            initialContent: args.intialContent
        })
    }
});

export const get = query({
    args: { paginationOpts: paginationOptsValidator },
    handler: async (ctx, args) => {
        return await ctx.db.query("documents").paginate(args.paginationOpts)
        // do something with `tasks`
    },
});
export const removeId = mutation({
    args: { id: v.id("documents") },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();
        if (!user) {
            throw new ConvexError("Unauthorized")
        }
        const document = await ctx.db.get(args.id);
        if (!document) {
            throw new ConvexError("Document not found");
        }
        const isOwner = document.ownerId === user.subject;
        if (!isOwner) {
            throw new ConvexError("Unauthorized");
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
        const document = await ctx.db.get(args.id);
        if (!document) {
            throw new ConvexError("Document not found");
        }

        const isOwner = document.ownerId === user.subject;
        if (!isOwner) {
            throw new ConvexError("Unauthorized");
        }
        return ctx.db.patch(args.id, { title: args.title });
    }
})