import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  MenuOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme, Row, Col, Typography } from "antd";

const { Header, Content, Sider } = Layout;
const {Title, Text} = Typography

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header className="header">
      <div className="logo">
        {/* <img src={logo} alt="Logo" /> */}
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Products</Menu.Item>
        <Menu.Item key="3">Contact Us</Menu.Item>
        <Menu.SubMenu key="4" icon={<MenuOutlined />} title="More">
          <Menu.Item key="4.1">About Us</Menu.Item>
          <Menu.Item key="4.2">FAQs</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Header>
      <Layout>
        <Sider
        width="20%"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        ></Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
