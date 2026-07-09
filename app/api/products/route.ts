import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/lib/models/Product";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    await connectDB();

    const query: Record<string, unknown> = {};
    if (category && category !== "all") {
      query.category = category;
    }
    if (featured === "true") {
      query.isFeatured = true;
    }

    const products = await Product.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    console.error("Products API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products." },
      { status: 500 }
    );
  }
}
