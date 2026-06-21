import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");

    let query = supabase.from("treatment_subcategories").select("*");

    if (categoryId) {
        query = query.eq("category_id", categoryId);
    }

    const { data, error } = await query;

    if (error) {
        return NextResponse.json(
            { message: "Error fetching subcategories" },
            { status: 500 }
        );
    }

    return NextResponse.json(data);
}
