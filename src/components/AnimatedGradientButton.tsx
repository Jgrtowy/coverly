import { type HTMLMotionProps, motion } from "framer-motion";
import type React from "react";
import { cn } from "~/lib/utils";

type AnimatedGradientButtonProps = HTMLMotionProps<"button"> & {
    children?: React.ReactNode;
    className?: string;
};

const AnimatedGradientButton = ({
    children,
    className,
    ...props
}: AnimatedGradientButtonProps) => {
    return (
        <motion.button
            {...props}
            animate={{
                background: [
                    "linear-gradient(135deg, oklch(0.237 0.081 292.4), oklch(0.4 0.05 292.4), oklch(0.488 0.243 264.376))",
                    "linear-gradient(135deg, oklch(0.488 0.243 264.376), oklch(0.627 0.265 303.9), oklch(0.398 0.07 227.392))",
                    "linear-gradient(135deg, oklch(0.627 0.265 303.9), oklch(0.488 0.243 264.376), oklch(0.237 0.081 292.4))",
                ],
                transition: {
                    duration: 15,
                    repeat: Infinity,
                    repeatType: "mirror",
                },
            }}
            className={cn(
                "relative overflow-hidden hover:shadow-[0_0_10px_var(--background)] rounded-lg border-none px-4 py-2 font-medium text-white tracking-wide shadow-md transition-all duration-300 hover:bg-opacity-90",
                className,
            )}
        >
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
};

export default AnimatedGradientButton;
