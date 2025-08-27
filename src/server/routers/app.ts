import { router } from "../trpc";
import { userRouter } from "./user";
import { serviceRouter } from "./service";

export const appRouter = router({
  user: userRouter,
  service: serviceRouter,
});

// type cho client
export type AppRouter = typeof appRouter;
