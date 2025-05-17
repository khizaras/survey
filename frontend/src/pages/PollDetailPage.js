import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  Tag,
  Progress,
  Spin,
  Button,
  Radio,
  Checkbox,
  message,
  Timeline,
  Row,
  Col,
  Alert,
} from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";

const { Title } = Typography;

const PollDetailPage = () => {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState(false);
  // multiSelected must be declared at the top level, but initialized only after poll is loaded
  const [multiSelected, setMultiSelected] = useState([]);

  useEffect(() => {
    axios.get(`/api/polls/${id}`).then((res) => {
      setPoll(res.data);
      setLoading(false);
      // Initialize multiSelected when poll loads
      if (res.data?.questions) {
        setMultiSelected(res.data.questions.map(() => []));
      }
    });
    // Check if user has voted (mock: always allow voting for now)
    setVoted(false);
  }, [id]);

  const handleVote = async () => {
    try {
      await axios.post(`/api/polls/${id}/vote`, {
        option_ids: poll.type === "radio" ? selected[0] : selected,
      });
      message.success("Vote submitted!");
      setVoted(true);
      // Refresh poll results
      const res = await axios.get(`/api/polls/${id}`);
      setPoll(res.data);
    } catch (e) {
      message.error(e.response?.data?.error || "Failed to vote");
    }
  };

  const handleMultiVote = async () => {
    try {
      // Collect selected option_ids per question
      const option_ids = poll.questions.map((q, idx) => {
        if (q.type === "radio") return multiSelected[idx][0];
        return multiSelected[idx];
      });
      await axios.post(`/api/polls/${id}/vote`, { option_ids });
      message.success("Vote submitted!");
      setVoted(true);
      // Refresh poll results
      const res = await axios.get(`/api/polls/${id}`);
      setPoll(res.data);
    } catch (e) {
      message.error(e.response?.data?.error || "Failed to vote");
    }
  };

  if (loading)
    return (
      <Spin size="large" style={{ margin: "80px auto", display: "block" }} />
    );
  if (!poll)
    return (
      <Alert
        type="error"
        message="Poll not found"
        showIcon
        style={{ margin: "40px auto", maxWidth: 600 }}
      />
    );

  if (Array.isArray(poll.questions) && poll.questions.length > 0) {
    return (
      <Card
        className="poll-card"
        style={{
          maxWidth: 900,
          margin: "0 auto",
          marginTop: 32,
          border: "none",
          background: "rgba(255,255,255,0.13)",
          boxShadow: "0 8px 32px 0 rgba(0,234,255,0.10)",
          borderRadius: 28,
          padding: 0,
        }}
        title={
          <Title
            level={2}
            style={{
              color: "#19d3ff",
              fontWeight: 800,
              letterSpacing: 1,
              marginBottom: 0,
            }}
          >
            {poll.question}
          </Title>
        }
      >
        <Timeline
          mode="left"
          style={{ margin: "32px 0 24px 0", paddingLeft: 0 }}
        >
          {poll.questions.map((q, qIdx) => (
            <Timeline.Item
              key={q.id}
              color="#19d3ff"
              dot={
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 18,
                    color: "#1e90ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                  }}
                >
                  {qIdx + 1}
                </span>
              }
              style={{ paddingBottom: 0, marginLeft: 0 }}
            >
              <div>
                <Card
                  hoverable={false}
                  className="no-hover-card poll-detail-card"
                  style={{
                    marginBottom: 0,
                    background: "#fff",
                    borderRadius: 8,
                    boxShadow: "0 1px 4px #0001",
                    marginLeft: 0,
                    border: "1px solid #e0e0e0",
                    padding: 0,
                  }}
                  bodyStyle={{ padding: 0 }}
                  title={null}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "stretch",
                      minHeight: 120,
                    }}
                  >
                    <div style={{ flex: 1, padding: 16 }}>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 17,
                          marginBottom: 12,
                          color: "#2b2b2b",
                        }}
                      >
                        {q.question_text}
                      </div>
                      <List
                        dataSource={q.options}
                        renderItem={(opt, optIdx) => {
                          const isSelected =
                            q.type === "radio"
                              ? multiSelected[qIdx][0] === opt.id
                              : multiSelected[qIdx]?.includes(opt.id);
                          const isVoted = voted || poll.status !== "active";
                          return (
                            <List.Item
                              style={{
                                alignItems: "center",
                                background: isVoted
                                  ? opt.votes > 0
                                    ? "#e6f9e6"
                                    : "#f5f5f5"
                                  : isSelected
                                  ? "#c8f7c5"
                                  : "#f5f5f5",
                                borderRadius: 6,
                                marginBottom: 8,
                                boxShadow: "none",
                                border: isSelected
                                  ? "1.5px solid #7ed957"
                                  : "1px solid #e0e0e0",
                                display: "flex",
                                padding: "8px 12px",
                                transition: "background 0.2s, border 0.2s",
                              }}
                            >
                              {q.type === "radio" ? (
                                <Radio
                                  checked={isSelected}
                                  disabled={isVoted}
                                  onChange={() => {
                                    const updated = [...multiSelected];
                                    updated[qIdx] = [opt.id];
                                    setMultiSelected(updated);
                                  }}
                                  style={{ marginRight: 12 }}
                                />
                              ) : (
                                <Checkbox
                                  checked={isSelected}
                                  disabled={isVoted}
                                  onChange={(e) => {
                                    const updated = [...multiSelected];
                                    if (e.target.checked)
                                      updated[qIdx] = [
                                        ...updated[qIdx],
                                        opt.id,
                                      ];
                                    else
                                      updated[qIdx] = updated[qIdx].filter(
                                        (i) => i !== opt.id
                                      );
                                    setMultiSelected(updated);
                                  }}
                                  style={{ marginRight: 12 }}
                                />
                              )}
                              <span
                                style={{
                                  flex: 1,
                                  fontWeight: 500,
                                  fontSize: 16,
                                  color: isVoted ? "#444" : "#222",
                                }}
                              >
                                {opt.option_text}
                              </span>
                              {isVoted && (
                                <span
                                  style={{
                                    marginLeft: 16,
                                    color: "#888",
                                    fontSize: 15,
                                  }}
                                >
                                  {opt.votes}{" "}
                                  {opt.votes === 1 ? "vote" : "votes"}
                                </span>
                              )}
                            </List.Item>
                          );
                        }}
                      />
                      <div
                        style={{ marginTop: 8, color: "#888", fontSize: 13 }}
                      >
                        {q.type === "radio"
                          ? "Single choice"
                          : "You may choose multiple options."}
                      </div>
                    </div>
                    <div
                      style={{
                        width: 120,
                        minWidth: 100,
                        borderLeft: "1px solid #eee",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#fafbfc",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 32,
                          fontWeight: 600,
                          color: "#888",
                          marginBottom: 2,
                        }}
                      >
                        {q.options.reduce((sum, o) => sum + (o.votes || 0), 0)}
                      </div>
                      <div style={{ color: "#888", fontSize: 15 }}>
                        {q.options.reduce(
                          (sum, o) => sum + (o.votes || 0),
                          0
                        ) === 1
                          ? "voter"
                          : "voters"}
                      </div>
                      <div
                        style={{
                          color: "#bbb",
                          fontSize: 12,
                          marginTop: 8,
                          textAlign: "center",
                        }}
                      >
                        {q.type === "radio"
                          ? "Single choice"
                          : "You may choose up to " +
                            q.options.length +
                            " options."}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 8,
                      borderTop: "1px solid #eee",
                      padding: "10px 16px",
                      background: "#fafbfc",
                    }}
                  >
                    {!voted && poll.status === "active" && (
                      <Button
                        type="primary"
                        size="small"
                        disabled={multiSelected[qIdx].length === 0}
                        onClick={handleMultiVote}
                        style={{ minWidth: 100, fontWeight: 600 }}
                      >
                        Vote now!
                      </Button>
                    )}
                    <Button size="small" style={{ minWidth: 90 }}>
                      Show results
                    </Button>
                    <Button size="small" style={{ minWidth: 70 }}>
                      Close
                    </Button>
                  </div>
                </Card>
              </div>
            </Timeline.Item>
          ))}
        </Timeline>
        {!voted && poll.status === "active" && (
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Button
              type="primary"
              size="large"
              disabled={multiSelected.some((sel) => sel.length === 0)}
              onClick={handleMultiVote}
              style={{
                minWidth: 220,
                borderRadius: 16,
                fontWeight: 700,
                fontSize: 20,
                background: "linear-gradient(90deg,#19d3ff,#1e90ff)",
                boxShadow: "0 2px 16px #19d3ff33",
              }}
            >
              Submit Vote
            </Button>
          </div>
        )}
        <div
          style={{
            marginTop: 32,
            display: "flex",
            gap: 24,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Tag
            color={poll.status === "active" ? "success" : "default"}
            style={{ fontSize: 16 }}
          >
            {poll.status}
          </Tag>
          <span style={{ color: "#b2eaff" }}>Created: {poll.created_at}</span>
          {poll.expires_at && (
            <span style={{ color: "#b2eaff" }}>Expires: {poll.expires_at}</span>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card style={{ maxWidth: 700, margin: "40px auto", textAlign: "center" }}>
      <Title level={3} style={{ color: "#19d3ff" }}>
        No questions found for this poll.
      </Title>
    </Card>
  );
};

export default PollDetailPage;
