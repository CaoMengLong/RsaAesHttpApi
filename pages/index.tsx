import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import NextLink from 'next/link';
import Footer from "../components/Footer";
import Header from "../components/Header";
import { kv } from '@vercel/kv';

import prisma from "../lib/prismadb";
import dynamic from "next/dynamic"

const TestComponent = dynamic(() =>
  import("../components/TestComponent"), {
  //サーバーサイド側でインポートはしない
  ssr: false, // SSRの無効
})
type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const Home: NextPage<Props> = ({ publicKey }: Props) => {
  return (
    <div style={{ backgroundColor: "#efefef" }}>
      <Head>
        <title>探讨混合加密模型在HTTP数据传输中的应用</title>
      </Head>
      <Header isActive="index" />
      <TestComponent publicKey={publicKey} />
      <Footer />
    </div >
  );
};

export const getServerSideProps = async () => {
  let publicKey = ""
  //从Redis获取缓存提高性能 
  try {
    const redisPublicKey: string = await kv.get('publicKey') || ""
    if (redisPublicKey === "") {
      const rsaKey = await prisma.rsaKey.findUnique({
        where: {
          id: 1,
        }
      });
      console.info("缓存中Ras公钥不存在,从数据库中获取并写入缓存成功!")
      await kv.set('publicKey', rsaKey?.publicKey, { ex: 86400000});
      publicKey = rsaKey?.publicKey || ""
    } else {
      console.log("从缓存中获取PublicKey成功!");
      publicKey = redisPublicKey
    }
  } catch (error) {
    console.info("从缓存或者数据库中获取Rsa公钥失败.", error)
  }


  return {
    props: { publicKey },
  }
}


export default Home;
