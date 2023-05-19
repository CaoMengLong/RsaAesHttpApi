import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from '@nextui-org/react';
import { useSSR } from '@nextui-org/react'
import 'antd/dist/reset.css';
import "../styles/app.css";
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { isBrowser } = useSSR()
  return (isBrowser && (
    <SessionProvider session={session}>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
      <Analytics />
    </SessionProvider>
  )
  );
}

export default MyApp;
