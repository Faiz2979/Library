import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Manage | Books",
    description: "",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
