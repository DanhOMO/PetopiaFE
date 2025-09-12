// src/server/routers/contact.ts
import { z } from "zod";
import { router, publicProcedure } from "../trpc";
export type Contact = {
  contact_id: string; // PK
  name: string; // NOT NULL
  phone: string; // NOT NULL
  address: string; // NOT NULL
  email: string; // NOT NULL
  subject: string; // NOT NULL

  content: string; // NOT NULL
  
  created_at: string; // DATETIME -> ISO string
};
export const contactRouter = router({
  create: publicProcedure
    .input(z.object({
      name: z.string(),
      phone: z.string(),
      address: z.string(),
      email: z.string(),
      subject: z.string(),
      content: z.string(),
      created_at: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      // Lưu vào DB ở đây
      return { success: true };
    }),
});