"use client";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import MainArticle from "@/components/MainArticle";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`${inter.className}`}>
      <div>
        <NavBar />
        <MainArticle />
      </div>
    </main>
  );
}
