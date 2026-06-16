import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const phases = [
  {
    phase: "Phase 01",
    title: "Genesis",
    desc: "Lay the foundation — core systems online and the first realms opened to early explorers.",
  },
  {
    phase: "Phase 02",
    title: "Expansion",
    desc: "New worlds, cross-platform play and a growing economy connecting every player.",
  },
  {
    phase: "Phase 03",
    title: "Convergence",
    desc: "Worlds merge into a single shared layer where progress carries everywhere.",
  },
  {
    phase: "Phase 04",
    title: "Ascension",
    desc: "A self-sustaining metagame, owned and shaped by the community that built it.",
  },
];

const clamp01 = (v) => Math.min(Math.max(v, 0), 1);

const Timeline = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const fillRef = useRef(null);
  const phaseRefs = useRef([]);
  const activeRef = useRef(-1);
  const directionRef = useRef(1);

  const [markerPositions, setMarkerPositions] = useState(
    phases.map((_, i) => i / (phases.length - 1))
  );
  const [activeIndex, setActiveIndex] = useState(-1);
  const [skipDir, setSkipDir] = useState(1);

  const handleSkip = () => {
    const target = directionRef.current === -1 ? "#gallery" : "#testimonials";
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  };

  useGSAP(
    () => {
      const track = trackRef.current;
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      const computePoints = () => {
        const amount = getScrollAmount();
        if (amount <= 0) {
          const even = phases.map((_, i) => i / (phases.length - 1));
          return { snap: [0, ...even], markers: even };
        }
        const phasePts = phaseRefs.current
          .filter(Boolean)
          .map((el) => clamp01(el.offsetLeft / amount));
        return { snap: [0, ...phasePts], markers: phasePts };
      };

      let points = computePoints();
      setMarkerPositions(points.markers);

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: (value) => {
              const snaps = computePoints().snap;
              return snaps.reduce(
                (best, pt) =>
                  Math.abs(pt - value) < Math.abs(best - value) ? pt : best,
                snaps[0]
              );
            },
            duration: { min: 0.2, max: 0.6 },
            delay: 0.05,
            ease: "power1.inOut",
          },
          onRefresh: () => {
            points = computePoints();
            setMarkerPositions(points.markers);
          },
          onUpdate: (self) => {
            const p = self.progress;
            gsap.set(fillRef.current, { scaleX: p });

            if (self.direction !== directionRef.current) {
              directionRef.current = self.direction;
              setSkipDir(self.direction);
            }

            let active = -1;
            for (let i = 0; i < points.markers.length; i++) {
              if (p + 0.005 >= points.markers[i]) active = i;
            }
            if (active !== activeRef.current) {
              activeRef.current = active;
              setActiveIndex(active);
            }
          },
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="roadmap"
      ref={containerRef}
      className="relative h-dvh w-screen overflow-hidden bg-black text-blue-50"
    >
      <div ref={trackRef} className="flex h-full w-max items-center">
        <div className="flex h-full w-screen shrink-0 flex-col justify-center px-10 md:px-20">
          <p className="font-general text-sm uppercase md:text-[10px]">
            the path ahead
          </p>
          <h2 className="special-font mt-4 font-zentry text-6xl font-black uppercase leading-[0.9] md:text-9xl">
            the <br /> ro<b>a</b>dmap
          </h2>
          <p className="mt-6 max-w-sm font-circular-web text-violet-50 opacity-70">
            Scroll to journey through what&apos;s coming next.
          </p>
        </div>

        {phases.map((p, i) => (
          <div
            key={p.phase}
            ref={(el) => (phaseRefs.current[i] = el)}
            className="relative flex h-full w-screen shrink-0 flex-col justify-center overflow-hidden px-10 md:px-20"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-zentry text-[40vw] font-black leading-none text-white/10 md:text-[24vw]"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="relative z-10">
              <p className="font-general text-sm uppercase text-violet-300">
                {p.phase}
              </p>
              <h3 className="bento-title special-font mt-4">{p.title}</h3>
              <p className="mt-4 max-w-md font-circular-web text-violet-50 opacity-70">
                {p.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSkip}
        className="absolute right-10 top-28 z-30 flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-5 py-2 font-general text-xs uppercase text-blue-50 backdrop-blur transition-colors hover:bg-white/10 md:right-20"
      >
        Skip
        <span
          className={`transition-transform duration-300 ${
            skipDir === -1 ? "rotate-180" : ""
          }`}
        >
          &#8595;
        </span>
      </button>

      <div className="pointer-events-none absolute bottom-0 left-0 w-full px-10 pb-12 md:px-20">
        <div className="relative h-px w-full bg-white/15">
          <div
            ref={fillRef}
            className="absolute left-0 top-0 h-full w-full origin-left scale-x-0 bg-violet-300"
          />

          {markerPositions.map((left, i) => (
            <div
              key={phases[i].title}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${left * 100}%` }}
            >
              <div
                className={`size-3 rounded-full border transition-all duration-300 ${
                  activeIndex >= i
                    ? "scale-125 border-violet-300 bg-violet-300"
                    : "border-white/40 bg-black"
                }`}
              />
              <span
                className={`absolute left-1/2 mt-3 -translate-x-1/2 whitespace-nowrap font-general text-[10px] uppercase transition-colors duration-300 ${
                  activeIndex >= i ? "text-violet-300" : "text-white/40"
                }`}
              >
                {phases[i].title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
