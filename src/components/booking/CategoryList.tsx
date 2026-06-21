import Image from "next/image";

type Category = {
    id: number;
    name: string;
    has_subcategories: boolean;
    image_url?: string;
};

type CategoryListProps = {
    categories: Category[];
    onCategorySelect: (categoryId: number, hasSubCategories: boolean) => void;
};

export default function CategoryList({ categories, onCategorySelect }: CategoryListProps) {
    return (
        <div className="border border-bluegreen p-6">
            <h4 className="playfair-italic-700 text-2xl mb-6">Select a Category:</h4>
            <ul className="grid grid-cols-3 gap-4">
                {categories.map((category) => (
                    <li
                        key={category.id}
                        className="border border-bluegreen p-4 cursor-pointer hover:text-bluegreen transition-colors duration-200"
                        onClick={() => onCategorySelect(category.id, category.has_subcategories)}
                    >
                        {category.image_url && (
                            <Image
                                src={category.image_url}
                                alt={category.name}
                                width={400}
                                height={300}
                                className="w-full h-48 object-cover mb-2"
                            />
                        )}
                        <p className="playfair-700 uppercase">{category.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
