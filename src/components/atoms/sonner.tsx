"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
    return (
        <Sonner
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast: "group toast group-[.toaster]:bg-gray-100 group-[.toaster]:text-gray-200 group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                    description: "group-[.toast]:text-gray-700",
                    actionButton:
                        "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-200 font-medium",
                    cancelButton:
                        "group-[.toast]:bg-gray-700 group-[.toast]:text-gray-700 font-medium",
                },
            }}
            {...props}
        />
    )
}

export { Toaster }
