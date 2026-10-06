"use client";

import { useEffect } from "react";
import {
  applyTrackingToHubspotForm,
  getHubspotTrackingValues,
  persistTrackingSnapshot,
} from "@/lib/utm";

declare global {
  interface Window {
    hbspt?: {
      forms?: {
        create: (options: Record<string, unknown>) => void;
      };
    };
  }
}

const navItems = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Resources", href: "#resources" },
];

const steps = [
  {
    title: "Business Status",
    detail: "Is the business still operating, struggling, or permanently closed?",
  },
  {
    title: "Loan & Guarantee Details",
    detail: "Loan amount, collateral, and whether a personal guarantee applies can matter.",
  },
  {
    title: "Financial Situation",
    detail: "Your ability to repay and the financial condition of the business can affect which options may warrant further review. ",
  },
];

const reviewSteps = [
  {
    title: "Tell Us About Your Situation",
    detail: "Answer a few basic questions about your business and EIDL.",
  },
  {
    title: "Initial Qualification Review",
    detail: "Your information is reviewed to determine whether your situation may be appropriate for further evaluation.",
  },
  {
    title: "Understand Your Options",
    detail: "If appropriate, you will learn what potential resolution paths may warrant further review.",
  },
  {
    title: "Determine Next Steps",
    detail: "Decide whether moving forward with a more detailed review makes sense for your situation."
  },
];

