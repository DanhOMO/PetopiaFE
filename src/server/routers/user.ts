import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const userRouter = router({
  getAll: publicProcedure.query(() => {
    return [
      { id: "1", name: "Danh" },
      { id: "2", name: "Alice" },
    ];
  }),

  create: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input }) => {
      return { id: Date.now().toString(), ...input };
    }),
});
