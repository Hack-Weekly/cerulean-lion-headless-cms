"use client";
import Image from "next/image";
import logo from "@/image/logo.png";

export default function MainArticle() {
  return (
    <div>
      <p>hello whatever text</p>
      <Image src={logo} alt="logo" width={50} height={100} />
    </div>
  );
}