export default function Home() {
  useEffect(() => {
    persistTrackingSnapshot();
    const hiddenFields = getHubspotTrackingValues();

    const target = document.getElementById("hubspot-form-target");
    if (!target) {
      return;
    }

    const applyTrackingSafely = (root: ParentNode | Element | null) => {
      if (!root) {
        return;
      }

      const form = root.querySelector("form") || (root as Element).closest("form");
      applyTrackingToHubspotForm(form as Element | null);
    };

    const hubspotConfig = {
      region: "na1",
      portalId: "44019641",
      formId: "4cde914f-7695-4cae-9dd8-62273ef78ce8",
      target: "#hubspot-form-target",
      hiddenFields,
      onFormReady: (form: Element | null) => {
        applyTrackingToHubspotForm(form);

        let attempts = 0;
        const retry = () => {
          if (attempts >= 12) {
            return;
          }

          attempts += 1;
          applyTrackingSafely(form || target);
          setTimeout(retry, 250);
        };

        retry();
      },
    };

    const loadHubspot = () => {
      if (window.hbspt?.forms?.create) {
        window.hbspt.forms.create(hubspotConfig);

        const observer = new MutationObserver(() => {
          applyTrackingSafely(target);
        });

        observer.observe(target, {
          childList: true,
          subtree: true,
          attributes: true,
        });

        return;
      }

      const existingScript = document.querySelector('script[src*="js.hsforms.net/forms/embed"]');
      if (existingScript) {
        return;
      }

      const script = document.createElement("script");
      script.src = "https://js.hsforms.net/forms/embed/v2.js";
      script.async = true;
      script.onload = () => {
        if (window.hbspt?.forms?.create) {
          window.hbspt.forms.create(hubspotConfig);

          const observer = new MutationObserver(() => {
            applyTrackingSafely(target);
          });

          observer.observe(target, {
            childList: true,
            subtree: true,
            attributes: true,
          });
        }
      };
      document.body.appendChild(script);
    };

    loadHubspot();
  }, []);

  return (
    <div id="top" className="min-h-screen bg-[#f2f5f8] text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-xl p-1.5">
              <img src="/clarity/clarity-logo.png" alt="EIDL Clarity Logo" className="h-16 w-auto" />
            </div>
          </div>
          <nav className="hidden items-center gap-5 text-sm font-medium text-slate-700 md:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="transition hover:text-[#007b5b]">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section
          className="relative w-full overflow-hidden border border-slate-200 px-[10px] py-10 shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:px-6 lg:px-10 lg:py-24"
          style={{
            backgroundImage: "url('/clarity/eidl clarity hero background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mx-auto grid max-w-7xl items-center gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
            <div>
              <h1 className="mt-6 max-w-xl text-4xl font-black leading-tight tracking-tight text-white text-slate-950 md:text-5xl lg:text-6xl">
                See if you Qualify
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 text-white">
                If your business is struggling with a COVID EIDL, has closed, or you&#39;re unsure what to do next, there may be options available based on your situation.
                Answer a few quick questions to see if your EIDL situation may qualify for a resolution review.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              </div>
            </div>
            <div>
              <div className="box-shadow-5px mx-auto w-[calc(100%-20px)] max-w-[475px] p-2 backdrop-blur-[1px] sm:w-full">
                <div className="rounded-[10px] border border-white/20 bg-white/90 p-2">
                  <div
                    id="hubspot-form-target"
                    className="hs-form-frame"
                    data-region="na1"
                    data-form-id="4cde914f-7695-4cae-9dd8-62273ef78ce8"
                    data-portal-id="44019641"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                When Forgiveness Isn&#39;t an Option, Resolution May Be
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Many business owners are still waiting and hoping their COVID EIDL will simply go away. Resolution is different. 
                It starts with understanding your loan, your business status, your ability to repay, and the options that may be available based on your specific circumstances. 
                Depending on your situation, there may be paths worth exploring before simply continuing to wait.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full border-y border-[#dfeaf7] bg-[#edf5ff]/80 px-6 py-20 shadow-[0_20px_50px_rgba(21,44,88,0.06)] lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1.25fr]">
            <div className="space-y-5">
              <div className="mb-4">
                <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                  Every EIDL Solution Is Different
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  The options available to a COVID EIDL borrower can depend on several factors.
                  Understanding the details of your loan and business is an important first step.
                </p>
              </div>

              {steps.map((step) => (
                <div key={step.title} className="flex items-start gap-4 border-b-2 border-slate-300 pb-4 last:border-b-0 last:pb-0">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center text-lg font-bold text-[#152c58]">
                    →
                  </div>
                  <div className="flex-1">
                    <p className="text-xl font-semibold leading-8 text-slate-800">{step.title}</p>
                    <p className="mt-1 text-base leading-7 text-slate-600">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(21,44,88,0.12)]">
              <img
                src="/clarity/eidl clarity business collage.png"
                alt="EIDL Clarity business collage"
                className="h-full min-h-[420px] w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section id="faq" className="bg-[#f2f5f8]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                How The Review Works
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-4 md:gap-8">
              {reviewSteps.map((item, index) => (
                <div
                  key={item.title}
                  className={
                    index < reviewSteps.length - 1
                      ? "border-b border-slate-300 pb-5 md:border-b-0 md:border-r md:pr-8"
                      : "pb-0 md:pl-8"
                  }
                >
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="resources" className="pt-8 pb-0">
          <div
            className="relative mx-auto overflow-hidden border-slate-200 shadow-sm md:p-12"
            style={{
              backgroundImage: "url('/clarity/eidlclarity guidance.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'top center',
            }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,30,54,0.20),rgba(14,30,54,0.82))] backdrop-blur-sm" />
            <div className="relative mx-auto  px-8 py-12 text-center md:px-12">
              <div>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-4xl">
                  Need guidance before your next move?
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-100">
                  Start with a conversation. We can help you review your SBA loan situation and map the cleanest, most informed next steps.
                </p>
                <a
                  href="#top"
                  className="mt-8 inline-flex items-center justify-center rounded-[10px] bg-[#ffaf03] px-7 py-3 text-sm font-semibold text-[#152c58] transition hover:bg-white hover:text-[#152c58]"
                >
                  Get Free Consultation
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="mt-0 bg-[#152c58]">
          <div className="mx-auto max-w-7xl px-6 py-12 text-center text-white lg:px-10">
            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              Get a clearer understanding of your next step.
            </h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            </div>
            <p className="mt-6 text-sm text-[#e8eae9]">
              Many business owners are still waiting and hoping their COVID EIDL will simply go away. Resolution is different. 
              It starts with understanding your loan, your business status, your ability to repay, and the options that may be available based on your specific circumstances. 
              Depending on your situation, there may be paths worth exploring before simply continuing to wait.
              </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>© 2026 EIDL Clarity</div>
          <div className="flex items-center gap-5">
            <a href="https://go.eidlclarity.com/contact-us" className="hover:text-slate-900">Contact</a>
            <span className="text-slate-400">|</span>
            <a href="https://go.eidlclarity.com/privacy-policy" className="hover:text-slate-900">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
