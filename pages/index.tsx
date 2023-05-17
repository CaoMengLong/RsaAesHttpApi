import { NextPage } from "next";
import Head from "next/head";

import Footer from "../components/Footer";
import Header from "../components/Header";

import { Container, Grid, Card, Col, Text, Row, Button } from "@nextui-org/react";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>企业信息安全教育系统</title>
      </Head>
      <Header />
      <main>
        <Container lg>
          <Grid.Container gap={2} justify="center">
            <Grid xs={12} sm={4}>
              <Card1 />
            </Grid>
            <Grid xs={12} sm={4}>
              <Card2 />
            </Grid>
            <Grid xs={12} sm={4}>
              <Card3 />
            </Grid>
            <Grid xs={12} sm={5}>
              <Card4 />
            </Grid>
            <Grid xs={12} sm={7}>
              <Card5 />
            </Grid>
          </Grid.Container>
        </Container>
      </main>
      <Footer />
    </div>
  );
};


const Card1 = () => (
  <Card isHoverable isPressable>
    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
      <Col>
        <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
          Information Security Training Materials
        </Text>
        <Text h4 color="white">
          信息安全培训资料 
        </Text>
      </Col>
    </Card.Header>
    <Card.Image
      src="https://nextui.org/images/card-example-4.jpeg"
      objectFit="cover"
      width="100%"
      height={340}
      alt="Card image background"
    />
  </Card>
);

const Card2 = () => (
  <Card isHoverable isPressable css={{ w: "100%" }}>
    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
      <Col>
        <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
          Online assessment
        </Text>
        <Text h4 color="white">
          在线考核
        </Text>
      </Col>
    </Card.Header>
    <Card.Image
      src="https://nextui.org/images/card-example-3.jpeg"
      width="100%"
      height={340}
      objectFit="cover"
      alt="Card image background"
    />
  </Card>
);

const Card3 = () => (
  <Card isHoverable isPressable css={{ bg: "$black", w: "100%" }}>
    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
      <Col>
        <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
          Supercharged
        </Text>
        <Text h4 color="white">
          Creates beauty like a beast
        </Text>
      </Col>
    </Card.Header>
    <Card.Image
      src="https://nextui.org/images/card-example-2.jpeg"
      width="100%"
      height={340}
      objectFit="cover"
      alt="Card image background"
    />
  </Card>
);

const Card4 = () => (
  <Card css={{ w: "100%", h: "400px" }}>
    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
      <Col>
        <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
          New
        </Text>
        <Text h3 color="black">
          Acme camera
        </Text>
      </Col>
    </Card.Header>
    <Card.Body css={{ p: 0 }}>
      <Card.Image
        src="https://nextui.org/images/card-example-6.jpeg"
        width="100%"
        height="100%"
        objectFit="cover"
        alt="Card example background"
      />
    </Card.Body>
    <Card.Footer
      isBlurred
      css={{
        position: "absolute",
        bgBlur: "#ffffff66",
        borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
        bottom: 0,
        zIndex: 1,
      }}
    >
      <Row>
        <Col>
          <Text color="#000" size={12}>
            Available soon.
          </Text>
          <Text color="#000" size={12}>
            Get notified.
          </Text>
        </Col>
        <Col>
          <Row justify="flex-end">
            <Button flat auto rounded color="secondary">
              <Text
                css={{ color: "inherit" }}
                size={12}
                weight="bold"
                transform="uppercase"
              >
                Notify Me
              </Text>
            </Button>
          </Row>
        </Col>
      </Row>
    </Card.Footer>
  </Card>
);

const Card5 = () => (
  <Card css={{ w: "100%", h: "400px" }}>
    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
      <Col>
        <Text size={12} weight="bold" transform="uppercase" color="#9E9E9E">
          Your day your way
        </Text>
        <Text h3 color="white">
          Your checklist for better sleep
        </Text>
      </Col>
    </Card.Header>
    <Card.Body css={{ p: 0 }}>
      <Card.Image
        src="https://nextui.org/images/card-example-5.jpeg"
        objectFit="cover"
        width="100%"
        height="100%"
        alt="Relaxing app background"
      />
    </Card.Body>
    <Card.Footer
      isBlurred
      css={{
        position: "absolute",
        bgBlur: "#0f111466",
        borderTop: "$borderWeights$light solid $gray800",
        bottom: 0,
        zIndex: 1,
      }}
    >
      <Row>
        <Col>
          <Row>
            <Col span={3}>
              <Card.Image
                src="https://nextui.org/images/breathing-app-icon.jpeg"
                css={{ bg: "black", br: "50%" }}
                height={40}
                width={40}
                alt="Breathing app icon"
              />
            </Col>
            <Col>
              <Text color="#d1d1d1" size={12}>
                Breathing App
              </Text>
              <Text color="#d1d1d1" size={12}>
                Get a good night's sleep.
              </Text>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row justify="flex-end">
            <Button
              flat
              auto
              rounded
              css={{ color: "#94f9f0", bg: "#94f9f026" }}
            >
              <Text
                css={{ color: "inherit" }}
                size={12}
                weight="bold"
                transform="uppercase"
              >
                Get App
              </Text>
            </Button>
          </Row>
        </Col>
      </Row>
    </Card.Footer>
  </Card>
);

export default Home;
