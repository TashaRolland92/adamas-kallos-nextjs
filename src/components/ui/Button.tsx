import Link from "next/link";

type ButtonProps = {
    to: string;
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    disabled?: boolean;
    classes?: string;
};

const Button = ({
    to,
    children,
    type = "button",
    onClick,
    disabled = false,
    classes = ""
}: ButtonProps) => {
    const defaultStyles = `
		${classes}
		playfair-600
		border
		border-white
		px-4
		h-[45px]
		uppercase
		transition-colors
		ease-in
        text-lg
        inline-grid
        items-center
		hover:bg-white
		hover:text-primaryContent
	`;

    if (to && !disabled) {
        return (
            <Link href={to} onClick={onClick} className={defaultStyles}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={defaultStyles}
        >
            {children}
        </button>
    );
};

export default Button;
