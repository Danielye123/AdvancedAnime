import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 120, suffix: "M+", label: "Players Worldwide" },
  { value: 50, suffix: "+", label: "Connected Worlds" },
  { value: 99, suffix: "%", label: "Network Uptime" },
  { value: 24, suffix: "/7", label: "Live Support" },
];

const Stats = () => {
  const sectionRef = useRef(null);
  const numberRefs = useRef([]);

  useGSAP(
    () => {
      numberRefs.current.forEach((el, i) => {
        if (!el) return;
        const counter = { val: 0 };
        gsap.to(counter, {
          val: stats[i].value,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = Math.round(counter.val).toLocaleString();
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="w-screen bg-black py-24 text-blue-50">
      <div className="container mx-auto md:mt-[3rem] md:mb-[10rem] px-5 md:px-10">
        <AnimatedTitle
          title="b<b>y</b> the <br /> num<b>b</b>ers"
          containerClass="!text-blue-50 text-center mb-16"
        />

        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center text-center">
              <p className="special-font font-zentry font-black text-5xl text-violet-300 md:text-7xl">
                <span ref={(el) => (numberRefs.current[i] = el)}>0</span>
                {s.suffix}
              </p>
              <p className="mt-3 max-w-[10rem] font-circular-web text-xs uppercase tracking-wide opacity-60">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
