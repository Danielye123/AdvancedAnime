import { useState } from "react";
import AnimatedTitle from "./AnimatedTitle";

const faqs = [
  {
    q: "What exactly is this?",
    a: "A shared, cross-platform play layer that connects your progress across every game and world you touch.",
  },
  {
    q: "Can I play with friends?",
    a: "Yes. Cross-play is built in, so you can squad up with anyone — whatever game or device they're on.",
  },
  {
    q: "Which platforms are supported?",
    a: "It runs in the browser today, with native desktop and mobile experiences rolling out across the roadmap.",
  },
  {
    q: "How much does it cost?",
    a: "Getting started is free. Optional premium tiers unlock cosmetics, boosts and early access to new realms.",
  },
  {
    q: "When does the next phase launch?",
    a: "Expansion is live now, with Convergence following shortly after. Check the roadmap for the full timeline.",
  },
];

const FaqItem = ({ q, a, isOpen, onClick }) => (
  <div className="border-b border-black/10">
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between gap-6 py-6 text-left"
    >
      <span className="special-font font-zentry text-2xl uppercase text-black md:text-3xl">
        {q}
      </span>
      <span
        className={`shrink-0 text-3xl text-violet-300 transition-transform duration-300 ${
          isOpen ? "rotate-45" : ""
        }`}
      >
        +
      </span>
    </button>
    <div
      className={`grid transition-all duration-500 ease-out ${
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">
        <p className="max-w-2xl pb-6 font-circular-web text-black/70">{a}</p>
      </div>
    </div>
  </div>
);

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="w-screen bg-blue-50 py-24">
      <div className="container mx-auto px-5 md:px-10">
        <p className="font-general text-sm uppercase text-black md:text-[10px]">
          need to know
        </p>
        <AnimatedTitle
          title="frequently <br /> as<b>k</b>ed"
          containerClass="!text-black mt-5 mb-12"
        />

        <div className="mx-auto max-w-3xl">
          {faqs.map((f, i) => (
            <FaqItem
              key={f.q}
              q={f.q}
              a={f.a}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
