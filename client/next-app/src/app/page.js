"use client";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import MainArticle from "@/components/MainArticle";
import HeroSection from "@/components/HeroSection";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={"columns-2 `${inter.className}`"}>
      <div>
        <NavBar />
      </div>
      <div>
        <HeroSection />
      </div>
    </main>
  );
}
