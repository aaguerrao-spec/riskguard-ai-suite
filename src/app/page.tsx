"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.location.replace("./general.html");
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#02050b] text-[#8fa0b8]">
      <p className="text-sm">
        Redirigiendo al dashboard...{" "}
        <a href="./general.html" className="text-[#c4b5fd] underline-offset-2 hover:underline">
          Continuar
        </a>
      </p>
    </main>
  );
}
