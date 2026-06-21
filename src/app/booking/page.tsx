import Hero from "@/components/layout/Hero";
import TreatmentCategories from "@/components/booking/TreatmentCategories";

export const metadata = {
    title: "Book Online | Adamas Kallos",
    description: "Browse our treatments and book your appointment online.",
};

export default function BookingPage() {
    return (
        <>
            <Hero className="h-[300px]" showArrow={false}>
                <h1 className="playfair-italic-700 text-3xl lg:text-4xl mb-2">Book</h1>
                <h2 className="playfair-italic-700 text-4xl lg:text-5xl mb-2">Online</h2>
            </Hero>
            <section className="container mx-auto py-10 px-7">
                <h3 className="text-3xl mb-6 playfair-600">Browse our treatments and book yours in just a few clicks...</h3>
                <TreatmentCategories />
            </section>
        </>
    );
}
