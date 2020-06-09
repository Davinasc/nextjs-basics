// import "@/styles/main.css";

import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Nextjs - Basics</title>
        <link
          href="https://fonts.googleapis.com/css?family=Quicksand:300,500"
          rel="stylesheet"
        />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
