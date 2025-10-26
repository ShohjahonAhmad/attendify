import z from 'zod';
export const CuratorSchema = z.object({
    id: z.number().int().nonnegative().optional(),
    firstName: z.string().min(3, "First name must be at least 3 characters").max(30, "First name must be at most 30 characters"),
    lastName: z.string().min(3, "Last name must be at least 3 characters").max(30, "Last name must be at most 30 characters"),
    email: z.email("Invalid email format"),
    uniqueIdentifier: z.string().min(3, "Unique identifier required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    institution: z.string().min(2, "Insitution name required"),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
});
export const CreateCurator = CuratorSchema.pick({
    firstName: true,
    lastName: true,
    email: true,
    uniqueIdentifier: true,
    password: true,
    institution: true
}).strict();
export const LoginCurator = CuratorSchema.pick({
    email: true,
    password: true
}).strict();
export const CourseSchema = z.object({
    id: z.number().int().nonnegative().optional(),
    name: z.string().min(3, "Course name must be at least 3 characters"),
    curatorId: z.number().int().nonnegative().optional(),
    createdAt: z.coerce.date().optional(),
});
export const CreateCourse = CourseSchema.pick({
    name: true
}).strict();
