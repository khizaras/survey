import React, { useState } from "react";
import {
  Button,
  Input,
  Radio,
  Upload,
  DatePicker,
  Card,
  Space,
  Typography,
  Divider,
  message,
  Tooltip,
  Row,
  Col,
  Form,
} from "antd";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  UploadOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { createPoll } from "../slices/pollsSlice";

const { Title, Text } = Typography;

const defaultQuestion = () => ({
  question_text: "",
  type: "radio",
  options: [""],
  image_url: "",
});

const PollCreatePage = () => {
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([defaultQuestion()]);
  const [expiresAt, setExpiresAt] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleQuestionChange = (idx, field, value) => {
    const updated = [...questions];
    updated[idx][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIdx, oIdx, value) => {
    const updated = [...questions];
    updated[qIdx].options[oIdx] = value;
    setQuestions(updated);
  };

  const addOption = (qIdx) => {
    const updated = [...questions];
    updated[qIdx].options.push("");
    setQuestions(updated);
  };

  const removeOption = (qIdx, oIdx) => {
    const updated = [...questions];
    updated[qIdx].options.splice(oIdx, 1);
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, defaultQuestion()]);
  };

  const removeQuestion = (idx) => {
    if (questions.length === 1) return;
    const updated = [...questions];
    updated.splice(idx, 1);
    setQuestions(updated);
  };

  const handleImageUpload = (qIdx, info) => {
    if (info.file.status === "done") {
      const url = URL.createObjectURL(info.file.originFileObj);
      handleQuestionChange(qIdx, "image_url", url);
    }
  };

  const handleSubmit = async () => {
    if (
      questions.some(
        (q) =>
          !q.question_text ||
          q.options.length < 1 ||
          q.options.some((opt) => !opt)
      )
    ) {
      message.error("Please fill all questions and options.");
      return;
    }
    setLoading(true);
    try {
      await dispatch(createPoll({ questions, expires_at: expiresAt })).unwrap();
      message.success("Poll created!");
      setQuestions([defaultQuestion()]);
      setExpiresAt(null);
    } catch (e) {
      message.error("Failed to create poll.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 32,
        borderRadius: 32,
        background: "rgba(255,255,255,0.15)",
        boxShadow: "0 8px 40px 0 rgba(0,234,255,0.10)",
        backdropFilter: "blur(12px)",
      }}
    >
      <Title
        level={2}
        style={{
          color: "#19d3ff",
          fontWeight: 800,
          letterSpacing: 1,
          marginBottom: 0,
        }}
      >
        <QuestionCircleOutlined style={{ marginRight: 12, color: "#1e90ff" }} />
        Create a New Poll
      </Title>
      <Divider style={{ margin: "18px 0 32px 0" }} />
      <Form layout="vertical" autoComplete="off">
        {questions.map((q, qIdx) => (
          <Card
            key={qIdx}
            style={{
              marginBottom: 32,
              borderRadius: 24,
              background: "rgba(255,255,255,0.25)",
              boxShadow: "0 2px 16px 0 rgba(0,234,255,0.08)",
              border: "1.5px solid #e6f7ff",
            }}
            bodyStyle={{ padding: 28 }}
            title={
              <Space
                align="center"
                style={{
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 20,
                    color: "#1e90ff",
                  }}
                >
                  Question {qIdx + 1}
                </span>
                {questions.length > 1 && (
                  <Tooltip title="Remove this question">
                    <Button
                      icon={<DeleteOutlined />}
                      danger
                      size="small"
                      onClick={() => removeQuestion(qIdx)}
                      style={{ marginLeft: 8 }}
                    />
                  </Tooltip>
                )}
              </Space>
            }
            extra={null}
          >
            <Row gutter={32}>
              <Col xs={24} md={16}>
                <Form.Item
                  label={
                    <Text strong style={{ color: "#00eaff" }}>
                      Question Text
                    </Text>
                  }
                  required
                >
                  <Input
                    placeholder="Enter question text"
                    value={q.question_text}
                    onChange={(e) =>
                      handleQuestionChange(
                        qIdx,
                        "question_text",
                        e.target.value
                      )
                    }
                    size="large"
                    style={{
                      borderRadius: 12,
                      fontWeight: 500,
                      fontSize: 17,
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <Text strong style={{ color: "#00eaff" }}>
                      Poll Type
                    </Text>
                  }
                >
                  <Radio.Group
                    value={q.type}
                    onChange={(e) =>
                      handleQuestionChange(qIdx, "type", e.target.value)
                    }
                    style={{ fontWeight: 500 }}
                  >
                    <Radio value="radio">Single Choice</Radio>
                    <Radio value="checkbox">Multiple Choice</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label={
                    <Text strong style={{ color: "#00eaff" }}>
                      Options
                    </Text>
                  }
                  required
                >
                  <Space direction="vertical" style={{ width: "100%" }}>
                    {q.options.map((opt, oIdx) => (
                      <Space
                        key={oIdx}
                        style={{ width: "100%" }}
                        align="center"
                      >
                        <Input
                          placeholder={`Option ${oIdx + 1}`}
                          value={opt}
                          onChange={(e) =>
                            handleOptionChange(qIdx, oIdx, e.target.value)
                          }
                          style={{ width: 320, borderRadius: 10 }}
                          size="middle"
                          required
                        />
                        {q.options.length > 1 && (
                          <Tooltip title="Remove option">
                            <Button
                              icon={<DeleteOutlined />}
                              size="small"
                              onClick={() => removeOption(qIdx, oIdx)}
                              style={{ marginLeft: 4 }}
                            />
                          </Tooltip>
                        )}
                      </Space>
                    ))}
                    <Button
                      type="dashed"
                      icon={<PlusCircleOutlined />}
                      onClick={() => addOption(qIdx)}
                      style={{
                        width: 160,
                        marginTop: 6,
                        borderRadius: 10,
                      }}
                    >
                      Add Option
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item
                  label={
                    <Text strong style={{ color: "#00eaff" }}>
                      Image (optional)
                    </Text>
                  }
                >
                  <Upload
                    showUploadList={false}
                    beforeUpload={() => false}
                    onChange={(info) => handleImageUpload(qIdx, info)}
                  >
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                  </Upload>
                  {q.image_url && (
                    <img
                      src={q.image_url}
                      alt="Question"
                      style={{
                        maxWidth: 180,
                        marginTop: 12,
                        borderRadius: 12,
                        boxShadow: "0 2px 12px #00eaff22",
                      }}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Card>
        ))}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 32,
          }}
        >
          <Button
            type="dashed"
            icon={<PlusCircleOutlined />}
            onClick={addQuestion}
            style={{
              width: 220,
              borderRadius: 14,
              fontWeight: 600,
              fontSize: 17,
            }}
          >
            Add Question
          </Button>
          <Form.Item
            label={
              <Text strong style={{ color: "#00eaff" }}>
                Expiration Date (optional)
              </Text>
            }
            style={{ margin: 0 }}
          >
            <DatePicker
              style={{ width: 220, borderRadius: 12 }}
              value={expiresAt}
              onChange={setExpiresAt}
              size="large"
              format="YYYY-MM-DD"
              allowClear
            />
          </Form.Item>
        </div>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Button
            type="primary"
            size="large"
            loading={loading}
            onClick={handleSubmit}
            style={{
              minWidth: 220,
              borderRadius: 16,
              fontWeight: 700,
              fontSize: 20,
              background: "linear-gradient(90deg,#19d3ff,#1e90ff)",
              boxShadow: "0 2px 16px #19d3ff33",
            }}
          >
            Create Poll
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PollCreatePage;
