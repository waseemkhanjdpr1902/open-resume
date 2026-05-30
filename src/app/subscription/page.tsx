"use client";
import { useState } from "react";
import { TopNavBar } from "../components/TopNavBar";

// ─── ATS CV Pro – Subscription / Pricing Page ─────────────────────────────
// Integrates with Razorpay Subscriptions.
// Set your Razorpay Key ID in the environment variable:
//   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxx
//
// Each plan must have a Razorpay Plan ID created from your Razorpay dashboard.
// Replace the planId values below with your actual plan IDs.
// ────────────────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    planId: null, // No Razorpay plan needed for free tier
    features: [
      "1 Resume Download / month",
      "ATS Resume Builder",
      "ATS Resume Parser",
      "Basic Templates",
    ],
    cta: "Get Started Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "₹299",
    period: "/ month",
    planId: "plan_XXXXXXXXXXXXXXXX", // TODO: Replace with your Razorpay Pro monthly plan ID
    features: [
      "Unlimited Resume Downloads",
      "All Premium Templates",
      "ATS Score Analysis",
      "Priority Support",
      "PDF & DOCX Export",
      "Cover Letter Builder",
    ],
    cta: "Subscribe – Pro",
    highlight: true,
  },
  {
    name: "Annual Pro",
    price: "₹2,499",
    period: "/ year",
    planId: "plan_YYYYYYYYYYYYYYYY", // TODO: Replace with your Razorpay Annual plan ID
    features: [
      "Everything in Pro",
      "Save ₹1,089 vs monthly",
      "Early Access to New Features",
      "Dedicated Account Manager",
      "Team Sharing (up to 3 users)",
    ],
    cta: "Subscribe – Annual",
    highlight: false,
  },
];

// ── Razorpay Subscription checkout ──────────────────────────────────────────
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

async function openRazorpaySubscription(planId: string, planName: string) {
  const loaded = await loadRazorpayScript();
  if (!loaded) {
    alert("Failed to load payment gateway. Please try again.");
    return;
  }

  // NOTE: In production you should create the subscription on your backend
  // and pass the subscription_id here instead of the plan_id directly.
  // See: https://razorpay.com/docs/api/payments/subscriptions/
  const options = {
    key: RAZORPAY_KEY_ID,
    name: "ATS CV Pro",
    description: `${planName} Subscription`,
    image: "/logo.png", // Add your logo at public/logo.png
    // subscription_id: "<server-generated-subscription-id>", // Preferred: use backend
    plan_id: planId, // Quick integration without backend (test mode only)
    handler: function (response: {
      razorpay_payment_id: string;
      razorpay_subscription_id: string;
      razorpay_signature: string;
    }) {
      // TODO: Send response to your backend to verify payment signature
      console.log("Payment successful:", response);
      alert(
        `Payment successful! Payment ID: ${response.razorpay_payment_id}\nPlease contact support to activate your subscription.`
      );
    },
    prefill: {
      name: "",
      email: "",
      contact: "",
    },
    theme: {
      color: "#2563EB",
    },
    modal: {
      ondismiss: () => {
        console.log("Checkout dismissed");
      },
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
}

// ── Component ────────────────────────────────────────────────────────────────
export default function SubscriptionPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscribe = async (planId: string | null, planName: string) => {
    if (!planId) {
      window.location.href = "/resume-builder";
      return;
    }
    if (!RAZORPAY_KEY_ID) {
      alert(
        "Razorpay Key ID is not configured. Set NEXT_PUBLIC_RAZORPAY_KEY_ID in your environment."
      );
      return;
    }
    setLoadingPlan(planName);
    await openRazorpaySubscription(planId, planName);
    setLoadingPlan(null);
  };

  return (
    <>
      <TopNavBar />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16 px-4">
        {/* ── Header ── */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-700 mb-4">
            Pricing
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-gray-500">
            Start free. Upgrade when you need more power to land your dream job.
          </p>
        </div>

        {/* ── Plans Grid ── */}
        <div className="mx-auto max-w-5xl grid grid-cols-1 gap-6 sm:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-7 shadow-sm transition-shadow hover:shadow-md ${
                plan.highlight
                  ? "border-blue-600 bg-blue-600 text-white shadow-blue-200"
                  : "border-gray-200 bg-white text-gray-900"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-3 py-0.5 text-xs font-bold text-gray-900 shadow">
                  Most Popular
                </span>
              )}

              <div className="mb-6">
                <h2
                  className={`text-lg font-bold mb-1 ${
                    plan.highlight ? "text-white" : "text-gray-800"
                  }`}
                >
                  {plan.name}
                </h2>
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-4xl font-extrabold ${
                      plan.highlight ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm ${
                      plan.highlight ? "text-blue-100" : "text-gray-400"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <svg
                      className={`h-4 w-4 flex-shrink-0 ${
                        plan.highlight ? "text-blue-200" : "text-blue-500"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className={
                        plan.highlight ? "text-blue-50" : "text-gray-600"
                      }
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.planId, plan.name)}
                disabled={loadingPlan === plan.name}
                className={`w-full rounded-xl py-3 text-sm font-bold transition-all cursor-pointer disabled:opacity-60 ${
                  plan.highlight
                    ? "bg-white text-blue-600 hover:bg-blue-50"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {loadingPlan === plan.name ? "Loading..." : plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* ── Trust Badges ── */}
        <div className="mt-14 mx-auto max-w-2xl text-center">
          <p className="text-sm text-gray-400 mb-4">
            Payments secured by Razorpay · Cancel anytime · Indian pricing in ₹
            INR
          </p>
          <div className="flex justify-center gap-8 text-gray-300">
            {["🔒 Secure Checkout", "📧 Email Receipt", "🔄 Easy Cancellation"].map(
              (badge) => (
                <span key={badge} className="text-sm text-gray-500">
                  {badge}
                </span>
              )
            )}
          </div>
        </div>
      </main>
    </>
  );
}
