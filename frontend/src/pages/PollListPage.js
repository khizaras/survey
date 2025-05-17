import React, { useEffect } from "react";
import { Card, Button, List, Tag, Row, Col, Tooltip, Spin } from "antd";
import { Link } from "react-router-dom";
import {
  ThunderboltOutlined,
  EyeOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchPolls } from "../slices/pollsSlice";

const PollListPage = () => {
  const dispatch = useDispatch();
  const { items: polls, loading, error } = useSelector((state) => state.polls);

  useEffect(() => {
    dispatch(fetchPolls());
  }, [dispatch]);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <h1
        style={{
          color: "#00eaff",
          fontWeight: 700,
          fontSize: 36,
          marginBottom: 32,
          letterSpacing: 1,
        }}
      >
        Active Polls
      </h1>
      <Row gutter={[32, 32]}>
        {loading ? (
          <Col span={24} style={{ textAlign: "center" }}>
            <Spin size="large" />
          </Col>
        ) : error ? (
          <Col span={24} style={{ textAlign: "center", color: "red" }}>
            Failed to load polls: {error}
          </Col>
        ) : (
          polls.map((poll) => (
            <Col xs={24} sm={12} md={8} key={poll.id}>
              <Card
                className="poll-card"
                hoverable
                style={{ minHeight: 220, border: "none", marginBottom: 0 }}
                title={
                  <span style={{ fontWeight: 600, fontSize: 20 }}>
                    {poll.question}
                  </span>
                }
                extra={
                  <Tooltip title="View Poll">
                    <Link to={`/polls/${poll.id}`}>
                      <EyeOutlined style={{ fontSize: 22, color: "#00eaff" }} />
                    </Link>
                  </Tooltip>
                }
                actions={[
                  poll.status === "active" && (
                    <Tooltip title="Vote">
                      <Link to={`/polls/${poll.id}`}>
                        <ThunderboltOutlined
                          style={{ color: "#00eaff", fontSize: 20 }}
                        />{" "}
                        Vote
                      </Link>
                    </Tooltip>
                  ),
                  poll.status === "completed" && (
                    <CheckCircleOutlined
                      style={{ color: "#52c41a", fontSize: 20 }}
                    />
                  ),
                ]}
              >
                <div style={{ marginBottom: 12 }}>
                  {poll.type === "radio" ? (
                    <Tag color="blue">Single Choice</Tag>
                  ) : (
                    <Tag color="green">Multiple Choice</Tag>
                  )}
                  {poll.status === "active" ? (
                    <Tag color="success">Active</Tag>
                  ) : (
                    <Tag color="default">Completed</Tag>
                  )}
                </div>
                {poll.image_url && (
                  <img
                    src={poll.image_url}
                    alt="poll"
                    style={{
                      width: "100%",
                      maxHeight: 120,
                      objectFit: "cover",
                      borderRadius: 12,
                      marginBottom: 10,
                    }}
                  />
                )}
                <div style={{ color: "#b2eaff", fontSize: 14, marginTop: 8 }}>
                  Created: {poll.created_at}
                </div>
              </Card>
            </Col>
          ))
        )}
      </Row>
      <div style={{ textAlign: "right", marginTop: 32 }}>
        <Link to="/polls/create">
          <Button type="primary" size="large" icon={<ThunderboltOutlined />}>
            Create New Poll
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PollListPage;
