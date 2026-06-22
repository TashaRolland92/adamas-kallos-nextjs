import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");
    const subcategoryId = searchParams.get("subcategoryId");

    let query = supabase
        .from("treatments")
        .select("*, treatment_categories(name), treatment_subcategories(name)");

    if (categoryId) {
        query = query.eq("category_id", categoryId);
    }

    if (subcategoryId) {
        query = query.eq("subcategory_id", subcategoryId);
    }

    const { data, error } = await query;

    if (error) {
        return NextResponse.json(
            { message: "Error fetching treatments" },
            { status: 500 }
        );
    }

    return NextResponse.json(data);
}
