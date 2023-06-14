"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/image/logo.png";
import Button from "@/components/Button";

export default function NavBar() {
  const loginButton = "Login";

  return (
    <div className="vertical-navbar bg-center text-center">
      <Image src={logo} alt="cerulean-lion" className="bg-center" />
      <h1 className="title-container font-heading mb-5 text-5xl text-amber-500 drop-shadow-lg">
        Cerulean Lion
      </h1>
      <div className="font-general text-white">
        <Link href="/">Home</Link>
        <Link href="/blog" className="navbar-links">
          Blog
        </Link>
        <Button text={loginButton} />
      </div>
    </div>
  );
}
