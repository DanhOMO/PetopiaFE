// Context cho tRPC server
// Nếu bạn cần thêm thông tin như user, database, ... hãy bổ sung vào đây
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';

export function createContext(opts?: CreateNextContextOptions) {
  // Có thể lấy thông tin user từ request ở đây nếu cần
  return {};
}

export type Context = ReturnType<typeof createContext>;
