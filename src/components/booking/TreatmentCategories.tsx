"use client";

import { useState, useEffect, useReducer } from "react";
import CategoryList from "./CategoryList";
import SubCategoryList from "./SubCategoryList";
import TreatmentList from "./TreatmentList";
import Button from "@/components/ui/Button";

type Category = {
    id: number;
    name: string;
    has_subcategories: boolean;
    image_url?: string;
};

type TreatmentStep = "category" | "subcategory" | "treatment";

interface TreatmentState {
    step: TreatmentStep;
    selectedCategoryId: number | null;
    selectedSubcategoryId: number | null;
    hasSubCategories: boolean;
}

const initialTreatmentState: TreatmentState = {
    step: "category",
    selectedCategoryId: null,
    selectedSubcategoryId: null,
    hasSubCategories: false,
};

type TreatmentAction =
    | { type: "SELECT_CATEGORY"; payload: { categoryId: number; hasSubCategories: boolean } }
    | { type: "SELECT_SUBCATEGORY"; payload: { subcategoryId: number } }
    | { type: "GO_BACK" }
    | { type: "RESET" };

const treatmentReducer = (state: TreatmentState, action: TreatmentAction): TreatmentState => {
    switch (action.type) {
        case "SELECT_CATEGORY":
            return {
                ...state,
                step: action.payload.hasSubCategories ? "subcategory" : "treatment",
                selectedCategoryId: action.payload.categoryId,
                hasSubCategories: action.payload.hasSubCategories,
                selectedSubcategoryId: null,
            };
        case "SELECT_SUBCATEGORY":
            return {
                ...state,
                step: "treatment",
                selectedSubcategoryId: action.payload.subcategoryId,
            };
        case "GO_BACK":
            switch (state.step) {
                case "treatment":
                    return {
                        ...state,
                        step: state.hasSubCategories ? "subcategory" : "category",
                        selectedSubcategoryId: null,
                    };
                case "subcategory":
                    return {
                        ...state,
                        step: "category",
                        selectedCategoryId: null,
                        selectedSubcategoryId: null,
                        hasSubCategories: false,
                    };
                default:
                    return state;
            }
        case "RESET":
            return initialTreatmentState;
        default:
            return state;
    }
};

export default function TreatmentCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [state, dispatch] = useReducer(treatmentReducer, initialTreatmentState);

    useEffect(() => {
        fetch("/api/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.error("Error fetching categories:", err));
    }, []);

    return (
        <div className="booking-container">
            <div className="flex justify-between mb-4">
                {state.step !== "category" && (
                    <Button
                        onClick={() => dispatch({ type: "GO_BACK" })}
                        variant="blueGreen"
                        className="min-w-[150]"
                    >
                        Back
                    </Button>
                )}

                {state.step !== "category" && (
                    <Button
                        onClick={() => dispatch({ type: "RESET" })}
                        variant="blueGreen"
                        className="min-w-[150]"
                    >
                        Start Again
                    </Button>
                )}
            </div>

            {state.step === "category" && (
                <CategoryList
                    categories={categories}
                    onCategorySelect={(id: number, hasSubs: boolean) =>
                        dispatch({
                            type: "SELECT_CATEGORY",
                            payload: { categoryId: id, hasSubCategories: hasSubs },
                        })
                    }
                />
            )}

            {state.step === "subcategory" && state.selectedCategoryId !== null && (
                <SubCategoryList
                    categoryId={state.selectedCategoryId}
                    onSelectSubcategory={(subcategoryId: number) =>
                        dispatch({
                            type: "SELECT_SUBCATEGORY",
                            payload: { subcategoryId },
                        })
                    }
                />
            )}

            {state.step === "treatment" && state.selectedCategoryId !== null && (
                <TreatmentList
                    categoryId={state.selectedCategoryId}
                    subcategoryId={state.selectedSubcategoryId}
                />
            )}
        </div>
    );
}
