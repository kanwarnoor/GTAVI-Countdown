"use client";

import React, { useState } from "react";

export default function VideoBackground() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="fixed inset-0 z-0 bg-black opacity-70">
      {/* <div className="bg-black w-screen h-screen opacity-50 mix-blend-color-dodge">

      </div> */}
      {!loaded && <img className="w-full h-full object-cover" src="/slideshow/4.webp" alt="" />}
      <video
        src="/trailer2.webm"
        className="w-full h-full object-cover    overflow-hidden"
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
      
    </div>
  );
}
