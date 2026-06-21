import Link from "next/link";

type ButtonVariant = "white" | "blueGreen";

type ButtonProps = {
    to?: string; // optional, component can be used for either links or buttons
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    title?: string; // title, if button text is non-descriptive
    ariaLabel?: string; // if button is icon only
    variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  white:
    "border-white text-white hover:bg-white hover:text-primaryContent",
  blueGreen:
    "border-bluegreen text-bluegreen hover:bg-bluegreen hover:text-primaryContent",
};

const Button = ({
    to,
    children,
    type = "button",
    onClick,
    disabled = false,
    className = "",
    title,
    ariaLabel,
    variant = "white"
}: ButtonProps) => {
    const baseClasses = [
		"playfair-600",
		"border",
		"px-4",
		"h-[45px]",
		"uppercase",
		"transition-colors",
		"ease-in",
        "text-lg",
        "inline-grid",
        "items-center",
        "cursor-pointer",
    ].join(" ");

    const classes = [baseClasses, variantClasses[variant], className]
        .filter(Boolean)
        .join(" ");

    if (to && !disabled) {
        return (
            <Link href={to} onClick={onClick} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classes}
            title={title}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    );
};

export default Button;
