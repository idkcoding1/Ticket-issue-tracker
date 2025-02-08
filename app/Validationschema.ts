import z from "zod";

export const IssueTracker = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(5, 'Description is required')
});
