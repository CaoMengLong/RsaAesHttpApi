
import NextImage from 'next/image';
import { Navbar, Text} from "@nextui-org/react";
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
          <NextImage src="/logo.png" width={60} height={30} alt="LOGO" />
          <Text b color="inherit" hideIn="xs" style={{ marginLeft: "10px" }}>
            探讨混合加密模型在HTTP数据传输中的应用 - 技术验证
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          RSA+AES<br />HTTP通信加密<br />
        </Navbar.Content>
      </Navbar>
    </header>
  );
}
