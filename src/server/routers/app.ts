import { router } from "../trpc";
import { userRouter } from "./user";
import { serviceRouter } from "./service";
import { petRouter } from "@/server/routers/pet";
import {articleRouter} from "@/server/routers/article";
import { petImgRouter } from "@/server/routers/petImg";
import articleCommentRouter from "@/server/routers/articlecomment";
import { reviewRouter } from "@/server/routers/review";


export const appRouter = router({
  user: userRouter,
  service: serviceRouter,
  pet: petRouter,
  article: articleRouter,
  petImg: petImgRouter,
  articleComment: articleCommentRouter,
  review: reviewRouter
});

// type cho client
export type AppRouter = typeof appRouter;
