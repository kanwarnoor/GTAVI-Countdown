"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import BackgroundSlideshow from "./components/BackgroundSlideshow";

import { motion, percent } from "framer-motion";
import VideoBackground from "./components/VideoBackground";

export default function Home() {
  const [toggle, setToggle] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [percentage, setPercentage] = useState(0);
  const [preloadPercentage, setPreloadPercentage] = useState(0);

  useEffect(() => {
    const targetDate = new Date("2026-11-19T00:00:00");
    const preloadDate = new Date("2026-11-12T00:00:00");
    const startDate = new Date("2025-11-07T00:00:00");

    const interval = setInterval(() => {
      const now = new Date();

      const difference = targetDate.getTime() - now.getTime();

      // Main release percentage
      const percentage1 =
        ((now.getTime() - startDate.getTime()) /
          (targetDate.getTime() - startDate.getTime())) *
        100;
      setPercentage(Math.min(percentage1, 100));

      // Preload percentage
      const preloadPct =
        ((now.getTime() - startDate.getTime()) /
          (preloadDate.getTime() - startDate.getTime())) *
        100;
      setPreloadPercentage(Math.min(preloadPct, 100));

      if (difference <= 0) {
        setTimeLeft({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        return;
      }

      const totalSeconds = Math.floor(difference / 1000);

      const nowDateOnly = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
      );
      const targetDateOnly = new Date(
        targetDate.getFullYear(),
        targetDate.getMonth(),
        targetDate.getDate(),
      );

      let months =
        (targetDateOnly.getFullYear() - nowDateOnly.getFullYear()) * 12 +
        (targetDateOnly.getMonth() - nowDateOnly.getMonth());
      let monthAdjusted = new Date(
        nowDateOnly.getFullYear(),
        nowDateOnly.getMonth() + months,
        nowDateOnly.getDate(),
      );
      if (monthAdjusted > targetDateOnly) {
        months--;
        monthAdjusted = new Date(
          nowDateOnly.getFullYear(),
          nowDateOnly.getMonth() + months,
          nowDateOnly.getDate(),
        );
      }
      const days = Math.round(
        (targetDateOnly.getTime() - monthAdjusted.getTime()) /
          (1000 * 60 * 60 * 24),
      );

      const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({ months, days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center text-white relative px-4">
        {/* <div className="absolute flex inset-0 z-10 bg-none w-full opacity-85">
          <div className="w-full h-full bg-none" style={{width: `${percentage}%`}}></div>
          <div className="w-full h-full bg-black/10 backdrop-blur-xl" style={{width: `${100 - percentage}%`}}></div>
         
        </div> */}
        {/* <BackgroundSlideshow /> */}
        <VideoBackground />

        <div className="text-center z-10 w-full max-w-7xl">
          <motion.div className="grid grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-2 md:gap-4">
            {["MONTHS", "DAYS", "HOURS", "MINUTES", "SECONDS"].map(
              (item, index) => (
                <motion.div
                  key={index}
                  initial={{
                    y: 25,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  transition={{
                    delay: 1 + index * 0.1,
                    duration: 0.5,
                  }}
                  className="bg-opacity-50 p-2 md:p-6 rounded-lg"
                >
                  <motion.div
                    key={timeLeft[item.toLowerCase() as keyof typeof timeLeft]}
                    initial={{
                      y: 25,
                      opacity: 0,
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-bold"
                  >
                    {timeLeft[item.toLowerCase() as keyof typeof timeLeft]}
                  </motion.div>
                  <div className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold opacity-50">
                    {timeLeft[item.toLowerCase() as keyof typeof timeLeft] === 1
                      ? item.slice(0, -1) // Remove 's' from the end
                      : item}
                  </div>
                </motion.div>
              ),
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="absolute left-0 right-0 bottom-20 w-fit m-auto text-xs md:text-sm opacity-80 "
          >
            <div className="flex flex-row items-center justify-center gap-6 md:gap-40">
              <div className="text-center flex flex-col items-center">
                <p className="md:text-5xl text-3xl font-bold">
                  {percentage.toFixed(2)}%
                </p>
                <div className="relative h-2 w-full rounded-full border-white/50 border-1 md:mt-2">
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${percentage}%`,
                    }}
                    transition={{
                      duration: 1,
                    }}
                    className="h-full bg-white  rounded-full"
                  ></motion.div>
                </div>
                <p className="md:pt-1 pt-0.5 text-xl opacity-50 font-bold">
                  RELEASE
                </p>
              </div>

              {toggle && (
                <div className="text-center flex flex-col items-center">
                  <p className="md:text-5xl text-3xl font-bold">
                    {preloadPercentage.toFixed(2)}%
                  </p>
                  <div className="relative h-2 w-full rounded-full border-white border-1 md:mt-2">
                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: `${preloadPercentage}%`,
                      }}
                      transition={{
                        duration: 1,
                      }}
                      className="h-full bg-white rounded-full"
                    ></motion.div>
                  </div>
                  <p className="md:pt-1 pt-0.5 text-xl opacity-50 uppercase font-bold">
                    Preload
                  </p>
                </div>
              )}
            </div>
            <div className="flex cursor-pointer mt-3 text-[0.7rem] text-center m-auto justify-center items-center opacity-50 hover:opacity-100">
              <p onClick={() => setToggle(!toggle)}>Toggle, Preload</p>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="fixed right-0 bottom-0 w-fit text-center p-5 z-20">
        <div className="flex flex-row justify-center gap-4 md:gap-8 text-xs md:text-sm opacity-80">
          <a
            href="https://instagram.com/wellitsnoor"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-white transition-colors"
          >
            Instagram
          </a>
          <div className="flex flex-row">
            <a
              href="https://kanwarnoor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium flex text-white transition-colors"
            >
              Kanwarnoor
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
