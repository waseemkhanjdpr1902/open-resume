"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ─── ATS CV Pro – Top Navigation Bar ───────────────────────────────────────
// Replace the original OpenResume nav with ATS CV Pro branding.
// Keeps the same route structure: /, /resume-builder, /resume-parser
// ────────────────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Resume Builder", href: "/resume-builder" },
  { label: "Resume Parser", href: "/resume-parser" },
  { label: "Pricing", href: "/subscription" },
];

export const TopNavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 flex h-14 w-full items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
      {/* ── Brand ── */}
      <Link href="/" className="flex items-center gap-2 select-none">
        {/* Inline SVG logo mark */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect width="28" height="28" rx="6" fill="#2563EB" />
          <path
            d="M7 8h14M7 12h10M7 16h12M7 20h8"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-lg font-bold tracking-tight text-gray-900">
          ATS CV <span className="text-blue-600">Pro</span>
        </span>
      </Link>

      {/* ── Nav Links ── */}
      <div className="hidden items-center gap-6 sm:flex">
        {navLinks.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className={`text-sm font-medium transition-colors hover:text-blue-600 ${
              pathname === href
                ? "text-blue-600 border-b-2 border-blue-600 pb-0.5"
                : "text-gray-600"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* ── CTA ── */}
      <Link
        href="/subscription"
        className="rounded-md bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
      >
        Get Pro
      </Link>
    </nav>
  );
};
