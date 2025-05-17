import React, { useEffect } from "react";
import { Card, Button, Tag, Row, Col, Tooltip, Spin } from "antd";
import { Link } from "react-router-dom";
import {
  ThunderboltOutlined,
  EyeOutlined,
  UserOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchPolls } from "../slices/pollsSlice";

const leaderboardData = [
  { name: "Alice", score: 12 },
  { name: "Bob", score: 9 },
  { name: "Carol", score: 7 },
];

const PollListPage = () => {
  const dispatch = useDispatch();
  const { items: polls, loading, error } = useSelector((state) => state.polls);

  useEffect(() => {
    dispatch(fetchPolls());
  }, [dispatch]);

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      <div className="app-hero">
        <div>
          <div className="app-hero-title">Internal Polling Dashboard</div>
          <div className="app-hero-desc">
            Participate in company polls, view results, and see who’s leading
            the pack!
          </div>
        </div>
        <div className="leaderboard">
          <div className="leaderboard-title">
            <TrophyOutlined style={{ color: "#faad14", marginRight: 8 }} />
            Leaderboard
          </div>
          {leaderboardData.map((user, idx) => (
            <div className="leaderboard-item" key={user.name}>
              <div className="leaderboard-avatar">
                <UserOutlined />
              </div>
              <span style={{ fontWeight: 600 }}>{user.name}</span>
              <span className="leaderboard-score">{user.score} pts</span>
            </div>
          ))}
        </div>
      </div>
      <Row gutter={[32, 32]}>
        {loading ? (
          <Col span={24} style={{ textAlign: "center" }}>
            <Spin size="large" />
          </Col>
        ) : error ? (
          <Col span={24} style={{ textAlign: "center", color: "red" }}>
            Failed to load polls: {error}
          </Col>
        ) : polls.length === 0 ? (
          <Col span={24} style={{ textAlign: "center", color: "#888" }}>
            No polls available.
          </Col>
        ) : (
          polls.map((poll) => (
            <Col xs={24} sm={12} md={8} lg={6} key={poll.id}>
              <Card
                className="poll-card"
                hoverable
                style={{ minHeight: 220, border: "none" }}
                title={
                  <span style={{ fontWeight: 600, fontSize: 20 }}>
                    {poll.question}
                  </span>
                }
                extra={
                  <Tooltip title="View Poll">
                    <Link to={`/polls/${poll.id}`}>
                      <EyeOutlined style={{ fontSize: 22, color: "#19d3ff" }} />
                    </Link>
                  </Tooltip>
                }
                actions={[
                  poll.status === "active" && (
                    <Tooltip title="Vote">
                      <Link to={`/polls/${poll.id}`}>
                        <ThunderboltOutlined
                          style={{ color: "#19d3ff", fontSize: 20 }}
                        />{" "}
                        Vote
                      </Link>
                    </Tooltip>
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
                <div style={{ color: "#888", fontSize: 14, marginTop: 8 }}>
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
