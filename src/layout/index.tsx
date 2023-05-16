import React from "react";
import SiderComponent from "./Sidebar";
import { Layout, Typography } from "antd";
import "./styles.css";
import HeaderComponent from "./Header";
import { Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const DefaultLayout = () => {
  React.useEffect(() => {}, []);

  return (
    <Layout className="main-layout">
      <Sider className="sider-layout">
        <SiderComponent />
        <Typography.Text className="copyright text-normal gray-brown regular-14 opacity-5">
          Copyright &copy; 2020 Alta Software
        </Typography.Text>
      </Sider>
      <Layout>
        <Header>
          <HeaderComponent />
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
