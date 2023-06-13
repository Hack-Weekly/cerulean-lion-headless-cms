"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/image/logo.png";
import Button from "@/components/Button";

export default function NavBar() {
  const signupButton = "Sign Up";
  const loginButton = "Login";

  return (
    <div className="vertical-navbar">
      <Image src={logo} alt="cerulean-lion" />
      <h1 className="title-container font-heading text-center">
        Cerulean Lion
      </h1>
      <div className="links-container">
        <div className="nav-container font-general">
          <Link href="/">Home</Link>
          <Link href="/blog" className="navbar-links">
            Blog
          </Link>
          <Button className="font-general" text={signupButton} />
          <Button text={loginButton} />
        </div>
      </div>
    </div>
  );
}
