import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export async function POST(request: Request) {
    const { email, password, name, phone } = await request.json();

    if (!email || !password || !name) {
        return NextResponse.json(
            { message: "Name, email and password are required" },
            { status: 400 }
        );
    }

    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
                phone,
            },
        },
    });

    if (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        );
    }

    return NextResponse.json({
        message: "Registration successful",
        user: data.user,
    });
}
