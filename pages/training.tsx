import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Container, Button } from "@nextui-org/react";
import { Avatar, List, Card } from 'antd';
import { useRouter } from 'next/router';
import prisma from '../lib/prismadb';
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

type documentObj = {
  id: number,
  title: string,
  description: string,
  category: number,
  fileUrl: string,
  fileType: number,
  content: string,
  published: boolean,
}

interface TrainingProps {
  documentList: documentObj[]
}

const Training: NextPage<TrainingProps> = ({ documentList }) => {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn()
    },
  })



  const readBtn = (id: number) => {
    router.push('/read/' + id);
  }

  const getIcon = (fileType: number) => {
    return fileType === 0 ? "pdfico.png" : "videoico.png"
  }

  useEffect(() => {
    console.info(documentList)
  }, [])

  return (
    <div>
      <Head>
        <title>企业信息安全教育系统</title>
      </Head>
      <Header isActive="training" />
      <main>
        <Container lg style={{ marginTop: "2rem", padding: "0px" }}>
          <Card hoverable title="入职培训" bordered={true} >
            <List
              itemLayout="horizontal"
              dataSource={documentList}
              renderItem={(item, index) => {
                if (item.category === 0) {
                  return (
                    <List.Item key={index}>
                      <List.Item.Meta
                        avatar={<Avatar src={getIcon(item.fileType)} />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description={item.description}
                      />
                      <div style={{ marginLeft: "2rem" }}><Button onClick={() => { readBtn(item.id) }}>开始学习</Button></div>
                    </List.Item>
                  )
                }
              }}
            />
          </Card>

        </Container>

        <Container lg style={{ marginTop: "2rem", padding: "0px" }}>
          <Card hoverable title="最新培训" bordered={true} >
            <List
              itemLayout="horizontal"
              dataSource={documentList}
              renderItem={(item, index) => {
                if (item.category === 1) {
                  return (
                    <List.Item key={index}>
                      <List.Item.Meta
                        avatar={<Avatar src={getIcon(item.fileType)} />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description={item.description}
                      />
                      <div style={{ marginLeft: "2rem" }}><Button onClick={() => { readBtn(item.id) }}>开始学习</Button></div>
                    </List.Item>
                  )
                }
              }}
            />
          </Card>

        </Container>
      </main>
      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const documentList = await prisma.document.findMany({
    where: { published: true },
  });
  return {
    props: { documentList },
    revalidate: 10,
  };
};

export default Training;
