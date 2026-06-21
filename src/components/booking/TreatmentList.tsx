"use client";

import { useEffect, useState } from "react";

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
};

export default function TreatmentList({ categoryId, subcategoryId }: TreatmentListProps) {
    const [treatments, setTreatments] = useState<Treatment[]>([]);
    const [loading, setLoading] = useState(false);

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
        <div className="border border-bluegreen p-6">
            <h4 className="playfair-italic-700 text-2xl mb-6">Select a treatment:</h4>
            {loading ? (
                <p className="playfair text-primaryContent">Loading...</p>
            ) : (
                <ul className="grid grid-cols-3 gap-4">
                    {treatments.map((treatment) => (
                        <li key={treatment.id} className="border border-bluegreen p-4">
                            <h5 className="playfair-700 text-lg mb-2">{treatment.name}</h5>
                            <p className="playfair text-md text-primaryContent mb-3">{treatment.description}</p>
                            <p className="playfair-600 text-lg text-bluegreen">£{treatment.price}</p>
                            <p className="playfair text-sm text-primaryContent">{treatment.duration} minutes</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
