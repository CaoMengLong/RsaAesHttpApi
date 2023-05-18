import { NextPage } from "next";
import Head from "next/head";

import Footer from "../components/Footer";
import Header from "../components/Header";

import { Container } from "@nextui-org/react";
import { Card, Collapse, Button, Divider, Badge,Result } from 'antd';
import { useRouter } from 'next/router';

const { Panel } = Collapse;

const Check: NextPage = () => {
  const router = useRouter();
  const readBtn = () => {
    router.push('/checking');
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
            <Collapse size="large">
              <Panel header="新员工信息安全学习测试" key="1">
                <p>测试说明</p>
                <p>测试说明</p>
                <p>测试说明</p>
                <p>测试说明</p>
                <div style={{ textAlign: "right" }}>
                  <Button type="primary" size="large" onClick={readBtn}>开始测试</Button>
                </div>
              </Panel>
            </Collapse>
            <Divider dashed />
            <Collapse size="large">
              <Panel header="「2023/06」软件研发中心・月度安全培训测试" key="2">
                <p>测试说明</p>
                <p>测试说明</p>
                <p>测试说明</p>
                <p>测试说明</p>
                <div style={{ textAlign: "right" }}>
                  <Button type="primary" size="large" onClick={readBtn}>开始测试</Button>
                </div>
              </Panel>
            </Collapse>
            <Divider dashed />
          </Card>
        </Badge.Ribbon>
      </Container>


      <Container lg style={{ marginTop: "2rem", padding: "0px" }}>
        <Badge.Ribbon text="合格" color="green">
          <Card hoverable title="已经完成的测试" bordered={true} >
            <Collapse size="large">
              <Panel header="「2023/05」软件研发中心・月度安全培训测试" key="2">
                
                <Result
                  status="success"
                  title="已经通过测试"
                  subTitle="2023/05/11 15:20"
                />
              </Panel>
            </Collapse>
            <Divider dashed />
          </Card>
        </Badge.Ribbon>
      </Container>


      <Footer />
    </div>
  );
};


export default Check;
