import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

interface CardContentProps extends ComponentProps<"div"> {}

function CardContent({ className, ...props }: CardContentProps) {
    return (
        <div
            className={twMerge(
                "rounded-2xl border border-gray-200 p-4 flex flex-col items-center py-8 gap-8",
                className
            )}
            {...props}
        />
    )
}

export { CardContent }
