import Head from "next/head";
import "../styles/globals.css";

export default function MedieApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Medie IPTV Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
