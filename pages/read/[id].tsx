import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Card, Divider, Row, Col, Button } from 'antd';
import { Container } from "@nextui-org/react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from 'next/router';
import prisma from '../../lib/prismadb';
import { signIn, useSession } from "next-auth/react";

const PDFViewer = dynamic(() => import("../../components/pdf-viewer"), {
  ssr: false
});

type Props = InferGetServerSidePropsType<typeof getServerSideProps>


const Read: NextPage<Props> = ({ documentObj }: Props) => {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn()
    },
  })
  const router = useRouter();
  const handleButtonClick = () => {
    router.back(); // 返回上一页
  };

  return (
    <div>
      <Head>
        <title>企业信息安全教育系统</title>
      </Head>
      <Header isActive="training" />
      <Container lg style={{ marginTop: "2rem", padding: "0px" }}>
        <Card hoverable title={<TitleDiv documentObj={documentObj} />} bordered={true} >
          <p>
            {documentObj?.description}
          </p>
          <Divider />
          {documentObj?.fileType === 0 && (
            <div style={{ textAlign: "center", backgroundColor: "#494949" }}>
              <PDFViewer fileUrl={documentObj?.fileUrl} />
            </div>
          )}
          {documentObj?.fileType === 1 && (
            <video controls style={{width:"100%"}}>
              <source src={documentObj?.fileUrl} type="video/mp4" />
              <p>Your browser doesn't support HTML5 video.</p>
            </video>
          )}
          <Divider />
          <div style={{textAlign:"center"}}>
            <Button onClick={handleButtonClick} size="large" type="primary">返回</Button>
          </div>
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

const TitleDiv = ({ documentObj }: Props) => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.back(); // 返回上一页
  };
  return (
    <Row>
      <Col span={12}>{documentObj?.title}</Col>
      <Col span={12} style={{ textAlign: "right" }}><Button onClick={handleButtonClick}>返回</Button></Col>
    </Row>)
}

export const getServerSideProps = async ({
  params
}: GetServerSidePropsContext<{ id: string }>) => {
  const documentObj = await prisma.document.findUnique({
    where: {
      id: Number(params?.id),
    }
  });

  return {
    props: { documentObj },
  }
}

export default Read;
