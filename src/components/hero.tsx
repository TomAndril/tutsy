"use client";

import { RevealList } from "next-reveal";

export default function Hero() {
  return (
    <RevealList interval={200} delay={100}>
      <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter mt-36 text-center font-mono drop-shadow-lg bg-gradient-to-b from-white via-slate-100 to-slate-200 bg-clip-text text-transparent">
        Unleash the power of Youtube learning
      </h1>
      <p className="mt-8 text-center font-thin text-sm md:text-base lg:text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptas, voluptatem, voluptates, quibusdam quod quia voluptate
      </p>
    </RevealList>
  );
}
