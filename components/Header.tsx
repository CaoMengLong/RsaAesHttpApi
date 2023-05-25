
import NextImage from 'next/image';
import { Navbar, Button, Link, Text, Card, Radio, Avatar, Dropdown, Loading } from "@nextui-org/react";

import { Key } from 'react';

interface HeaderProps {
  isActive: string
}
export default function Header({ isActive }: HeaderProps) {



  const onAction = (key: Key) => {
    switch (key) {
      case "logout":

        break;
      default:
        break;
    }
  }

  return (
    <header>
      <Navbar isBordered variant="floating">
        <Navbar.Brand>
          <NextImage src="/logo.svg" width={60} height={60} alt="LOGO" />
          <Text b color="inherit" hideIn="xs">
            探讨混合加密模型在HTTP数据传输中的应用
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          <Navbar.Link {...(isActive === "index" ? { isActive: true } : {})} href="/">首页</Navbar.Link>
          <Navbar.Link {...(isActive === "training" ? { isActive: true } : {})} href="/training">安全培训</Navbar.Link>
          <Navbar.Link {...(isActive === "check" ? { isActive: true } : {})} href="/check">在线考核</Navbar.Link>
        </Navbar.Content>
      </Navbar>
    </header>
  );
}
