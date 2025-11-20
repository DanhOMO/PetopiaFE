import { z } from "zod"


export const LoginSchema = z.object({
  
  email: z.string()
    .min(1, "Vui lòng nhập email")
    .email("Email không hợp lệ"),
  password: z.string()
    .min(1, "Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
})


export type LoginRequest = z.infer<typeof LoginSchema>



export const RegisterSchema = z.object({
  username: z.string()
    .min(3, "Username phải có ít nhất 3 ký tự")
    .max(50, "Username quá dài")
    .regex(/^[a-zA-Z0-9_]+$/, "Username không được chứa ký tự đặc biệt"),
    
  email: z.string()
    .min(1, "Vui lòng nhập email")
    .email("Email không hợp lệ"),
    
  fullName: z.string()
    .min(2, "Họ tên phải có ít nhất 2 ký tự"),
    
  phoneNumber: z.string()
    .min(10, "Số điện thoại phải có 10 số")
    .max(11, "Số điện thoại tối đa 11 số")
    .regex(/^[0-9]+$/, "Số điện thoại chỉ được chứa số"),
    
  password: z.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    
    
    
    ,
    
  confirmPassword: z.string()
    .min(1, "Vui lòng xác nhận mật khẩu")
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"], 
  message: "Mật khẩu xác nhận không khớp",
})


export type RegisterRequest = z.infer<typeof RegisterSchema>