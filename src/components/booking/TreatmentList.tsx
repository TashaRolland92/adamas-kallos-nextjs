"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

type Treatment = {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
    subcategory_id: number | null;
    category_id: number;
};

type TreatmentListProps = {
    categoryId: number;
    subcategoryId: number | null;
    onSelectTreatment: (treatment: Treatment) => void;
};

export default function TreatmentList({ categoryId, subcategoryId, onSelectTreatment }: TreatmentListProps) {
    const [treatments, setTreatments] = useState<Treatment[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedTreatmentId, setSelectedTreatmentId] = useState<number | null>(null);
    const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

    useEffect(() => {
        if (!categoryId) return;

        setLoading(true);

        const params = new URLSearchParams();
        params.set("categoryId", String(categoryId));
        if (subcategoryId) params.set("subcategoryId", String(subcategoryId));

        fetch(`/api/treatments?${params.toString()}`)
            .then((res) => res.json())
            .then((data) => {
                setTreatments(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching treatments:", err);
                setLoading(false);
            });
    }, [categoryId, subcategoryId]);

    return (
        <>
            <div className="border border-bluegreen p-6">
                <h4 className="playfair-italic-700 text-2xl mb-6 text-primaryContent">Select a treatment:</h4>
                {loading ? (
                    <p className="playfair text-primaryContent">Loading...</p>
                ) : (
                    <ul className="grid grid-cols-3 gap-4">
                        {treatments.map((treatment) => (
                            <li 
                                key={treatment.id} 
                                onClick={() => {
                                    if (selectedTreatmentId === treatment.id) {
                                        setSelectedTreatmentId(null);
                                        setSelectedTreatment(null);
                                    } else {
                                        setSelectedTreatmentId(treatment.id);
                                        setSelectedTreatment(treatment);
                                    }
                                }}
                                className={`
                                    cursor-pointer 
                                    p-4 
                                    border 
                                    transition-colors 
                                    duration-200
                                    flex justify-between items-start
                                    ${selectedTreatmentId === treatment.id 
                                        ? "border-bluegreen bg-babyblue"
                                        : "border-bluegreen hover:bg-babyblue"
                                    }
                                `}
                            >
                                <div>
                                    <h5 className="playfair-700 text-lg mb-2">{treatment.name}</h5>
                                    <p className="playfair text-md text-primaryContent mb-3">{treatment.description}</p>
                                    <p className="playfair-600 text-lg text-bluegreen">£{treatment.price}</p>
                                    <p className="playfair text-sm text-primaryContent">{treatment.duration} minutes</p>
                                </div>
                                <div
                                    aria-label={selectedTreatmentId === treatment.id ? "Selected" : "Not Selected"} 
                                    className={`mt-1 w-5 h-5 rounded-full border shrink-0 transition-colors duration-200
                                    ${selectedTreatmentId === treatment.id
                                        ? "border-bluegreen bg-bluegreen"
                                        : "border-primaryContent bg-transparent"
                                    }`}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {selectedTreatmentId && (
                <div className="mt-4 flex justify-end">
                    <Button
                        variant="blueGreen"             
                        className="min-w-[150]"
                        onClick={() => selectedTreatment && onSelectTreatment(selectedTreatment)}
                    >
                        Book
                    </Button>                    
                </div>
            )} 
        </>       
    );
}
