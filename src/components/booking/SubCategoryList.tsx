"use client";

import { useEffect, useState } from "react";

type SubCategory = {
    id: number;
    name: string;
    category_id: number;
};

type SubCategoryListProps = {
    categoryId: number;
    onSelectSubcategory: (subcategoryId: number) => void;
};

export default function SubCategoryList({ categoryId, onSelectSubcategory }: SubCategoryListProps) {
    const [subcategories, setSubCategories] = useState<SubCategory[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setSubCategories([]);
        setLoading(true);

        fetch(`/api/subcategories?categoryId=${categoryId}`)
            .then((res) => res.json())
            .then((data) => {
                setSubCategories(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching subcategories:", err);
                setLoading(false);
            });
    }, [categoryId]);

    return (
        <div className="border border-bluegreen p-6">
            <h4 className="playfair-italic-700 text-2xl mb-6 text-primaryContent">Select a subcategory:</h4>
            {loading ? (
                <p className="playfair text-primaryContent">Loading...</p>
            ) : (
                <ul className="grid grid-cols-3 gap-4">
                    {subcategories.map((sub) => (
                        <li
                            key={sub.id}
                            className="border border-bluegreen p-4 cursor-pointer hover:bg-babyblue transition-colors duration-200"
                            onClick={() => onSelectSubcategory(sub.id)}
                        >
                            <p className="playfair-700 uppercase">{sub.name}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
