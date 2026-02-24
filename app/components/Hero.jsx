"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const headlineRef = useRef(null);
  const statsRef = useRef(null);
  const carRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ================= INTRO ================= */

      const tl = gsap.timeline();

      tl.from(headlineRef.current.children, {
        y: 40,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out",
      });

      tl.from(statsRef.current.children, {
        y: 20,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.4");

      /* ================= SCROLL CAR ================= */

      gsap.to(carRef.current, {
        x: 500,
        rotate: 8,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: carRef.current,
          start: "top center",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      /* ================= WHEEL ROTATION ILLUSION ================= */

      gsap.to(carRef.current, {
        rotation: "+=360",
        scrollTrigger: {
          trigger: carRef.current,
          start: "top center",
          end: "bottom top",
          scrub: 2,
        },
      });

      /* ================= PROGRESS BAR ================= */

      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          scrub: true,
        },
      });

    });

    return () => ctx.revert();
  }, []);

  const text = "WELCOME ITZ FIZZ";

  return (
    <section className="relative h-screen overflow-hidden bg-black text-white flex flex-col items-center justify-center">

      {/* Scroll progress */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/20">
        <div ref={progressRef} className="h-full bg-white origin-left scale-x-0"/>
      </div>

      {/* Headline */}
      <h1
        ref={headlineRef}
        className="flex gap-2 tracking-[0.4em] text-5xl md:text-7xl mb-10"
      >
        {text.split("").map((c, i) => (
          <span key={i}>{c}</span>
        ))}
      </h1>

      {/* Stats */}
      <div ref={statsRef} className="flex gap-10 text-center">
        <div>
          <p className="text-3xl font-bold">98%</p>
          <p className="opacity-70 text-sm">Client Satisfaction</p>
        </div>

        <div>
          <p className="text-3xl font-bold">120+</p>
          <p className="opacity-70 text-sm">Projects</p>
        </div>

        <div>
          <p className="text-3xl font-bold">5 Years</p>
          <p className="opacity-70 text-sm">Experience</p>
        </div>
      </div>

      {/* Car */}
      <img
        ref={carRef}
        src="/car.png"
        className="absolute bottom-10 w-[380px] pointer-events-none"
      />

      {/* Parallax background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-900 via-black to-black blur-[60px]" />
    </section>
  );
}