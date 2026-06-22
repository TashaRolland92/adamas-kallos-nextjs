import Button from '@/components/ui/Button';

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
    const formattedDate = date.toLocaleDateString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

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

            <div className="flex justify-end">
                <Button variant="blueGreen" className="min-w-[150]">
                    Confirm Booking
                </Button>
            </div>
        </div>
    );
}
