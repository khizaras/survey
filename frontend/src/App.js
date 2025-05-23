import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Layout, ConfigProvider } from "antd";
import { Provider, useSelector } from "react-redux";
import "./styles/main.less";
import PollListPage from "./pages/PollListPage";
import PollDetailPage from "./pages/PollDetailPage";
import PollCreatePage from "./pages/PollCreatePage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import store from "./store";

const { Content } = Layout;

const AppContent = () => {
  const themeColor = useSelector((state) => state.theme.color);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: themeColor,
          borderRadius: 16,
          fontSize: 16,
        },
      }}
    >
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Navbar />
          <Content style={{ padding: "24px" }}>
            <Switch>
              <Route path="/login" component={LoginPage} />
              <Route path="/polls/create" component={PollCreatePage} />
              <Route path="/polls/:id" component={PollDetailPage} />
              <Route path="/admin" component={AdminDashboardPage} />
              <Route exact path="/polls" component={PollListPage} />
              <Redirect to="/polls" />
            </Switch>
          </Content>
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
