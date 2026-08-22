import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export async function POST(request: Request) {
    const {treatmentId, treatmentName, price, duration, date} = await request.json();

    const supabase = await createSupabaseServerClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json(
            { message: "User not authorised to view this page..." },
            { status: 401 }
        );
    }

    const { error } = await supabase
        .from("bookings")
        .insert({
            user_id: user.id,
            treatment_id: treatmentId,
            treatment_name: treatmentName,
            price,
            duration,
            date
    });

    if (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 400 }
        );
    }

    return NextResponse.json({
        message: "Booking Successful"
    });        
}
