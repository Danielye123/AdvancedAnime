import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const words = ["Play", "Connect", "Earn", "Explore", "Compete", "Evolve"];

const Marquee = () => {
  const trackRef = useRef(null);

  useGSAP(() => {
    gsap.to(trackRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 18,
      repeat: -1,
    });
  });

  return (
    <section className="w-screen overflow-hidden bg-violet-300 py-6 md:py-8">
      <div ref={trackRef} className="flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
            {words.map((word, i) => (
              <div key={i} className="flex items-center">
                <span className="special-font font-zentry font-black uppercase text-blue-100 text-6xl md:text-9xl px-6 md:px-10">
                  {word}
                </span>
                <span className="text-blue-100/60 text-3xl md:text-5xl">&#9670;</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Marquee;
