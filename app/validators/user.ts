import { withZod } from "@rvf/zod";
import { z } from "zod";

const UserRole = z.enum(["admin", "user"]);

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email().min(1, "Email is required"),
  role: UserRole,
});

export const createUserValidator = withZod(createUserSchema);

export type UserInput = z.infer<typeof createUserSchema>;
export type UserRole = z.infer<typeof UserRole>;
