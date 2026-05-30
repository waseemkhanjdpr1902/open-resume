import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ATS CV Pro – Smart Resume Builder & ATS Parser",
  description:
    "ATS CV Pro is a powerful AI-assisted resume builder and ATS parser. Create professional, ATS-optimized resumes and check your resume's readability with our free tool.",
  keywords:
    "ATS resume builder, ATS CV, resume parser, ATS friendly resume, professional resume builder, CV builder India",
  openGraph: {
    title: "ATS CV Pro – Smart Resume Builder & ATS Parser",
    description:
      "Build ATS-optimized resumes with ease. Parse and test your existing resume for ATS readability.",
    url: "https://your-domain.vercel.app", // TODO: Replace with your actual Vercel URL
    siteName: "ATS CV Pro",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
