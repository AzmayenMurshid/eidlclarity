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
  { label: "Contact", href: "#contact" },
];

const stats = [
  { value: "1k+", label: "businesses guided" },
  { value: "24/7", label: "loan review support" },
  { value: "100%", label: "focused on clarity" },
];

const services = [
  {
    title: "EIDL Review",
    text: "Understand your SBA loan terms, decisions, and required next steps with practical guidance.",
  },
  {
    title: "Document Clarity",
    text: "Translate confusing SBA correspondence into plain-English action items your team can follow.",
  },
  {
    title: "Action Planning",
    text: "Get a clear roadmap for what to do next, including referrals, documentation, and follow-up timing.",
  },
];

const steps = [
  "Share your loan details and SBA communications.",
  "Review the key issues, timelines, and next steps.",
  "Move forward with a clear, informed plan.",
];

const faqs = [
  {
    question: "What is EIDL Clarity?",
    answer:
      "EIDL Clarity helps business owners interpret SBA disaster loan information and determine the most sensible path forward.",
  },
  {
    question: "Who is this for?",
    answer:
      "It is designed for small business owners, lenders, and operators navigating EIDL questions, SBA notices, or loan issue concerns.",
  },
  {
    question: "Do you provide legal advice?",
    answer:
      "We provide educational guidance and practical support, while encouraging clients to seek legal or financial counsel when needed.",
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
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#152c58] text-lg font-bold text-white">
              E
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight text-slate-900">
                EIDL Clarity
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="transition hover:text-[#007b5b]">
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-[#152c58] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#007b5b]"
          >
            Book a consult
          </a>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="inline-flex rounded-full border border-[#cde3cc] bg-[#f2f5f8] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#007b5b]">
                Small-business loan guidance
              </span>

              <h1 className="mt-6 max-w-xl text-4xl font-black leading-tight tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
                Clarity for every step in your SBA loan journey.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                EIDL Clarity helps business owners understand SBA disaster loan issues, next steps,
                and the information that matters most before making a decision.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-[#152c58] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#007b5b]"
                >
                  Schedule a consultation
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
                >
                  Learn more
                </a>
              </div>

              <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="text-2xl font-black text-[#152c58]">{stat.value}</div>
                    <div className="mt-1 text-sm text-slate-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_24px_70px_rgba(15,23,42,0.10)]">
              <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
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
        </section>

        <section id="about" className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#007b5b]">
                Why EIDL Clarity
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                Clear answers when your loan questions feel overwhelming.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {services.map((service) => (
                <div key={service.title} className="rounded-3xl border border-slate-200 bg-[#f2f5f8] p-7 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#cde3cc] text-xl text-[#152c58]">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{service.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[28px] bg-[#152c58] p-8 text-white shadow-[0_24px_70px_rgba(21,44,88,0.22)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffaf03]">
                How it works
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight">A simpler path to informed action.</h2>
              <p className="mt-4 text-base leading-7 text-[#e8eae9]">
                We break down the process into practical steps so you can focus on the right decisions instead of the noise.
              </p>
            </div>

            <div className="space-y-5">
              {steps.map((step, index) => (
                <div key={step} className="flex gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#cde3cc] font-bold text-[#152c58]">
                    {index + 1}
                  </div>
                  <p className="pt-2 text-lg leading-8 text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-[#f2f5f8]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#007b5b]">FAQ</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                Common questions, answered clearly.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {faqs.map((item) => (
                <div key={item.question} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900">{item.question}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="resources" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm md:p-12">
            <div className="mx-auto max-w-3xl text-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#007b5b]">Resources</p>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                  Need guidance before your next move?
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  Start with a conversation. We can help you review your SBA loan situation and map the cleanest, most informed next steps.
                </p>
                <a
                  href="#top"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-[#152c58] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#007b5b]"
                >
                  Go to the Start Form
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#152c58]">
          <div className="mx-auto max-w-7xl px-6 py-16 text-center text-white lg:px-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ffaf03]">
              Ready when you are
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              Get a clearer understanding of your next step.
            </h2>
            <a
              href="mailto:hello@eidlclarity.com"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#152c58] transition hover:bg-[#ffaf03]"
            >
              Contact EIDL Clarity
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>© 2026 EIDL Clarity</div>
          <div className="flex gap-5">
            <a href="#about" className="hover:text-slate-900">About</a>
            <a href="#faq" className="hover:text-slate-900">FAQ</a>
            <a href="#contact" className="hover:text-slate-900">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
