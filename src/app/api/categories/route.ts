import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  const categories = await db.category.findMany();

  return NextResponse.json(categories);
}
