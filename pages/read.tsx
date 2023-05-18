import { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Card, Divider, Row, Col, Button } from 'antd';
import { Container } from "@nextui-org/react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from 'next/router';

const PDFViewer = dynamic(() => import("../components/pdf-viewer"), {
  ssr: false
});

const Read: NextPage = () => {
  const [pageNumber] = useState(1);


  return (
    <div>
      <Head>
        <title>企业信息安全教育系统</title>
      </Head>
      <Header isActive="training" />
      <Container lg style={{ marginTop: "2rem", padding: "0px" }}>
        <Card hoverable title={<TitleDiv />} bordered={true} >
          <p>
            新员工信息安全知识培训是一项至关重要的培训计划，旨在向新入职的员工传授基础的信息安全知识，确保他们在工作环境中能够理解和遵守公司的信息安全政策和最佳实践。本次培训的目标是帮助员工认识到信息安全的重要性，了解潜在的安全风险，并掌握保护个人和公司数据的基本技能。
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

const TitleDiv = () => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.back(); // 返回上一页
  };
  return (
    <Row>
      <Col span={12}>新员工信息安全知识培训・基础安全知识</Col>
      <Col span={12} style={{ textAlign: "right" }}><Button onClick={handleButtonClick}>返回</Button></Col>
    </Row>)
}


export default Read;
