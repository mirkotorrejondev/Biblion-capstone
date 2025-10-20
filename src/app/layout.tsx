import Link from "next/link";
import "./globals.css";
import Providers from "./Providers";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <header>
            <h1 className="logo">
              <Link href={"/"}>Biblion</Link>
            </h1>
            <ThemeSwitcher></ThemeSwitcher>
          </header>
          {children}
          <footer></footer>
        </Providers>
      </body>
    </html>
  );
}
