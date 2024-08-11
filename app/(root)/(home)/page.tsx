"use client";

import { useState, useEffect } from "react";
import MeetingTypeList from "@/components/MeetingTypeList";

const Home = () => {
  const [currentTime, setCurrentTime] = useState({
    formattedTime: "",
    date: "",
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const localTimeOffset = now.getTimezoneOffset() / -60;

      let timezone, locale;

      // Menentukan zona waktu dan locale berdasarkan offset waktu lokal
      if (localTimeOffset === 7) {
        timezone = "WIB";
        locale = "id-ID";
      } else if (localTimeOffset === 8) {
        timezone = "WITA";
        locale = "id-ID";
      } else if (localTimeOffset === 9) {
        timezone = "WIT";
        locale = "id-ID";
      } else {
        timezone = ""; // Tidak menampilkan zona waktu jika di luar Indonesia
        locale = "en-US"; // Locale untuk format Inggris
      }

      // Format waktu dengan jam dan menit
      const time = now.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
      });

      const formattedTime = timezone ? `${time} ${timezone}` : time;

      // Format tanggal berdasarkan locale
      const date = new Intl.DateTimeFormat(locale, {
        dateStyle: "full",
      }).format(now);

      setCurrentTime({ formattedTime, date });
    };

    // Update time immediately and then every second
    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
            Upcoming meeting at 12:30 PM
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">
              {currentTime.formattedTime}
            </h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">
              {currentTime.date}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
