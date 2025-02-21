import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

interface ButtonProps extends ComponentProps<"button"> {}

function Button({ className, ...props }: ButtonProps) {
    return (
        <button
            className={twMerge(
                "rounded-full bg-gray-100 p-2 cursor-pointer hover:bg-gray-200 hover:text-white transition-colors duration-150",
                className
            )}
            {...props}
        />
    )
}

export { Button }
