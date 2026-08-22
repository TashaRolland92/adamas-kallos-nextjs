import Hero from "@/components/layout/Hero";
import Link from "next/link";
import Button from "@/components/ui/Button";

export const metadata = {
    title: "Booking Success | Adamas Kallos",
    description: "Appointment Successfully Booked.",
};

export default function BookingSuccessPage() {
    return (
        <>
            <Hero className="h-[300px]" showArrow={false}>
                <h1 className="playfair-italic-700 text-3xl lg:text-4xl mb-2">Appointment</h1>
                <h2 className="playfair-italic-700 text-4xl lg:text-5xl mb-2">Booked!</h2>
            </Hero>
            <section className="container mx-auto py-10 px-7 text-center">
                <p className="playfair text-lg text-primaryContent">
                    Your appointment has been successfully booked, we look forward to seeing you!
                </p>
                <div className="flex gap-4 justify-center mt-6">
                    <Link href="/">
                        <Button variant="blueGreen" className="min-w-[150]">
                            Back to Home
                        </Button>
                    </Link>
                    <Link href="/bookings">
                        <Button variant="blueGreen" className="min-w-[150]">
                            My Bookings
                        </Button>
                    </Link>
                </div>
            </section>
        </>
    );
}
