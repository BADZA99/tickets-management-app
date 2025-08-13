import {z} from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "name is required").max(255),
  username: z.string().min(3, "username is required").max(255),
  password: z.string().min(6, "Password must be at least 6 characters long").max(255).optional().or(z.literal("")),
  role: z.string().min(3, "role is required").max(10),
  priority: z.string().min(1, "Priority is required").max(10).optional(),
});