import { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Container, Button} from "@nextui-org/react";
import { Avatar, List ,Card} from 'antd';
import { useRouter } from 'next/router';
const data = [
  {
    title: '新员工信息安全知识培训・基础安全知识',
    overview:"新员工信息安全知识培训是一项至关重要的培训计划，旨在向新入职的员工传授基础的信息安全知识，确保他们在工作环境中能够理解和遵守公司的信息安全政策和最佳实践。本次培训的目标是帮助员工认识到信息安全的重要性，了解潜在的安全风险，并掌握保护个人和公司数据的基本技能。"
  },
  {
    title: '新员工信息安全知识培训・社内保密知识',
    overview:"新员工信息安全知识培训的一部分是关于社内保密知识的培训，旨在向新入职员工传授与公司内部数据和信息保密相关的基础知识和最佳实践。本次培训的目标是帮助员工理解保密的重要性，熟悉公司的保密政策，并掌握保护机密信息的基本技能。"
  },
  {
    title: '新员工信息安全知识培训・社外保密知识',
    overview:"新员工信息安全知识培训的一部分是关于社外保密知识的培训，旨在向新入职员工传授与公司对外交流和合作中保密相关的基础知识和最佳实践。本次培训的目标是帮助员工理解与外部合作伙伴和客户保密的重要性，掌握适当的保密措施，并了解泄露机密信息可能带来的风险。"
  },
  {
    title: '新员工信息安全知识培训・岗位安全知识',
    overview:"新员工信息安全知识培训的一部分是关于岗位安全知识的培训，旨在向新入职员工传授与其具体岗位和工作职责相关的安全知识和最佳实践。本次培训的目标是帮助员工了解在其岗位上如何识别和应对安全风险，掌握岗位安全操作技巧，以确保工作环境的安全和数据的保护。"
  },
];

const data2 = [
  {
    title: '「2023/06」软件研发中心・月度安全培训',
    overview:"软件研发中心月度安全培训是一项定期举行的培训计划，旨在提高软件研发团队对安全问题的意识和技能，以保护软件和系统的安全性。本次培训的目标是向团队成员传授与软件研发过程中的安全相关知识，并介绍最佳实践，以减少潜在的安全风险和漏洞。"
  }
];

const Training: NextPage = () => {
  const router = useRouter();
  const readBtn=()=>{
    router.push('/read'); 
  }

  return (
    <div>
      <Head>
        <title>企业信息安全教育系统</title>
      </Head>
      <Header isActive="training" />
      <main>
        <Container lg style={{marginTop:"2rem",padding:"0px"}}>
          <Card hoverable title="入职培训" bordered={true} >
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="/file.svg" />}
                    title={<a href="https://ant.design">{item.title}</a>}
                    description={item.overview}
                  />
                  <div style={{marginLeft:"2rem"}}><Button onClick={readBtn}>学习</Button></div>
                </List.Item>
              )}
            />
          </Card>

        </Container>

        <Container lg style={{marginTop:"2rem",padding:"0px"}}>
          <Card hoverable title="最新培训" bordered={true} >
            <List
              itemLayout="horizontal"
              dataSource={data2}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="/file.svg" />}
                    title={<a href="https://ant.design">{item.title}</a>}
                    description={item.overview}
                  />
                  <div style={{marginLeft:"2rem"}}><Button onClick={readBtn}>学习</Button></div>
                </List.Item>
              )}
            />
          </Card>

        </Container>
      </main>
      <Footer />
    </div>
  );
};


export default Training;
