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
        <ul className="grid grid-cols-3 gap-4">
            {categories.map((category) => (
                <li
                    key={category.id}
                    className="cursor-pointer hover:text-tiffanyblue transition-colors duration-200"
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
                    <p className="playfair-600 uppercase">{category.name}</p>
                </li>
            ))}
        </ul>
    );
}
