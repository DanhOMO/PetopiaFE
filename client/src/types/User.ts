

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
}



export interface User {
  userId: string;             
  username: string;           
  email: string;              
  fullName: string;           
  phoneNumber: string;        
  role: UserRole;             
  loyaltyPoints: number;      
  isActive: boolean;          
  createdAt: string;          
  updatedAt: string;          
}



export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}