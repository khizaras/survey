import React from "react";
import { Menu, Layout, Dropdown, Button, Tooltip } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  RocketOutlined,
  PlusCircleOutlined,
  UserOutlined,
  BarChartOutlined,
  LoginOutlined,
  BgColorsOutlined,
} from "@ant-design/icons";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { setThemeColor } from "../slices/themeSlice";

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
  const dispatch = useDispatch();
  const themeColor = useSelector((state) => state.theme.color);
  const [colorPickerVisible, setColorPickerVisible] = React.useState(false);

  const handleThemeChange = (c) => {
    dispatch(setThemeColor(c.hex));
  };

  const colorPicker = (
    <div
      style={{
        padding: 12,
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      <SketchPicker
        color={themeColor}
        onChangeComplete={handleThemeChange}
        presetColors={[
          "#00eaff",
          "#3a8dde",
          "#ff4d4f",
          "#52c41a",
          "#faad14",
          "#722ed1",
          "#232526",
          "#1890ff",
        ]}
        disableAlpha
      />
    </div>
  );

  return (
    <Header
      style={{
        background: "rgba(30, 41, 59, 0.85)",
        padding: 0,
        display: "flex",
        alignItems: "center",
        height: 72,
      }}
    >
      <div
        style={{
          color: "#00eaff",
          fontWeight: 700,
          fontSize: 28,
          letterSpacing: 2,
          marginRight: 32,
          display: "flex",
          alignItems: "center",
        }}
      >
        <RocketOutlined style={{ fontSize: 32, marginRight: 10 }} />
        PollX
      </div>
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{ flex: 1, background: "transparent", borderBottom: "none" }}
      />
      <Tooltip title="Change Theme Color">
        <Dropdown
          menu={{ items: [{ key: "color", label: colorPicker }] }}
          trigger={["click"]}
          open={colorPickerVisible}
          onOpenChange={setColorPickerVisible}
        >
          <Button
            shape="circle"
            icon={
              <BgColorsOutlined style={{ color: themeColor, fontSize: 22 }} />
            }
            style={{
              marginRight: 24,
              marginLeft: 8,
              border: "none",
              background: "transparent",
              boxShadow: "none",
            }}
          />
        </Dropdown>
      </Tooltip>
    </Header>
  );
};

export default Navbar;
