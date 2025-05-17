import React from "react";
import { Menu, Layout } from "antd";
import { Link, useLocation } from "react-router-dom";
import { RocketOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const { Header } = Layout;

const menuItems = [
  {
    key: "/polls",
    label: <Link to="/polls">Polls</Link>,
  },
  {
    key: "/polls/create",
    label: <Link to="/polls/create">Create Poll</Link>,
  },
  {
    key: "/admin",
    label: <Link to="/admin">Admin</Link>,
  },
  {
    key: "/login",
    label: <Link to="/login">Login</Link>,
    style: { float: "right", marginLeft: "auto" },
  },
];

const Navbar = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user.info);
  // Filter out Login if user is logged in
  const filteredMenuItems = user
    ? menuItems.filter((item) => item.key !== "/login")
    : menuItems;
  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 36px",
        display: "flex",
        alignItems: "center",
        height: 80,
        boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
        borderBottom: "1.5px solid #e5e7eb",
      }}
    >
      <div
        style={{
          color: "#111",
          fontWeight: 800,
          fontSize: 32,
          letterSpacing: 2,
          marginRight: 48,
          display: "flex",
          alignItems: "center",
        }}
      >
        <RocketOutlined style={{ fontSize: 38, marginRight: 14 }} />
        PollX
      </div>
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={filteredMenuItems}
        style={{
          flex: 1,
          background: "transparent",
          borderBottom: "none",
          fontSize: 20,
          fontWeight: 600,
        }}
      />
      {user && (
        <div style={{ display: "flex", alignItems: "center", marginLeft: 24 }}>
          <div className="avatar" style={{ marginRight: 10 }}>
            {user.name?.[0] || <UserOutlined />}
          </div>
          <span style={{ fontWeight: 600, color: "#222", fontSize: 17 }}>
            {user.name}
          </span>
        </div>
      )}
    </Header>
  );
};

export default Navbar;
