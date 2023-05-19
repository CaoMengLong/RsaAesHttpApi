import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Card, Divider, Row, Col, Button } from 'antd';
import { Container } from "@nextui-org/react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from 'next/router';
import prisma from '../../lib/prismadb';

const PDFViewer = dynamic(() => import("../../components/pdf-viewer"), {
  ssr: false
});

type Props = InferGetServerSidePropsType<typeof getServerSideProps>


const Read: NextPage<Props> = ({ documentObj }:Props) => {
  const [pageNumber] = useState(1);
  return (
    <div>
      <Head>
        <title>企业信息安全教育系统</title>
      </Head>
      <Header isActive="training" />
      <Container lg style={{ marginTop: "2rem", padding: "0px" }}>
        <Card hoverable title={<TitleDiv documentObj={documentObj}/>} bordered={true} >
          <p>
          {documentObj?.description}
          </p>
          <Divider />
          <div style={{ textAlign: "center", backgroundColor: "#494949" }}>
            <PDFViewer />
          </div>
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

const TitleDiv = ({documentObj}:Props) => {
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

// type MyPageQuery = {
//   username: string
// }



// type  MyPageProps = {
//   documentList: documentObj[]
// }


// export const getServerSideProps: GetServerSideProps = async (context) => {
//   console.info(context)
//   const query = context.query as PostPageQuery;
//   console.log(query) // {page: "2", sort_by: "publishDate", sort_order: "desc" }
//   const post = await prisma.document.findUnique({
//     where: {
//       id: Number(context.params?.id || 1),
//     }
//   });
//   return {
//     props: post,
//   };
// };


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
