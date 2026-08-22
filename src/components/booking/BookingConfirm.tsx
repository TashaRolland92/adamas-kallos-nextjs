"use client";

import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


type BookingConfirmProps = {
    treatment: {
        id: number;
        name: string;
        description: string;
        price: number;
        duration: number;
    };
    date: Date;
};

export default function BookingConfirm({ treatment, date }: BookingConfirmProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const formattedDate = date.toLocaleDateString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    async function handleConfirm() {
        setLoading(true);

        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    treatmentId: treatment.id,
                    treatmentName: treatment.name,
                    price: treatment.price,
                    duration: treatment.duration,
                    date
                })
            });
            
            const data = await res.json();

            if(!res.ok){
                setError(data.message);
                return;
            }

            router.push("/booking/success");
                
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="border border-bluegreen p-6">
            <h4 className="playfair-italic-700 text-2xl mb-6 text-primaryContent">Confirm your booking:</h4>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                    <p className="playfair text-sm uppercase text-primaryContent mb-1">Treatment</p>
                    <p className="playfair-700 text-lg text-primaryContent">{treatment.name}</p>
                </div>
                <div>
                    <p className="playfair text-sm uppercase text-primaryContent mb-1">Date</p>
                    <p className="playfair-700 text-lg text-primaryContent">{formattedDate}</p>
                </div>
                <div>
                    <p className="playfair text-sm uppercase text-primaryContent mb-1">Price</p>
                    <p className="playfair-700 text-lg text-bluegreen">£{treatment.price}</p>
                </div>
                <div>
                    <p className="playfair text-sm uppercase text-primaryContent mb-1">Duration</p>
                    <p className="playfair-700 text-lg text-primaryContent">{treatment.duration} minutes</p>
                </div>
            </div>

            {error && (
                <p className="playfair text-sm text-red-500 mb-4">{error}</p>
            )}
            
            <div className="flex justify-end">

                <Button 
                    variant="blueGreen" 
                    className="min-w-[150]"
                    onClick={handleConfirm}
                    disabled={loading}
                >
                    {loading ? "Confirming..." : "Confirm Booking"}
                </Button>
            </div>
        </div>
    );
}
