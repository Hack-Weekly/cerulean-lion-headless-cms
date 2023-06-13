"use client";

import Link from "next/link";

export default function NavBar() {
  return (
    <div className="vertical-navbar">
      <h1 className="title-container">Cerulean-Lion</h1>
      <div className="links-container">
        <div className="nav-container">
          <Link href="/" className="navbar-links">
            Home
          </Link>
          <Link href="/blog" className="navbar-links">
            Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
