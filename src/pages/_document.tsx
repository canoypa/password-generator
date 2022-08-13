import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="manifest.json" />
          <link rel="icon" href="favicon.ico" sizes="any" />

          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Password Generator" />

          <meta
            property="og:image"
            content="https://password.tepbyte.dev/icons/icon-512-maskable.png"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
