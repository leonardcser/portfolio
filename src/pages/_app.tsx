import type { AppProps } from "next/app";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import Head from "next/head";

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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
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
