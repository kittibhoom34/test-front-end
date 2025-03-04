import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ConfigProvider, Layout, Menu, Card } from "antd";
import { HomeOutlined, InfoCircleOutlined } from "@ant-design/icons";
import thTH from "antd/lib/locale/th_TH";
import Fruit from "./screen/test1/fruit-vegetable";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import NotFound from "./pages/NotFound";
import "./App.css";
import Apitran from "./screen/test2/api-tranform";

const { Header, Sider, Content } = Layout;

function App() {
  return (
    <ConfigProvider locale={thTH}>
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          {/* Sidebar Menu */}
          <Sider theme="dark">
            <div className="logo" style={{ height: 50, color: "#fff", textAlign: "center", lineHeight: "50px", fontSize: 18 }}>
              My App
            </div>
            <Menu theme="dark" mode="vertical" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1" icon={<HomeOutlined />}>
                <Link to="/">fruit-vegettable</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<InfoCircleOutlined />}>
                <Link to="/transfer-data">transfer-data</Link>
              </Menu.Item>
            </Menu>
          </Sider>

          {/* Main Content */}
          <Layout>
            <Header style={{ background: "#fff", padding: 0, textAlign: "center", fontSize: "20px" }}>
              Front-end test
            </Header>
            <Content style={{ margin: "20px" }}>
              <Card style={{ maxWidth: '100%', margin: "auto", padding: 20 }}>
                <Routes>
                  <Route path="/" element={<Fruit />} />
                  <Route path="/transfer-data" element={<Apitran />} />
                </Routes>
              </Card>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </ConfigProvider>
  );
}

export default App;
