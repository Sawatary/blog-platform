import { Flex } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Content>
        <Flex vertical align="center" style={{ height: "100%" }}>
          <Outlet />
        </Flex>
      </Content>
    </>
  );
};

export default Layout;
