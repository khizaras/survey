import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Tag,
  Spin,
  Input,
  Select,
  Button,
  Tooltip,
  Modal,
  Form,
} from "antd";
import { EditOutlined, ReloadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const AdminDashboardPage = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({});
  const [editModal, setEditModal] = useState({ visible: false, poll: null });
  const [editForm] = Form.useForm();

  useEffect(() => {
    axios.get("/api/admin/polls").then((res) => {
      setPolls(res.data);
      setLoading(false);
    });
  }, []);

  // Filtering logic for admin dashboard
  const filteredPolls = polls.filter((poll) => {
    const matchQuestion = filter.question
      ? poll.question.toLowerCase().includes(filter.question.toLowerCase())
      : true;
    const matchStatus = filter.status ? poll.status === filter.status : true;
    return matchQuestion && matchStatus;
  });

  const handleEdit = (poll) => {
    setEditModal({ visible: true, poll });
    editForm.setFieldsValue({
      question: poll.question,
      status: poll.status,
      type: poll.type,
      expires_at: poll.expires_at,
    });
  };

  const handleEditOk = async () => {
    const values = await editForm.validateFields();
    await axios.put(`/api/admin/polls/${editModal.poll.id}`, values);
    setEditModal({ visible: false, poll: null });
    // Refresh polls
    const res = await axios.get("/api/admin/polls");
    setPolls(res.data);
  };

  const handleEditCancel = () => setEditModal({ visible: false, poll: null });

  const columns = [
    { title: "Question", dataIndex: "question", key: "question" },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (t) =>
        t === "radio" ? (
          <Tag color="blue">Single</Tag>
        ) : (
          <Tag color="green">Multiple</Tag>
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (s) =>
        s === "active" ? (
          <Tag color="success">Active</Tag>
        ) : (
          <Tag>Completed</Tag>
        ),
    },
    { title: "Participants", dataIndex: "participants", key: "participants" },
    { title: "Created", dataIndex: "created_at", key: "created_at" },
    { title: "Department", dataIndex: "department", key: "department" },
    {
      title: "Edit",
      key: "edit",
      render: (_, poll) => (
        <Tooltip title="Edit Poll">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(poll)} />
        </Tooltip>
      ),
    },
  ];

  return (
    <Card title="Admin Dashboard">
      <div style={{ marginBottom: 16, display: "flex", gap: 16 }}>
        <Input
          placeholder="Search by question"
          style={{ width: 200 }}
          onChange={(e) =>
            setFilter((f) => ({ ...f, question: e.target.value }))
          }
        />
        <Select
          placeholder="Filter by status"
          style={{ width: 150 }}
          onChange={(v) => setFilter((f) => ({ ...f, status: v }))}
          allowClear
        >
          <Option value="active">Active</Option>
          <Option value="completed">Completed</Option>
        </Select>
      </div>
      {loading ? (
        <Spin />
      ) : (
        <Table columns={columns} dataSource={filteredPolls} rowKey="id" />
      )}
      <Modal
        title="Edit Poll"
        visible={editModal.visible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={editForm} layout="vertical">
          <Form.Item
            name="question"
            label="Question"
            rules={[{ required: true, message: "Please enter a question" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Select>
              <Option value="active">Active</Option>
              <Option value="completed">Completed</Option>
            </Select>
          </Form.Item>
          <Form.Item name="type" label="Type">
            <Select>
              <Option value="radio">Single Choice</Option>
              <Option value="checkbox">Multiple Choice</Option>
            </Select>
          </Form.Item>
          <Form.Item name="expires_at" label="Expiration Date">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default AdminDashboardPage;
