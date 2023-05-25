import { NextPage } from "next";
import Head from "next/head";
import NextLink from 'next/link';
import Footer from "../components/Footer";
import Header from "../components/Header";

import dynamic from "next/dynamic"

const TestComponent = dynamic(() => 
import("../components/TestComponent"), {
 //サーバーサイド側でインポートはしない
ssr: false, // SSRの無効
})

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>企业信息安全教育系统</title>
      </Head>
      <TestComponent/>
      <Footer />
    </div >
  );
};

export default Home;
