import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
    const { data, error } = await supabase
        .from("treatment_categories")
        .select("*");

    if (error) {
        return NextResponse.json(
            { message: "Error fetching categories" },
            { status: 500 }
        );
    }

    return NextResponse.json(data);
}
