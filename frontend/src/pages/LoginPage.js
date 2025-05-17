import React from "react";
import { Button, Card, Typography } from "antd";

const { Title } = Typography;

const handleSSOLogin = () => {
  // Placeholder for SSO login logic
  window.location.href = "/api/auth/sso";
};

const LoginPage = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
    }}
  >
    <Card
      style={{
        minWidth: 360,
        textAlign: "center",
        margin: "0 auto",
        marginTop: 120,
        border: "none",
        borderRadius: 20,
        boxShadow: "0 8px 32px 0 rgba(0,234,255,0.18)",
      }}
    >
      <Title
        level={2}
        style={{
          color: "#00eaff",
          fontWeight: 700,
          marginBottom: 32,
        }}
      >
        Sign in to Internal Polling
      </Title>
      <Button
        type="primary"
        onClick={handleSSOLogin}
        size="large"
        style={{
          borderRadius: 12,
          fontWeight: 600,
          fontSize: 18,
          padding: "12px 32px",
        }}
      >
        Sign in with SSO
      </Button>
    </Card>
  </div>
);

export default LoginPage;
