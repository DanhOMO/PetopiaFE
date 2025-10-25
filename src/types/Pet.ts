// PetForListResponseDTO - Dùng khi load nhiều Pet về để hiển thị danh sách
export type Pet = {
  petId: string;
  name: string;
  description?: string | null;
  price: number;
  discountPrice?: number | null;
  stockQuantity?: number | null;
  mainImageUrl?: string | null;
  rating?: number | null;
  reviewCount?: number | null;
};

// PetResponseDTO - Dùng khi load chi tiết 1 Pet
export type PetDetail = {
  petId: string;
  name: string;
  description?: string | null;
  age?: number | null;
  gender?: string | null;
  price: number;
  discountPrice?: number | null;
  healthStatus?: string | null;
  vaccinationHistory?: string | null;
  stockQuantity?: number | null;
  mainImageUrl?: string | null;
  videoUrl?: string | null;
  weight?: number | null;
  height?: number | null;
  color?: string | null;
  furType?: string | null;
  rating?: number | null;
  reviewCount?: number | null;
};