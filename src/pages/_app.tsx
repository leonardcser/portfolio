import type { AppProps } from "next/app";
import Head from "next/head";
import { DM_Sans, DM_Serif_Display } from "@next/font/google";

import "@styles/globals.scss";

const dm_serif = DM_Serif_Display({
  style: "normal",
  weight: "400",
  subsets: ["latin"],
});

const dm_sans = DM_Sans({
  style: "normal",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

// TODO: add custom head
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Leonard Cseres</title>
        <meta name="description" content="Leonard Cseres protfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style jsx global>{`
        :root {
          --ff-serif: ${dm_serif.style.fontFamily};
          --ff-sans: ${dm_sans.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
