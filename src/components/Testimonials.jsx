import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";

const testimonials = [
  {
    quote:
      "I have never felt this connected to a game world. Every session feels like it actually matters.",
    name: "Aria Vance",
    role: "Pro Player",
  },
  {
    quote:
      "The cross-world economy is genuinely next level. My progress finally goes everywhere with me.",
    name: "Kai Mercer",
    role: "Community Lead",
  },
  {
    quote:
      "It blurs the line between playing and belonging. The community here is something special.",
    name: "Lena Cho",
    role: "Streamer",
  },
  {
    quote:
      "Beautifully built and endlessly deep. I keep discovering new layers every single week.",
    name: "Diego Santos",
    role: "Game Designer",
  },
];

const Testimonials = () => {
  const trackRef = useRef(null);
  const tween = useRef(null);

  useGSAP(() => {
    tween.current = gsap.to(trackRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 30,
      repeat: -1,
    });
  });

  const pause = () => tween.current?.pause();
  const play = () => tween.current?.play();

  return (
    <section id="testimonials" className="w-screen overflow-hidden bg-blue-50 py-24">
      <div className="container mx-auto mb-12 px-5 md:px-10">
        <p className="font-general text-sm uppercase text-black md:text-[10px]">
          voices from the realm
        </p>
        <AnimatedTitle
          title="what pl<b>a</b>yers <br /> are sa<b>y</b>ing"
          containerClass="!text-black mt-5"
        />
      </div>

      <div
        ref={trackRef}
        className="flex w-max"
        onMouseEnter={pause}
        onMouseLeave={play}
      >
        {[...testimonials, ...testimonials].map((t, i) => (
          <div
            key={i}
            className="border-hsla mr-7 flex w-[80vw] shrink-0 flex-col justify-between rounded-md bg-black p-8 text-blue-50 md:w-[28rem]"
          >
            <p className="font-circular-web text-lg leading-relaxed">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-8">
              <p className="special-font font-zentry text-2xl">{t.name}</p>
              <p className="font-general text-xs uppercase opacity-60">
                {t.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
