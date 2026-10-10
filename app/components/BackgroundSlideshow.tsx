"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "/slideshow/home.webp",
  "/slideshow/1.webp",
  "/slideshow/2.webp",
  "/slideshow/3.webp",
  "/slideshow/4.webp",
  "/slideshow/5.webp",
];

export default function BackgroundSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-black opacity-80">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={`GTA Background ${index + 1}`}
            fill
            className="object-cover w-full h-full"
            priority={index === 0}
            blurDataURL={
              index === 0 ? "LQI5oXS$%hadyZNGahae4;s;IUoJ" : undefined
            }
          />
          {/* <div className="absolute inset-0 bg-black bg-opacity-50" /> */}
        </div>
      ))}
    </div>
  );
}
