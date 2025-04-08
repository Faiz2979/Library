import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Manage | Dashboard",
  description: "",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div
        className={`antialiased`}
      >
        {children}
      </div>
  );
}
