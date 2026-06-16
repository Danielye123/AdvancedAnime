import { useRef, useState } from "react";
import AnimatedTitle from "./AnimatedTitle";

const TiltCard = ({ children, className = "" }) => {
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
    >
      {children}
    </div>
  );
};

const tiles = [
  { src: "/img/gallery-1.webp", title: "Origins", className: "col-span-2 row-span-2" },
  { src: "/img/gallery-2.webp", title: "Realms", className: "col-span-2 md:col-span-1" },
  { src: "/img/gallery-3.webp", title: "Allies", className: "col-span-2 md:col-span-1" },
  { src: "/img/stones.webp", title: "Relics", className: "col-span-2" },
  { src: "/img/gallery-4.webp", title: "Beasts", className: "col-span-2 md:col-span-1 md:row-span-2" },
  { src: "/img/gallery-5.webp", title: "Legends", className: "col-span-2 md:col-span-1" },
  { src: "/img/gallery-6.jpg", title: "Aetherion", className: "col-span-2 row-span-2 bg-blue-50", fit: "contain" },
];

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
          {tiles.map((tile) => (
            <TiltCard key={tile.title} className={tile.className}>
              <img
                src={tile.src}
                alt={tile.title}
                className={`size-full transition-transform duration-500 group-hover:scale-110 ${
                  tile.fit === "contain" ? "object-contain" : "object-cover"
                }`}
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h3 className="bento-title special-font p-5 text-blue-50">
                  {tile.title}
                </h3>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
