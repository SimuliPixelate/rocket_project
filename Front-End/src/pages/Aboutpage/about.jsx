import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";

function About() {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col w-full">
      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-6 py-12 w-full text-left flex-grow">
        {/* Header Section */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6 tracking-tight text-white!">
            About ARocket:
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-gray-300 max-w-4xl text-justify">
            ARocket is an interactive astronomy platform designed to make the
            cosmic wonders of the universe accessible to everyone. By
            integrating live data directly from space exploration APIs, we bring
            real-time stellar discoveries, planetary profiles, and deep-space
            imagery directly to your screen. Whether you are a curious child
            gazing up at the night sky, a student researching the cosmos, or an
            adult fascinated by interstellar breakthroughs, ARocket bridges the
            gap between complex space science and everyday curiosity.
          </p>
        </section>

        {/* Two-Column Grid (Our Mission & Our Journey) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Left Box: Our Mission */}
          <div className="p-8 bg-gray-900/40 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-white! tracking-wide">
              Our Mission
            </h2>
            <p className="text-justify makes the paragraph text perfectly square and aligned on both edges">
              Aligned with the United Nations Sustainable Development Goal 4
              (Quality Education), our mission is to provide open, captivating,
              and high-quality astronomy education for all. We strive to inspire
              the next generation of space explorers and scientists by turning
              dense, raw astronomical information into engaging learning
              experiences that fuel curiosity across all age groups.
            </p>
          </div>

          {/* Right Box: Our Journey and Philosophy */}
          <div className="p-8 bg-gray-900/40 rounded-2xl border border-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-white! tracking-wide">
              Our Journey and Philosophy
            </h2>
            <p className="text-justify makes the paragraph text perfectly square and aligned on both edges">
              ARocket started with a simple belief: the beauty of space
              shouldn't be hidden behind intimidating academic jargon. Our
              philosophy centers on clean, accessible visual experiences,
              intuitive application navigation, and real-time accuracy. We
              believe that by mapping data beautifully, we can cultivate a more
              scientifically conscious community that understands our place
              among the stars.
            </p>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="pt-12 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 pb-10">
            <p className="text-4xl font-bold mb-6 tracking-tight text-white! min-w-[220px]">
              Meet the Team
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12">
            {/* Team Member 1 */}
            <div className="flex items-center gap-4 group">
              <div
                className="w-20 h-20 bg-gray-800 rounded-full flex-shrink-0 ring-2 ring-gray-700 group-hover:ring-sky-500/50 transition-all duration-300"
                aria-hidden="true"
              ></div>
              <div>
                <h3 className="font-bold text-lg text-white group-hover:text-sky-400 transition-colors">
                  Andrew Bernal
                </h3>
                <p className="text-sm text-gray-500">Developer</p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="flex items-center gap-4 group">
              <div
                className="w-20 h-20 bg-gray-800 rounded-full flex-shrink-0 ring-2 ring-gray-700 group-hover:ring-sky-500/50 transition-all duration-300"
                aria-hidden="true"
              ></div>
              <div>
                <h3 className="font-bold text-lg text-white group-hover:text-sky-400 transition-colors">
                  Yuji Tashiro
                </h3>
                <p className="text-sm text-gray-500">Developer</p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="flex items-center gap-4 group">
              <div
                className="w-20 h-20 bg-gray-800 rounded-full flex-shrink-0 ring-2 ring-gray-700 group-hover:ring-sky-500/50 transition-all duration-300"
                aria-hidden="true"
              ></div>
              <div>
                <h3 className="font-bold text-lg text-white group-hover:text-sky-400 transition-colors">
                  Vince Eugenio
                </h3>
                <p className="text-sm text-gray-500">Quality Analyst</p>
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="flex items-center gap-4 group">
              <div
                className="w-20 h-20 bg-gray-800 rounded-full flex-shrink-0 ring-2 ring-gray-700 group-hover:ring-sky-500/50 transition-all duration-300"
                aria-hidden="true"
              ></div>
              <div>
                <h3 className="font-bold text-lg text-white group-hover:text-sky-400 transition-colors">
                  Angelo Juvida
                </h3>
                <p className="text-sm text-gray-500">Quality Analyst</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default About;
