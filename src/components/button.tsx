import { cva } from "class-variance-authority"
import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

interface ButtonProps extends ComponentProps<"button"> {
    variant?:
        | "default"
        | "secondary"
        | "ghost"
        | "disabled"
        | "red"
        | null
        | undefined
}

const buttonVariants = cva(
    "rounded-lg p-2 cursor-pointer transition-colors duration-150 hover:bg-gray-200 hover:text-white",
    {
        variants: {
            variant: {
                default: "bg-gray-100",
                secondary: "bg-yellow text-white w-full",
                red: "bg-red text-white",
                ghost: "",
                disabled: "",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

function Button({ className, variant, ...props }: ButtonProps) {
    return (
        <button
            className={twMerge(buttonVariants({ variant }), className)}
            {...props}
        />
    )
}

export { Button }
