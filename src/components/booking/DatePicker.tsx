"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Button from "@/components/ui/Button";

type DatePickerProps = {
    onSelectDate: (date: Date) => void;
};

export default function DatePicker({ onSelectDate }: DatePickerProps) {
    const [selected, setSelected] = useState<Date | undefined>(undefined);

    const handleSelect = (date: Date | undefined) => {
        if (!date) return;
        setSelected(date);
        onSelectDate(date);
    };

    const today = new Date();

    return (
        <div className="border border-bluegreen p-6">
            <h4 className="playfair-italic-700 text-2xl mb-6 text-primaryContent">Select a date:</h4>
            <DayPicker
                mode="single"
                selected={selected}
                onSelect={handleSelect}
                disabled={{ before: today }}
                showOutsideDays
            />
            {selected && (
                <div className="mt-4 flex justify-end">
                    <Button
                        onClick={() => onSelectDate(selected)}
                        variant="blueGreen"
                        className="min-w-[150]"
                    >
                        Continue
                    </Button>
                </div>
            )}
        </div>
    );
}
