import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const navItems = [
  { label: "Nexus", href: "#features" },
  { label: "Prologue", href: "#story" },
  { label: "Vault", href: "#gallery" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "About", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isNavVisible, setIsNavVisible] = useState(true)

  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if(currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove('floating-nav');
    } else if(currentScrollY > lastScrollY){
      setIsNavVisible(false);
      navContainerRef.current.classList.add('floating-nav');
    } else if(currentScrollY < lastScrollY){
      setIsNavVisible(true);
      navContainerRef.current.classList.add('floating-nav')
    }

    setLastScrollY(currentScrollY)
  }, [currentScrollY, lastScrollY])

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    })
  }, [isNavVisible])
  
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  }

  useEffect(() => {
    if(isAudioPlaying){
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying])

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-5">
            <a href="#" aria-label="Zentry home" className="block w-12">
              <svg viewBox="0 0 64 64" role="img" aria-label="Zentry" className="size-full">
                <defs>
                  <linearGradient
                    id="zentry-mark"
                    x1="0"
                    y1="0"
                    x2="64"
                    y2="64"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#c4b5fd" />
                    <stop offset="1" stopColor="#bef264" />
                  </linearGradient>
                </defs>
                <g
                  fill="none"
                  stroke="url(#zentry-mark)"
                  strokeWidth="5"
                  strokeLinejoin="round"
                >
                  <polygon points="32,7 54,19 54,45 32,57 10,45 10,19" />
                </g>
                <circle cx="32" cy="32" r="7" fill="url(#zentry-mark)" />
              </svg>
            </a>

            <Button
              id="production-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="border border-white/30 !bg-transparent !text-blue-50 transition-colors duration-300 hover:!bg-blue-50 hover:!text-black md:flex hidden items-center justify-center gap-1"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="nav-hover-btn"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <button className="ml-10 flex items-center space-x-0.5" onClick={toggleAudioIndicator}>
              <audio ref={audioElementRef} className="hidden" src="/audio/loop.mp3" loop />
                {[1, 2, 3, 4].map((bar) => (
                  <div key={bar} className={`indicator-line ${isIndicatorActive ? 'active' : ''}`} style={{ animationDelay: `${bar * 0.1}s`}} />
                ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
