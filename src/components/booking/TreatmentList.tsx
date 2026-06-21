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
        <div>
            <h3 className="playfair-600 uppercase text-xl mb-4">Select a treatment</h3>
            {loading ? (
                <p className="playfair text-primaryContent">Loading...</p>
            ) : (
                <ul className="grid grid-cols-3 gap-4">
                    {treatments.map((treatment) => (
                        <li key={treatment.id} className="border border-babyblue p-4">
                            <h4 className="playfair-700 text-lg mb-1">{treatment.name}</h4>
                            <p className="playfair text-sm text-primaryContent mb-2">{treatment.description}</p>
                            <p className="playfair-600 text-tiffanyblue">£{treatment.price}</p>
                            <p className="playfair text-sm text-primaryContent">{treatment.duration} minutes</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
