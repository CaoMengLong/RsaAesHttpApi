
import NextImage from 'next/image';
import { Navbar, Button, Link, Text, Card, Radio, Avatar, Dropdown, Loading } from "@nextui-org/react";
import { useSession, signIn,signOut } from 'next-auth/react';
import { Key } from 'react';
export default function Header({ photo }: { photo?: string | undefined }) {
  const { data: session, status } = useSession();


  const onAction = (key: Key)=>{
    switch (key) {
      case "logout":
        signOut()
        break;    
      default:
        break;
    }
  }

  return (
    <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
      <Navbar isBordered variant="static">
        <Navbar.Brand>
          <NextImage src="/logo.svg" width={60} height={60} alt="LOGO" />
          <Text b color="inherit" hideIn="xs">
            企业信息安全教育系统
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          <Navbar.Link isActive href="#">首页</Navbar.Link>
          <Navbar.Link href="#">安全培训</Navbar.Link>
          <Navbar.Link href="#">在线考核</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          {/* <Navbar.Link color="inherit" href="#">
            {status}
          </Navbar.Link> */}
          {status === "loading" ?? <Loading size="xs" />  }
          {status === "authenticated" ? <Navbar.Content
            css={{
              "@xs": {
                w: "12%",
                jc: "flex-end",
              },
            }}
          >
            <Dropdown placement="bottom-right">
              <Navbar.Item>
                <Dropdown.Trigger>
                  <Avatar
                    bordered
                    as="button"
                    color="secondary"
                    size="md"
                    src={session.user?.image || "https://i.pravatar.cc/150?u=a042581f4e29026704d"}
                  />
                </Dropdown.Trigger>
              </Navbar.Item>
              <Dropdown.Menu
                aria-label="User menu actions"
                color="secondary"
                onAction={onAction}
              >
                <Dropdown.Item key="profile" css={{ height: "$18" }}>
                  <Text b color="inherit" css={{ d: "flex" }}>
                  {session.user?.name}
                  </Text>
                  <Text b color="inherit" css={{ d: "flex" }}>
                  {session.user?.email}
                  </Text>
                </Dropdown.Item>
                {/* <Dropdown.Item key="settings" withDivider>
                  My Settings
                </Dropdown.Item>
                <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
                <Dropdown.Item key="analytics" withDivider>
                  Analytics
                </Dropdown.Item>
                <Dropdown.Item key="system">System</Dropdown.Item>
                <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
                <Dropdown.Item key="help_and_feedback" withDivider>
                  Help & Feedback
                </Dropdown.Item> */}
                <Dropdown.Item key="logout" withDivider color="error"> 
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Content> : <Navbar.Item>
            <Button icon={<NextImage src="/google.png" width={30} height={30} alt="google" />} color="gradient" onClick={() => signIn("google")}>
              登录
            </Button>
          </Navbar.Item>}

        </Navbar.Content>
      </Navbar>
    </header>
  );
}
