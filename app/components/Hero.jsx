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

      /* Intro animation */
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

      /* Scroll animation for car */
      gsap.to(carRef.current, {
        x: 250,
        y: -20,
        rotate: 1.5,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: carRef.current,
          start: "top 90%",
          end: "bottom 20%",
          scrub: 1.2,
        },
      });

      /* Progress bar */
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { scrub: true },
      });

    });

    return () => ctx.revert();
  }, []);

  const text = "WELCOME ITZ FIZZ";

  return (
    <section className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center py-32">

      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/20 z-20">
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
      <div ref={statsRef} className="flex gap-10 text-center mb-16">
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

      {/* Car BELOW text */}
      <div className="w-full max-w-5xl flex justify-center mt-24">
        <img
          ref={carRef}
          src="/car.png"
          className="w-[420px] pointer-events-none will-change-transform"
        />
      </div>

      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-900 via-black to-black blur-[60px]" />
    </section>
  );
}