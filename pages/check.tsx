import { NextPage } from "next";
import Head from "next/head";

import Footer from "../components/Footer";
import Header from "../components/Header";

import { Container } from "@nextui-org/react";

const Check: NextPage = () => {
  return (
    <div>
      <Head>
        <title>企业信息安全教育系统</title>
      </Head>
      <Header isActive="check"/>
      <main>
        <Container lg>
          check
        </Container>
      </main>
      <Footer />
    </div>
  );
};


export default Check;
