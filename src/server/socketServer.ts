// server/socketServer.js
import { Server } from "socket.io";
import { CartItem } from "@/types/Cart";
const io = new Server(3000, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Lắng nghe giỏ hàng từ client
  socket.on("cart:update", (cart) => {
    console.log("Cart received:", cart);

    // Tính tổng số lượng
    const total = cart.reduce((sum : number, item : CartItem ) => sum + item.quantity, 0);

    // Gửi lại cho tất cả client
    io.emit("cart:totalQuantity", total);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
