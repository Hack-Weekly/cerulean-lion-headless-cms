"use client";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import MainArticle from "@/components/MainArticle";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={"columns-3 `${inter.className}`"}>
      <div>
        <h1>hello</h1>
      </div>
      <div>
        <h1>hello</h1>
      </div>
      <div>
        <h1>hello</h1>
      </div>
    </main>
  );
}
