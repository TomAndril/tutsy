"use client";

import { RevealList } from "next-reveal";

export default function Hero() {
  return (
    <RevealList interval={200} delay={100}>
      <h1 className="load-hidden text-5xl md:text-7xl lg:text-9xl font-semibold tracking-tighter pt-16 text-center font-mono drop-shadow-lg bg-gradient-to-b from-black dark:from-white via-slate-900 dark:via-slate-100 to-slate-700 dark:to-slate-200 bg-clip-text text-transparent">
        YouTube learning
        <br />
        <span className="font-black italic">Reinvented</span>
      </h1>
      <h2 className="load-hidden mt-8 text-center font-extralight text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
        Tutsy is a new way to learn from YouTube videos. It&apos;s a platform
        that allows you to learn from the best content creators on YouTube,
        without the distractions.
      </h2>
    </RevealList>
  );
}
