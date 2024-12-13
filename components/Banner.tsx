"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const Banner = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [bannerTop, setBannerTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const feed = document.getElementById("twitter-feed");
      const banner = document.getElementById("banner");

      if (feed && banner) {
        const feedBottom = feed.getBoundingClientRect().bottom;
        const scrollY = window.scrollY;

        if (feedBottom <= 0) {
          setIsSticky(true);
          setBannerTop(feed.offsetHeight); // Se fija la altura al scroll
        } else {
          setIsSticky(false);
          setBannerTop(0);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="mt-8 space-y-8">
      {/* Feed de Twitter */}
      <div id="twitter-feed" className="mb-8">
        <h3 className="text-lg font-bold mb-4">Últimos Tweets</h3>
        <div className="overflow-hidden">
          <a
            className="twitter-timeline"
            href="https://twitter.com/GustavoYarroch?ref_src=twsrc%5Etfw"
            data-height="5800"
          >
            Tweets by GustavoYarroch
          </a>
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charSet="utf-8"
          ></script>
        </div>
      </div>

      {/* Banner que acompaña el scroll */}
      <div
        id="banner"
        className={`${
          isSticky ? "fixed" : "relative"
        } bg-white shadow-lg rounded-lg p-4`}
        style={{
          top: isSticky ? `${bannerTop}px` : "auto",
          width: isSticky ? "300px" : "100%",
        }}
      >
        <a
          href="https://www.legislatura.gob.ar"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Image
            src="/banner.jpeg"
            alt="Legislatura de Buenos Aires"
            width={300}
            height={250}
            className="mx-auto"
          />
        </a>
      </div>
    </div>
  );
};

export default Banner;
