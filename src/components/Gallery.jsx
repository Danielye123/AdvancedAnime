import { useRef, useState } from "react";
import AnimatedTitle from "./AnimatedTitle";

const TiltCard = ({ children, className = "", onClick }) => {
  const ref = useRef(null);
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTransform(
      `perspective(700px) rotateX(${y * -8}deg) rotateY(${x * 8}deg) scale3d(0.97, 0.97, 0.97)`
    );
  };

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-md transition-transform duration-300 ease-out ${className}`}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTransform("")}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const tiles = [
  { src: "/img/gallery-1.webp", title: "Origins", eyebrow: "the first ascent", className: "col-span-2 row-span-2" },
  { src: "/img/gallery-2.webp", title: "Realms", eyebrow: "worlds beyond the veil", className: "col-span-2" },
  { src: "/img/gallery-3.webp", title: "Allies", eyebrow: "bound by the aether", className: "col-span-2 md:col-span-1" },
  { src: "/img/gallery-4.webp", title: "Beasts", eyebrow: "creatures of the rift", className: "col-span-2 md:col-span-1 md:row-span-2" },
  { title: "Visions", eyebrow: "tap to shift", className: "col-span-2 row-span-2", video: true },
  { src: "/img/stones.webp", title: "Relics", eyebrow: "aether-charged fragments", className: "col-span-2", display: true },
  { src: "/img/gallery-5.webp", title: "Legends", eyebrow: "echoes of the past", className: "col-span-2 md:col-span-1" },
];

const TileLabel = ({ eyebrow, title }) => (
  <div className="absolute inset-x-0 bottom-0 p-5">
    {eyebrow && (
      <p className="font-general text-[10px] uppercase tracking-widest text-blue-50/70">
        {eyebrow}
      </p>
    )}
    <h3 className="bento-title special-font text-blue-50">{title}</h3>
  </div>
);

const HERO_VIDEO_COUNT = 4;

const VideoTile = ({ eyebrow, title, className }) => {
  const [index, setIndex] = useState(1);
  const showNext = () => setIndex((i) => (i % HERO_VIDEO_COUNT) + 1);

  return (
    <div
      className={`group relative cursor-pointer overflow-hidden rounded-md ${className}`}
      onClick={showNext}
    >
      <div key={index} className="vault-video-in size-full">
        <video
          src={`/videos/hero-${index}.mp4`}
          autoPlay
          loop
          muted
          playsInline
          className="size-full object-cover object-center"
        />
      </div>
      <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-blue-50/20 bg-black/40 px-3 py-1.5 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="size-3 fill-blue-50">
          <path d="M8 5v14l11-7z" />
        </svg>
        <span className="font-general text-[10px] uppercase tracking-widest text-blue-50">
          next
        </span>
      </div>
      <TileLabel eyebrow={`${eyebrow} · ${index}/${HERO_VIDEO_COUNT}`} title={title} />
    </div>
  );
};

const Gallery = () => {
  return (
    <section id="gallery" className="w-screen bg-blue-50 py-24">
      <div className="container mx-auto px-5 md:px-10">
        <p className="font-general text-sm uppercase text-black md:text-[10px]">
          the vault
        </p>
        <AnimatedTitle
          title="a gli<b>m</b>pse into <br /> the un<b>i</b>verse"
          containerClass="!text-black mt-5 mb-12"
        />

        <div className="grid grid-flow-dense auto-rows-[180px] grid-cols-2 gap-4 md:auto-rows-[220px] md:grid-cols-4 md:gap-6">
          {tiles.map((tile) =>
            tile.video ? (
              <VideoTile
                key={tile.title}
                eyebrow={tile.eyebrow}
                title={tile.title}
                className={tile.className}
              />
            ) : tile.display ? (
              <TiltCard key={tile.title} className={tile.className}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,#1b1f4d_0%,#08080f_72%)]" />
                <div className="absolute left-[34%] top-1/2 size-36 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-blue-300/30 blur-3xl" />
                <div className="absolute left-[64%] top-1/2 size-36 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-violet-300/40 blur-3xl" />
                <div className="relic-float relative size-full">
                  <img
                    src={tile.src}
                    alt={tile.title}
                    className="size-full scale-110 object-contain transition-transform duration-500 group-hover:scale-125"
                  />
                </div>
                <TileLabel eyebrow={tile.eyebrow} title={tile.title} />
              </TiltCard>
            ) : (
              <TiltCard key={tile.title} className={tile.className}>
                <img
                  src={tile.src}
                  alt={tile.title}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/90" />
                <TileLabel eyebrow={tile.eyebrow} title={tile.title} />
              </TiltCard>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
