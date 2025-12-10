import type React from "react";
import { useState } from "react";
import { cn } from "~/lib/utils";

const MovingBorderButton = ({
    children,
    wrapperClassName,
    className,
    onClick,
    type = "button",
    disabled,
}: {
    children?: React.ReactNode;
    wrapperClassName?: string;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            className={cn(
                `rounded-full overflow-hidden relative p-[2px]`,
                wrapperClassName,
            )}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            type={type}
            disabled={disabled}
        >
            <span
                className={cn(
                    "absolute transition-all inset-[-200%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_90deg,transparent_30%,#444444_100%)] blur-md",
                    isHovered &&
                        "bg-[conic-gradient(from_90deg,transparent_30%,#FFFFFF_100%)] ",
                )}
            />
            <span
                className={cn(
                    `bg-black transition-all hover:bg-zinc-950 rounded-full px-4 py-2 flex items-center justify-center relative`,
                    className,
                )}
            >
                {children}
            </span>
        </button>
    );
};

export default MovingBorderButton;
