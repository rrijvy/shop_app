import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import "./styles.scss";

const fira_code = Fira_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shopp",
  description: "Rijvy's Shop",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={fira_code.className}>{children}</body>
    </html>
  );
}
