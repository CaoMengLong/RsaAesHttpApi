import { Container } from "@nextui-org/react";
import { Button, Card, Col, Divider, Input, Row } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
const { TextArea } = Input;
import AESUtil from "../utils/AESUtil";
import RSAUtil from "../utils/RSAUtil";

export default function TestComponent() {

  const [requestBody, setQequestBody] = useState("请输入需要发送的信息");
  const [responseBody, setResponseBody] = useState("");
  const [encryptBody, setEncryptBody] = useState("");
  const [decryptBody, setDecryptBody] = useState("");
  const [aesKey, setAesKey] = useState("");
  const [rsaPublicKey, setRsaPublicKey] = useState("");
  const [encryptedAesKey, setEncryptedAesKey] = useState("");

  const encryptClick = () => {
    const body = { requestData: AESUtil.encryptByECB(requestBody, aesKey) }
    setEncryptBody(JSON.stringify(body))
    setEncryptedAesKey(RSAUtil.publicEncrypt(aesKey, rsaPublicKey))
  }

  const requestClick = useCallback(async () => {
    console.info(encryptBody)
    try {
      const response = await fetch('/api/test/hello', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "request-key": encryptedAesKey },
        body: encryptBody,
      });
      console.info(response)
      setResponseBody(JSON.stringify(await response.json()))
    } catch (error) {
      console.error(error);
    }
  }, [encryptedAesKey, encryptBody])

  const decryptClick = () => {
    const respBody = JSON.parse(responseBody)
    const body = { resopnseData: AESUtil.decryptByECB(respBody.resopnseData, aesKey) }
    setDecryptBody(JSON.stringify(body))
  }


  useEffect(() => {
    setAesKey(AESUtil.createAesKey())
    var rsaPublicKey = `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAthpIjNeS9DrXI33AZXRK
    PTQZDfq07rzpkBiiAsLDSl+cJx4gLdFzoB4PYDsNG5rleKJe/LYlWdXzen+Trthw
    EKsLH2bLXn9FAGcWEmUWGorzgBrnzTUbhlRuroxK4aj5J7W/BdriQqfcLrylKOTg
    +5pE9XfzhZe8237KqSmUbrguf+gxdMcBjPuz0hp22Lgj6TDUonCGYtfuyn7nl8dV
    zD+NumFHf8pUTV0atg+sXWoR9AIxz8rZc32fVkEUr7cEYoWS6X65uXNED3Kafd1Q
    EwFXJeBLTRW7kzMtdgvk0U+5W0CLtAKpk54/d1PPobJDaIh8MrA+0yVZhY8xZ5uC
    LQIDAQAB
    -----END PUBLIC KEY-----`;
    setRsaPublicKey(rsaPublicKey)
  }, [])
  return (
    <div>
      <Container lg style={{ marginTop: "2rem", padding: "0px" }}>
        <Divider orientation="left" plain>密钥信息</Divider>
        <div style={{ marginBottom: "1rem" }}>
          <Card title="加密密钥" bordered={false} >
            <div>
              ASE KEY  <TextArea rows={1} value={aesKey} />
            </div>
            <div>
              RSA Public KEY  <TextArea rows={8} value={rsaPublicKey} />
            </div>
          </Card>
        </div>
        <Divider orientation="left" plain>验证操作</Divider>
        <Row>
          <Col span={22}>
            <Row gutter={16}>
              <Col span={10}>
                <Card title="消息加密" bordered={false} >
                  <p>请输入需要发送的消息:</p>
                  <Input.TextArea rows={8} value={requestBody} onChange={(e) => setQequestBody(e.target.value)} />
                  <div style={{ textAlign: "center", marginTop: "1rem" }}>
                    <Button type="primary" size="large" onClick={encryptClick}>
                      加密
                    </Button>
                  </div>
                </Card>
              </Col>
              <Col span={2} style={{ textAlign: "center", fontSize: "3rem", verticalAlign: "middles", lineHeight: "15rem" }}><ArrowRightOutlined rev={undefined} /></Col>
              <Col span={10}>
                <Card title="Request" bordered={false}>
                  <p>HTTP请求Header的自定义内容:</p>
                  <Input addonBefore="REQUEST_KEY" value={encryptedAesKey} />
                  <p>HTTP请求的BODY内容:</p>
                  <Input.TextArea rows={8} value={encryptBody} />
                  <div style={{ textAlign: "center", marginTop: "1rem" }}>
                    <Button type="primary" size="large" onClick={requestClick}>
                      发送请求
                    </Button>
                  </div>
                </Card>
              </Col>
              <Col span={2} style={{ textAlign: "center", fontSize: "3rem", verticalAlign: "middles", lineHeight: "15rem" }}><ArrowRightOutlined rev={undefined} /></Col>
            </Row>
            <Row gutter={16} style={{ marginTop: "1rem" }}>
              <Col span={10}>
                <Card title="消息解密" bordered={false}>
                  <p>解密后的响应数据:</p>
                  <Input.TextArea rows={8} value={decryptBody} />
                </Card>
              </Col>
              <Col span={2} style={{ textAlign: "center", fontSize: "3rem", verticalAlign: "middles", lineHeight: "15rem" }}><ArrowLeftOutlined rev={undefined} /></Col>
              <Col span={10}>
                <Card title="Response" bordered={false}>
                  <p>HTTP响应的BODY内容:</p>
                  <Input.TextArea rows={8} value={responseBody} />
                  <div style={{ textAlign: "center", marginTop: "1rem" }}>
                    <Button type="primary" size="large" onClick={decryptClick}>
                      解密
                    </Button>
                  </div>
                </Card>
              </Col>
              <Col span={2} style={{ textAlign: "center", fontSize: "3rem", verticalAlign: "middles", lineHeight: "15rem" }}><ArrowLeftOutlined rev={undefined} /></Col>
            </Row>
          </Col>

          <Col span={2}>
            <Card title="Server" bordered={false} style={{ minHeight: "100%" }}>
              <p>解密接收消息</p>
              <p>加密返回消息</p>
            </Card></Col>
        </Row>
      </Container >

    </div >
  );
};
