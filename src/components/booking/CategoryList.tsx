type Category = {
    id: number;
    name: string;
    has_subcategories: boolean;
};

type CategoryListProps = {
    categories: Category[];
    onCategorySelect: (categoryId: number, hasSubCategories: boolean) => void;
};

export default function CategoryList({ categories, onCategorySelect }: CategoryListProps) {
    return (
        <div className="border border-bluegreen p-6">
            <h4 className="playfair-italic-700 text-2xl mb-6 text-primaryContent">Select a Category:</h4>
            <ul className="grid grid-cols-3 gap-4">
                {categories.map((category) => (
                    <li
                        key={category.id}
                        className="border border-bluegreen p-4 cursor-pointer transition-colors duration-200 hover:bg-babyblue"
                        onClick={() => onCategorySelect(category.id, category.has_subcategories)}
                    >
                        <p className="playfair-700 uppercase">{category.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
