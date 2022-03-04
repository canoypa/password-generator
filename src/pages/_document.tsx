import createEmotionServer from "@emotion/server/create-instance";
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { Children, FC } from "react";
import { createEmotionCache } from "../core/emotionCache";

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage;

    const cache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => {
          const EnhanceApp: FC = (props: any) => (
            <App emotionCache={cache} {...props} />
          );
          return EnhanceApp;
        },
      });

    const initialProps = await Document.getInitialProps(ctx);

    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(" ")}`}
        key={style.key}
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));

    return {
      ...initialProps,
      styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags],
    };
  }

  return() {
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
}
