export const templates = [
    {
        id: "blank",
        label: "Blank Document",
        imageUrl: "/blank-document.svg",
        intialContent: `<p></p>` // Blank template with no content
    },
    {
        id: "software-proposal",
        label: "Software Development Proposal",
        imageUrl: "/software-proposal.svg",
        intialContent: `
            <h1>Software Development Proposal</h1>
            <h2>Project Name</h2>
            <p>Provide a brief description of the project goals and scope here.</p>
            <h3>Introduction</h3>
            <p>Explain the purpose of this proposal and provide an overview of your expertise.</p>
            <h3>Project Scope</h3>
            <ul>
                <li>Requirement Gathering</li>
                <li>Design and Development</li>
                <li>Testing and Quality Assurance</li>
                <li>Deployment and Maintenance</li>
            </ul>
            <h3>Timeline</h3>
            <p>Provide an estimated timeline for each phase of the project.</p>
            <h3>Budget</h3>
            <p>Include a detailed breakdown of project costs here.</p>
        `
    },
    {
        id: "project-proposal",
        label: "Project Proposal",
        imageUrl: "/project-proposal.svg",
        intialContent: `
            <h1>Project Proposal</h1>
            <h2>Project Title</h2>
            <p>Provide a concise description of the project here.</p>
            <h3>Objective</h3>
            <p>State the goals and objectives of the project.</p>
            <h3>Scope</h3>
            <p>Define what the project includes and excludes.</p>
            <h3>Deliverables</h3>
            <ul>
                <li>Deliverable 1</li>
                <li>Deliverable 2</li>
                <li>Deliverable 3</li>
            </ul>
            <h3>Timeline</h3>
            <p>Provide the expected schedule for project completion.</p>
        `
    },
    {
        id: "business-letter",
        label: "Business Letter",
        imageUrl: "/business-letter.svg",
        intialContent: `
            <p>[Your Name]</p>
            <p>[Your Address]</p>
            <p>[City, State, ZIP Code]</p>
            <p>[Date]</p>
            <p>[Recipient Name]</p>
            <p>[Recipient Address]</p>
            <p>[City, State, ZIP Code]</p>
            <p>Dear [Recipient Name],</p>
            <p>Write your letter content here. Be professional and concise.</p>
            <p>Best regards,</p>
            <p>[Your Name]</p>
        `
    },
    {
        id: "resume",
        label: "Resume",
        imageUrl: "/resume.svg",
        intialContent: `
            <h1>[Your Name]</h1>
            <p>[Your Contact Information]</p>
            <h2>Professional Summary</h2>
            <p>Provide a brief overview of your skills, experience, and career goals.</p>
            <h2>Experience</h2>
            <h3>[Job Title]</h3>
            <p>[Company Name], [Start Date] - [End Date]</p>
            <ul>
                <li>Responsibility 1</li>
                <li>Responsibility 2</li>
                <li>Responsibility 3</li>
            </ul>
            <h2>Education</h2>
            <h3>[Degree]</h3>
            <p>[School Name], [Graduation Year]</p>
        `
    },
    {
        id: "cover-letter",
        label: "Cover Letter",
        imageUrl: "/cover-letter.svg",
        intialContent: `
            <p>[Your Name]</p>
            <p>[Your Address]</p>
            <p>[City, State, ZIP Code]</p>
            <p>[Date]</p>
            <p>[Recipient Name]</p>
            <p>[Recipient Address]</p>
            <p>[City, State, ZIP Code]</p>
            <p>Dear [Recipient Name],</p>
            <p>I am writing to express my interest in the [Position Title] at [Company Name].</p>
            <p>[Write about your relevant skills, experience, and passion for the role here.]</p>
            <p>Thank you for considering my application. I look forward to the opportunity to discuss how my skills align with the needs of your team.</p>
            <p>Sincerely,</p>
            <p>[Your Name]</p>
        `
    },
    {
        id: "letter",
        label: "Letter",
        imageUrl: "/letter.svg",
        intialContent: `
            <p>[Your Name]</p>
            <p>[Your Address]</p>
            <p>[City, State, ZIP Code]</p>
            <p>[Date]</p>
            <p>[Recipient Name]</p>
            <p>[Recipient Address]</p>
            <p>[City, State, ZIP Code]</p>
            <p>Dear [Recipient Name],</p>
            <p>Write your letter content here.</p>
            <p>Sincerely,</p>
            <p>[Your Name]</p>
        `
    }
];
