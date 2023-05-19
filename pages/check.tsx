import { GetServerSidePropsContext, GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";

import Footer from "../components/Footer";
import Header from "../components/Header";

import { Container } from "@nextui-org/react";
import { Card, Collapse, Button, Divider, Badge, Result } from 'antd';
import { useRouter } from 'next/router';
import prisma from '../lib/prismadb';
import { TestPaper } from "@prisma/client";
import { getSession, signIn, useSession } from "next-auth/react";
const { Panel } = Collapse;

interface NextPageProps {
  testPaperList: TestPaper[]
  testPaperListEnd: TestPaper[]
}

const Check: NextPage<NextPageProps> = ({ testPaperList, testPaperListEnd }) => {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn()
    },
  })
  const router = useRouter();
  const readBtn = (id: number) => {
    router.push('/checking/' + id);
  }

  return (
    <div>
      <Head>
        <title>企业信息安全教育系统</title>
      </Head>
      <Header isActive="check" />

      <Container lg style={{ marginTop: "2rem", padding: "0px" }}>
        <Badge.Ribbon text="进行中" color="red">
          <Card hoverable title="进行中的测试" bordered={true} >
            {testPaperList.length === 0 && (
              <div>已经完成所有的测试</div>
            )}
            {testPaperList.map((testPaper, index) => (
              <div key={index}>
                <Collapse size="large">
                  <Panel header={testPaper.title} key={index}>
                    <p>{testPaper.description}</p>
                    <div style={{ textAlign: "right" }}>
                      <Button type="primary" size="large" onClick={() => readBtn(testPaper.id)}>开始测试</Button>
                    </div>
                  </Panel>
                </Collapse>
                <Divider dashed />
              </div>
            ))}
          </Card>
        </Badge.Ribbon>
      </Container>


      <Container lg style={{ marginTop: "2rem", padding: "0px" }}>
        <Badge.Ribbon text="合格" color="green">
          <Card hoverable title="已经完成的测试" bordered={true} >
            {testPaperListEnd.length === 0 && (
              <div>尚未有未完成的测试</div>
            )}
            {testPaperListEnd.map((testPaper, index) => (
              <div key={index}>
                <Collapse size="large">
                  <Panel header={testPaper.title} key={index}>
                    <Result
                      status="success"
                      title="已经通过测试"
                      subTitle={testPaper.createdAt.toLocaleDateString()}
                    />
                  </Panel>
                </Collapse>
                <Divider dashed />
              </div>
            ))}

          </Card>
        </Badge.Ribbon>
      </Container>


      <Footer />
    </div>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context) // awaitを忘れずに
  const email = session?.user?.email || ""
  const testPaperList = await prisma.$queryRaw<TestPaper[]>`SELECT * FROM public."TestPaper" where published = true and id not  in (SELECT "testId" FROM public."TestResult" WHERE "userId"=${email})`
  const testPaperListEnd = await prisma.$queryRaw<TestPaper[]>`SELECT * FROM public."TestPaper" where published = true and id in (SELECT "testId" FROM public."TestResult" WHERE "userId"=${email})`
  return {
    props: { testPaperList, testPaperListEnd },
  };
};


export default Check;
