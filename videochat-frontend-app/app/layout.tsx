import Header from "../shared/components/Header";
import type { Metadata } from "next";
import Footer from "../shared/components/Footer";

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
        <div className="page">
          <Header title="Video Chat Application" isHorizontalLine />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
