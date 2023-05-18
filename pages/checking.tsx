import { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Card, Divider, Row, Col, Button, Space, Badge, Radio, Progress } from 'antd';
import { Container } from "@nextui-org/react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from 'next/router';
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"

const Read: NextPage = () => {



  return (
    <div>
      <Head>
        <title>企业信息安全教育系统</title>
      </Head>
      <Header isActive="check" />
      <Container lg style={{ marginTop: "2rem", padding: "0px" }}>
        <Card hoverable title={<TitleDiv />} bordered={true} style={{ backgroundColor: "#f9f9e7" }}>

          <Row>
            <Col span={18}>
              <p>测试说明</p>
              <p>测试说明</p>
              <p>测试说明</p>
              <p>测试说明</p></Col>
            <Col span={6} style={{textAlign:"center"}}>
              <Progress type="circle" percent={75} />
            </Col>
          </Row>
          <Divider />
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Badge.Ribbon text="Hippies">
              <Card title="Pushes open the window" size="small">
                and raises the spyglass.
                <Row>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Radio.Group optionType="button"
                      buttonStyle="solid" size="large">
                      <Radio.Button value="a"><CheckCircleOutlined rev={undefined} /> YES</Radio.Button>
                      <Radio.Button value="d"><CloseCircleOutlined rev={undefined} /> NO</Radio.Button>
                    </Radio.Group></Col>
                </Row>
              </Card>
            </Badge.Ribbon>
            <Badge.Ribbon text="Hippies">
              <Card title="Pushes open the window" size="small">
                and raises the spyglass.
                <Row>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Radio.Group optionType="button"
                      buttonStyle="solid" size="large">
                      <Radio.Button value="a"><CheckCircleOutlined rev={undefined} /> YES</Radio.Button>
                      <Radio.Button value="d"><CloseCircleOutlined rev={undefined} /> NO</Radio.Button>
                    </Radio.Group></Col>
                </Row>
              </Card>
            </Badge.Ribbon>
            <Badge.Ribbon text="Hippies">
              <Card title="Pushes open the window" size="small">
                and raises the spyglass.
                <Row>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Radio.Group optionType="button"
                      buttonStyle="solid" size="large">
                      <Radio.Button value="a"><CheckCircleOutlined rev={undefined} /> YES</Radio.Button>
                      <Radio.Button value="d"><CloseCircleOutlined rev={undefined} /> NO</Radio.Button>
                    </Radio.Group></Col>
                </Row>
              </Card>
            </Badge.Ribbon>
            <Badge.Ribbon text="Hippies">
              <Card title="Pushes open the window" size="small">
                and raises the spyglass.
                <Row>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Radio.Group optionType="button"
                      buttonStyle="solid" size="large">
                      <Radio.Button value="a"><CheckCircleOutlined rev={undefined} /> YES</Radio.Button>
                      <Radio.Button value="d"><CloseCircleOutlined rev={undefined} /> NO</Radio.Button>
                    </Radio.Group></Col>
                </Row>
              </Card>
            </Badge.Ribbon>
            <Badge.Ribbon text="Hippies">
              <Card title="Pushes open the window" size="small">
                and raises the spyglass.
                <Row>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Radio.Group optionType="button"
                      buttonStyle="solid" size="large">
                      <Radio.Button value="a"><CheckCircleOutlined rev={undefined} /> YES</Radio.Button>
                      <Radio.Button value="d"><CloseCircleOutlined rev={undefined} /> NO</Radio.Button>
                    </Radio.Group></Col>
                </Row>
              </Card>
            </Badge.Ribbon>
            <Badge.Ribbon text="Hippies">
              <Card title="Pushes open the window" size="small">
                and raises the spyglass.
                <Row>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Radio.Group optionType="button"
                      buttonStyle="solid" size="large">
                      <Radio.Button value="a"><CheckCircleOutlined rev={undefined} /> YES</Radio.Button>
                      <Radio.Button value="d"><CloseCircleOutlined rev={undefined} /> NO</Radio.Button>
                    </Radio.Group></Col>
                </Row>
              </Card>
            </Badge.Ribbon>
            <Badge.Ribbon text="Hippies">
              <Card title="Pushes open the window" size="small">
                and raises the spyglass.
                <Row>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Radio.Group optionType="button"
                      buttonStyle="solid" size="large">
                      <Radio.Button value="a"><CheckCircleOutlined rev={undefined} /> YES</Radio.Button>
                      <Radio.Button value="d"><CloseCircleOutlined rev={undefined} /> NO</Radio.Button>
                    </Radio.Group></Col>
                </Row>
              </Card>
            </Badge.Ribbon>
            <Badge.Ribbon text="Hippies">
              <Card title="Pushes open the window" size="small">
                and raises the spyglass.
                <Row>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Radio.Group optionType="button"
                      buttonStyle="solid" size="large">
                      <Radio.Button value="a"><CheckCircleOutlined rev={undefined} /> YES</Radio.Button>
                      <Radio.Button value="d"><CloseCircleOutlined rev={undefined} /> NO</Radio.Button>
                    </Radio.Group></Col>
                </Row>
              </Card>
            </Badge.Ribbon>
          </Space>
          <Divider dashed />

          <div style={{ textAlign: "center" }}>
            <Button type="primary" size="large">
              提交回答
            </Button>
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
      <Col span={12}>新员工信息安全学习测试</Col>
      <Col span={12} style={{ textAlign: "right" }}><Button onClick={handleButtonClick}>返回</Button></Col>
    </Row>)
}


export default Read;
