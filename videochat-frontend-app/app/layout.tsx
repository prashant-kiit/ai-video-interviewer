import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Chat Application",
  description: "Video Chat Frontend Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
