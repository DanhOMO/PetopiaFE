"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react" 


import { LoginSchema, LoginRequest } from "@/lib/validations/auth"


import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  
  const form = useForm<LoginRequest>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  
  async function onSubmit(values: LoginRequest) {
    setIsLoading(true)
    try {
      console.log("Dữ liệu hợp lệ gửi đi:", values)
      
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-yellow-50 py-12 px-4">
      <Card className="w-full max-w-md shadow-xl border-0 rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#C46C2B]">
            Đăng nhập tài khoản
          </CardTitle>
          <p className="text-gray-500 text-sm mt-2">
            Chào mừng bạn quay lại Petopia!
          </p>
        </CardHeader>
        
        <CardContent>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="name@example.com" 
                        {...field} 
                        className="bg-gray-50 focus-visible:ring-[#C46C2B]" 
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                      Mật khẩu
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Nhập mật khẩu" 
                        {...field} 
                        className="bg-gray-50 focus-visible:ring-[#C46C2B]" 
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 text-[#C46C2B] border-gray-300 rounded focus:ring-[#C46C2B]"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
                    Ghi nhớ đăng nhập
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-[#C46C2B] hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>

              
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#C46C2B] text-white font-bold rounded-lg py-3 text-lg hover:bg-[#7B4F35] transition duration-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  "Đăng nhập"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <Link href="/register" className="text-[#C46C2B] font-semibold hover:underline">
              Đăng ký ngay
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}