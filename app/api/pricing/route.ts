import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PricingItem from "@/lib/models/PricingItem";

export async function GET() {
  try {
    await connectDB();
    const pricing = await PricingItem.find({}).sort({ order: 1 }).lean();
    return NextResponse.json({ success: true, pricing }, { status: 200 });
  } catch (error) {
    console.error("Pricing API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch pricing." },
      { status: 500 }
    );
  }
}
