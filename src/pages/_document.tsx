import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="manifest.json" />
        <link rel="icon" href="favicon.ico" sizes="any" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}