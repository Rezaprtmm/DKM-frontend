import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Header } from "@/components/header";
import { Absensi } from "@/components/absensi";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Absensi />
    </div>
  );
}
