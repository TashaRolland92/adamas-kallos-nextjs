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
		px-2
		h-10
		w-full
		max-w-36
		uppercase
		transition-colors
		ease-in
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
