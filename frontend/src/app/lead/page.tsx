"use client";

import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Layout,
  Menu,
} from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import api from "../../../lib/api";
import { format } from "date-fns";

const { Sider, Content, Header } = Layout;

interface Lead {
  id: number;
  name: string;
  email: string;
  status: string;
  createdAt: string;
}

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await api.get<Lead[]>("/leads");
      setLeads(res.data);
    } catch {
      message.error("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await api.post("/leads", values);
      message.success("Lead added!");
      form.resetFields();
      setIsModalOpen(false);
      fetchLeads();
    } catch {
      message.error("Failed to add lead");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) =>
        date ? format(new Date(date), "dd MMM yyyy, HH:mm") : "-",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div style={{ color: "white", padding: 16, fontWeight: "bold" }}>
          Lead Manager
        </div>
        <Menu mode="inline" items={[{ key: "leads", label: "Leads" }]} />
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2>Dashboard</h2>
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            Add Lead
          </Button>
        </Header>
        <Content style={{ margin: "16px" }}>
          <Table<Lead>
            columns={columns}
            dataSource={leads}
            rowKey="id"
            loading={loading}
          />
        </Content>
      </Layout>

      <Modal
        title="Add New Lead"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, type: "email", message: "Enter valid email" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}
