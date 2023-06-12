import Image from "next/image";
import Link from "next/link";
import NavBar from "./components/ui/NavBar";
import MainArticle from "./components/MainArticle";

export default function Home() {
  return (
    <main>
      <NavBar />
      <MainArticle />
    </main>
  );
}
