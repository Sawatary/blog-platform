import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { Flex } from "antd";
import { Content } from "antd/es/layout/layout";

function Layout() {
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
}

export default Layout;
