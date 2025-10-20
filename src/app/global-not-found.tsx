import Link from "next/link";
import "./globals.css";

import type { Metadata } from "next";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Providers from "./Providers";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <html>
      <body>
        <Providers>
          <header>
            <h1 className="logo">
              <Link href={"/"}>Biblion</Link>
            </h1>
            <ThemeSwitcher></ThemeSwitcher>
          </header>
          <div className="not-found">
            <AlertCircle size={48} />
            <h2>Not Found</h2>
            <p>This page does not exist</p>
            <Link href={"/"}>Return Home</Link>
          </div>
        </Providers>
      </body>
    </html>
  );
}
