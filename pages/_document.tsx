import Document, { Head, Html, Main, NextScript,DocumentContext } from "next/document";
import React from 'react';
import { CssBaseline } from '@nextui-org/react';
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles])
    };
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Restore your old face photos and keep the memories alive."
          />
          <meta property="og:site_name" content="restorePhotos.io" />
          <meta
            property="og:description"
            content="Restore your old face photos and keep the memories alive."
          />
          <meta property="og:title" content="Face Photo Restorer" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Face Photo Restorer" />
          <meta
            name="twitter:description"
            content="Restore your old photos and keep the memories alive."
          />
          <meta
            property="og:image"
            content="https://restore-photos.vercel.app/og-image.png"
          />
          <meta
            name="twitter:image"
            content="https://restore-photos.vercel.app/og-image.png"
          />
          {CssBaseline.flush()}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
