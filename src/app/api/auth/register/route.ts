import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export async function POST(request: Request) {
    const { email, password} = await request.json();

    if (!email || !password) {
        return NextResponse.json(
            { message: "Email and password are required." },
            { status: 400 }
        );
    }

    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.auth.signUp({
        email,
        password
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
