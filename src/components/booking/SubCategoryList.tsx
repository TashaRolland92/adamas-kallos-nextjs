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
        <div>
            <h2 className="playfair-600 uppercase text-xl mb-4">Select a subcategory</h2>
            {loading ? (
                <p className="playfair text-primaryContent">Loading...</p>
            ) : (
                <ul className="grid grid-cols-3 gap-4">
                    {subcategories.map((sub) => (
                        <li
                            key={sub.id}
                            className="cursor-pointer playfair-600 uppercase hover:text-tiffanyblue transition-colors duration-200"
                            onClick={() => onSelectSubcategory(sub.id)}
                        >
                            {sub.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
