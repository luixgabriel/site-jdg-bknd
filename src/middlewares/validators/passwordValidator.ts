import { z } from "zod";

export const passwordValidator = z.string().min(6).regex(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
  "Password must be at least 6 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 special character, and 1 number."
);
