import Head from "next/head";

// Styles
import "@/styles/globals.css";

// Function
import { Poppins as FontSans } from "next/font/google";

// Libs
import cn from "@/lib/cn";

// Types
import type { AppProps } from "next/app";

// Constants
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={cn("font-sans antialiased", fontSans.variable)}>
      <Head>
        <title>DKM Paramadina</title>
      </Head>
      <Component {...pageProps} />
    </main>
  );
}
