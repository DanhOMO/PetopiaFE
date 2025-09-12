// app/api/contact/route.ts
import { NextResponse } from "next/server";
import type { Contact } from "@/types/Contact";
const contacts: Contact[] = []; // mảng lưu tạm

export async function POST(req: Request) {
  try {
    const body = await req.json();
    contacts.push({ contact_id: Date.now().toString(), ...body , created_at: new Date().toISOString()});

    return NextResponse.json({ message: "Gửi thành công 🎉" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ contacts }, { status: 200 });
}
