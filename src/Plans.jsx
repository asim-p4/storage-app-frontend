import { useState } from "react";
import { Link } from "react-router-dom";
import { createSubscription } from "./api/subscriptionApi";

export const PLAN_CATALOG = [
  {
    name: "Starter",
    tagline: "Great for individuals",
    storage: "2 TB",
    cta: "Choose 2 TB",
    popular: false,
    features: [
      "Secure cloud storage",
      "Link & folder sharing",
      "Basic support",
    ],
    monthly: {
      priceId: "price_1TWwBYDQi8FMtKNdXkcYtQN4",
      price: 9.99,
      period: "/mo",
    },
    yearly: {
      priceId: "price_1TWwD5DQi8FMtKNdiwAN2SVy",
      price: 99,
      period: "/yr",
    },
  },
  {
    name: "Pro",
    tagline: "For creators & devs",
    storage: "5 TB",
    cta: "Choose 5 TB",
    popular: true,
    features: ["Everything in Starter", "Priority uploads", "Email support"],
    monthly: {
      priceId: "price_1TWwEyDQi8FMtKNdfsa1mcJ6",
      price: 19.99,
      period: "/mo",
    },
    yearly: {
      priceId: "price_1TWwFQDQi8FMtKNdAQH2Qhah",
      price: 199,
      period: "/yr",
    },
  },
  {
    name: "Ultimate",
    tagline: "Teams & power users",
    storage: "10 TB",
    cta: "Choose 10 TB",
    popular: false,
    features: ["Everything in Pro", "Version history", "Priority support"],
    monthly: {
      priceId: "price_1TWwGhDQi8FMtKNdWZJbOIdJ",
      price: 39.99,
      period: "/mo",
    },
    yearly: {
      priceId: "price_1TWwH6DQi8FMtKNdqb8CxdFo",
      price: 399,
      period: "/yr",
    },
  },
];

function classNames(...cls) {
  return cls.filter(Boolean).join(" ");
}

function Price({ value }) {
  return (
    <div className="flex items-baseline gap-1">
      <span className="text-lg font-semibold text-slate-700">$</span>

      <span className="text-4xl font-bold tracking-tight text-slate-900">
        {value}
      </span>
    </div>
  );
}

function PlanCard({ plan, billingMode, onSelect }) {
  const pricing = billingMode === "monthly" ? plan.monthly : plan.yearly;

  return (
    <div
      className={classNames(
        "relative flex flex-col rounded-2xl border bg-white p-5 shadow-sm transition",
        "hover:shadow-md",

        plan.popular
          ? "border-blue-500/60 ring-1 ring-blue-500/20"
          : "border-slate-200",
      )}
    >
      {plan.popular && (
        <div className="absolute -top-2 right-4 select-none rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white shadow">
          Most Popular
        </div>
      )}

      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>

          <p className="text-sm text-slate-500">{plan.tagline}</p>
        </div>

        <span className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">
          {plan.storage}
        </span>
      </div>

      <div className="mb-4 flex items-end gap-2">
        <Price value={pricing.price} />

        <span className="mb-[6px] text-sm text-slate-500">
          {pricing.period}
        </span>
      </div>

      <ul className="mb-5 space-y-2 text-sm text-slate-600">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <svg
              className="mt-0.5 h-4 w-4 flex-none"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span>{f}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect(pricing)}
        className={classNames(
          "mt-auto cursor-pointer inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2",

          plan.popular
            ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600"
            : "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900",
        )}
      >
        {plan.cta}
      </button>
    </div>
  );
}

export default function Plans() {
  const [mode, setMode] = useState("monthly");

  async function handleSelect({ priceId }) {
    console.log(priceId);
    const { sessionUrl } = await createSubscription(priceId);
    console.log(sessionUrl);
    window.location.href = sessionUrl;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">
          Choose your plan
        </h1>

        <Link to="/">Home</Link>
      </header>

      {/* Billing Toggle */}

      <div className="mb-6 inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1 shadow-sm">
        <button
          onClick={() => setMode("monthly")}
          className={classNames(
            "rounded-lg px-4 py-2 text-sm font-medium border-2 cursor-pointer",

            mode === "monthly" ? "border-blue-500" : "border-white",
          )}
        >
          Monthly
        </button>

        <button
          onClick={() => setMode("yearly")}
          className={classNames(
            "rounded-lg px-4 py-2 text-sm font-medium border-2 cursor-pointer",

            mode === "yearly" ? "border-blue-500" : "border-white",
          )}
        >
          Yearly
          <span className="ml-1 hidden text-xs text-blue-600 sm:inline">
            (2 months off)
          </span>
        </button>
      </div>

      {/* Pricing Cards */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PLAN_CATALOG.map((plan) => (
          <PlanCard
            key={plan.name}
            plan={plan}
            billingMode={mode}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <p className="mt-6 text-xs text-slate-500">
        Secure recurring billing powered by Stripe.
      </p>
    </div>
  );
}
