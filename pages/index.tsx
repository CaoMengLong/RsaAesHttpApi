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
    <div style={{backgroundColor:"#efefef"}}>
      <Head>
        <title>探讨混合加密模型在HTTP数据传输中的应用</title>
      </Head>
      <Header isActive="index"/>
      <TestComponent/>
      <Footer />
    </div >
  );
};

export default Home;
