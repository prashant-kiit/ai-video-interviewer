import Header from "../shared/components/Header";
import type { Metadata } from "next";
import Footer from "../shared/components/Footer";
import ClientLayout from "../shared/middlewares/ClientLayout";
import { Providers as JotaiProviders } from "../shared/store/provider";

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
        <JotaiProviders>
          <Header title="Video Chat Application" isHorizontalLine />
          <ClientLayout>{children}</ClientLayout>
          <Footer />
        </JotaiProviders>
      </body>
    </html>
  );
}
