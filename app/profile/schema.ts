import { z } from "zod";

export const userSchema = z.object({
  cfHandle: z.string().min(1).max(255),
  fullName: z.string().min(1).max(255),
});
