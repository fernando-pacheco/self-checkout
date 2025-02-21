import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import type { ReactNode } from "react"

import "./globals.css"

const poppins = Poppins({
    weight: ["400", "600"],
    subsets: ["latin"],
    variable: "--font-poppins",
})

export const metadata: Metadata = {
    title: "FSW Donald's",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode
}>) {
    return (
        <html lang="en" className={`${poppins.variable}`}>
            <body>{children}</body>
        </html>
    )
}
