import { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Card, Divider, Row, Col, Button, Space, Badge, Radio, Progress, RadioChangeEvent, Modal, Result } from 'antd';
import { Container } from "@nextui-org/react";
import { Router, useRouter } from 'next/router';
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"
import prisma from '../../lib/prismadb';
import { useCallback, useEffect, useState } from "react";
import { TestPaperSubject } from "@prisma/client";
import { signIn, useSession } from "next-auth/react";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

type CheckResult = {
  id: number,
  result: string
}

const Read: NextPage<Props> = ({ testPaperObj, testPaperSubjectList, checkResultList, testId }: Props) => {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn()
    },
  })
  const [checkList, setCheckList] = useState<CheckResult[]>(checkResultList)
  const [percent, setPercent] = useState(0)
  const router = useRouter();

  useEffect(() => {
    let count = 0
    checkResultList.forEach(element => {
      if (element.result === "success" || element.result === "failure") {
        count++
      }
    });
    const value = Number(count / checkResultList.length * 100) | 0
    setPercent(value)
  }, [checkList]);


  const onChange = useCallback(
    (e: RadioChangeEvent, id: number) => {
      const found = testPaperSubjectList.find(element => element.id === id)
      const answer = e.target.value
      const result = checkList.map((check) => {
        if (check.id === id) {
          if (found?.answer === answer) {
            check.result = "success"
          } else {
            check.result = "failure"
          }
          console.info(check, check)
          return check
        } else {
          return check
        }
      })
      setCheckList([...result])
    },
    [],
  )

  const getAnswerText = useCallback(
    (id: number) => {
      const found = checkResultList.find((element) => element.id === id)
      if (found?.result === "") {
        return "..."
      } else {
        return "已回答"
      }
    },
    [],
  )



  const onSubmitAction = useCallback(async () => {
    try {
      const body = { testId: testId };
      const result = await fetch('/api/testResult/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      console.info(result)
      router.push('/check/');
    } catch (error) {
      console.error(error);
    }
  }, [])

  const onSubmit = useCallback(() => {
    if (percent !== 100) {

      Modal.error({
        title: '提交失败',
        content: '请完成全部题目后再提交作业。',
        centered: true
      });
      return
    } else {
      let count = 0
      checkResultList.forEach(element => {
        if (element.result === "success") {
          count++
        }
      });
      if (count < checkResultList.length) {
        Modal.error({
          title: '提交失败',
          content: '根据考试要求，所有题目都必须全部正确，才能够完成本次测试。',
          centered: true
        });
      } else {
        Modal.success({
          centered: true,
          content: <Result
            status="success"
            title="[合格] 恭喜您，通过本次测试！"
          />,
          okText: "提交结果",
          onOk: onSubmitAction,
          maskClosable: false,
          keyboard: false,
        });
      }
    }
  }, [percent, checkList])

  return (
    <div>
      <Head>
        <title>企业信息安全教育系统</title>
      </Head>
      <Header isActive="check" />
      <Container lg style={{ marginTop: "2rem" }}>
        <Card hoverable title={<TitleDiv title={testPaperObj?.title} />}
          bordered={true} style={{ backgroundColor: "#f9f9e7" }}>
          <Row>
            <Col span={18}>
              <p>
                {testPaperObj?.description}
              </p>
            </Col>
            <Col span={6} style={{ textAlign: "center" }}>
              <Progress type="circle" percent={percent} />
            </Col>
          </Row>
          <Divider />
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            {testPaperSubjectList.map((testPaperSubject, index) => (
              <Badge.Ribbon text={getAnswerText(testPaperSubject.id)} key={index}>
                <Card title={testPaperSubject.title} size="small">
                  {testPaperSubject.description}
                  <Row>
                    <Col span={24} style={{ textAlign: "center" }}>
                      <Radio.Group optionType="button" onChange={(e) => { onChange(e, testPaperSubject.id) }}
                        buttonStyle="solid" size="large">
                        <Radio.Button value="YES"><CheckCircleOutlined rev={undefined} /> YES</Radio.Button>
                        <Radio.Button value="NO"><CloseCircleOutlined rev={undefined} /> NO</Radio.Button>
                      </Radio.Group></Col>
                  </Row>
                </Card>
              </Badge.Ribbon>
            ))}
          </Space>
          <Divider dashed />
          <Progress percent={percent} />
          <Divider dashed />
          <div style={{ textAlign: "center" }}>
            <Button type="primary" size="large" onClick={onSubmit}>
              提交回答
            </Button>
          </div>
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

type TitleDivProps = {
  title?: string;
}

const TitleDiv = ({ title }: TitleDivProps) => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.back();
  };
  return (
    <Row>
      <Col span={12}>{title}</Col>
      <Col span={12} style={{ textAlign: "right" }}>
        <Button onClick={handleButtonClick}>返回</Button>
      </Col>
    </Row>)
}

export const getServerSideProps = async ({
  params
}: GetServerSidePropsContext<{ id: string }>) => {
  const testPaperObj = await prisma.testPaper.findUnique({
    where: {
      id: Number(params?.id),
    }
  });
  const testPaperSubjectList = await prisma.testPaperSubject.findMany({
    where: {
      testId: Number(params?.id),
    }
  });

  let checkResultList: CheckResult[] = []
  testPaperSubjectList.forEach(element => {
    checkResultList.push({
      id: element.id,
      result: ""
    })
  });

  return {
    props: { testPaperObj, testPaperSubjectList, checkResultList, testId: params?.id },
  }
}

export default Read;
