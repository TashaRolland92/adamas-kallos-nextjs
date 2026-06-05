import Button from "@/components/ui/Button";

const BookAppointment = () => {
	return (
		<section className="book-appointment">
			<div className="container mx-auto bg-cover bg-center py-10 px-7 text-white text-center">
				<h3 className="uppercase playfair text-2xl md:text-xl relative">Book Appointment</h3>
				<h1 className="playfair-italic-700 text-4xl leading-snug md:text-6xl md:leading-14 mb-6">Make a reservation for unforgettable beauty.</h1>
				<p className="playfair text-lg max-w-96 mx-auto mb-6">Trust your beauty journey to our accomplished team, bringing you the techniques and styles seen on the world's stage. Contact us today.</p>
				<Button to="/booking">Book Online</Button>
			</div>
		</section>
	);
};

export default BookAppointment;
