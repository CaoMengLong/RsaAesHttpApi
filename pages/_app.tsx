import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from '@nextui-org/react';
// import "../styles/globals.css";
import 'antd/dist/reset.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
      <Component {...pageProps} />
      </NextUIProvider>
      <Analytics />
    </SessionProvider>
  );
}

export default MyApp;
