import { Container } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "./auth/Provider";
import "./globals.css";
import Navbar from "./Navbar";
import QueryClientProvider from "./QueryClientProvider";
import dynamic from "next/dynamic";

const ThemeProvider = dynamic(() => import("./ThemeProvider"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <QueryClientProvider>
          <AuthProvider>
            <ThemeProvider>
              <Navbar />
              <main className="p-5">
                <Container>{children}</Container>
              </main>
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
