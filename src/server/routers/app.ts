import { router } from "../trpc";
import { userRouter } from "./user";
import { serviceRouter } from "./service";
import { petRouter } from "@/server/routers/pet";
import {articleRouter} from "@/server/routers/article";
import { petImgRouter } from "@/server/routers/petImg";
import articleCommentRouter from "@/server/routers/articlecomment";
import { reviewRouter } from "@/server/routers/review";
import { wishlistRouter } from "@/server/routers/wishlist";
import { orderRouter } from "@/server/routers/order";


export const appRouter = router({
  user: userRouter,
  service: serviceRouter,
  pet: petRouter,
  article: articleRouter,
  petImg: petImgRouter,
  articleComment: articleCommentRouter,
  review: reviewRouter,
  wishList: wishlistRouter,
  order: orderRouter
});

// type cho client
export type AppRouter = typeof appRouter;
