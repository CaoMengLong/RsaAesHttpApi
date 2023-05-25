import { Container } from "@nextui-org/react";
import { Col, Row } from "antd";
import Link from "next/link";

export default function Footer() {
  return (
    <Container lg style={{ marginTop: "2rem", padding: "0px" }}>
      <Row>
        <Col span={24} style={{textAlign:"center",padding:"1rem"}}> Northern Arizona University Graduation Project<br/>  Student Name: Menglong Cao / Advisor: Dewei Meng</Col>
      </Row>
    </Container>
  );
}
