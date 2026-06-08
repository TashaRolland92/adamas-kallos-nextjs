import Hero from "@/components/layout/Hero";
import Intro from "@/components/sections/Intro";
import BookAppointment from "@/components/sections/BookAppointment";

export default function Home() {
	return (
		<>
			<Hero className="h-[50vh] md:h-[70vh] lg:h-screen">
				<h1 className="playfair-italic-700 text-6xl sm:text-8xl md:text-9xl">Adamas</h1>
				<h2 className="playfair-italic-700 text-4xl sm:text-6xl lg:text-8xl mb-2">Kallos</h2>
				<h3 className="playfair uppercase text-2xl sm:text-4xl lg:text-6xl">Diamond Beauty</h3>
			</Hero>
			<Intro />
			<BookAppointment />
		</>
	);
}
