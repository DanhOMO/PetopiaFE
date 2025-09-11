import {Pet} from "../server/routers/pet";

/* ----- types ----- */
export type CartItem = {
    pet: Pet;
    quantity: number;
    img: string | null; // URL hoặc null nếu chưa có ảnh (dữ liệu cũ)
};
