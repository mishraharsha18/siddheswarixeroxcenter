import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import { apiCall } from "../../../common/request";
import { PlusOutlined } from "@ant-design/icons";

const BrandPage = () => {
    const [brands, setBrands] = useState([]);
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBrands = async () => {
            setLoading(true);
            const response = await apiCall("GET", "/brand");
            setBrands(response.data);
            setLoading(false);
        };
        fetchBrands();
    }, []);

    const handleCreate = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleFinish = async (values) => {
        setLoading(true);
        try {
            const response = await apiCall("POST", "/brand", values);
            setBrands([...brands, response.data]);
            setVisible(false);
            setLoading(false);
            message.success("Brand created successfully");
        } catch (error) {
            setLoading(false);
            message.error(error.message || "Failed to create brand");
        }
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
    ];

    return (
        <div>
            <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={handleCreate}
            >
                Create Brand
            </Button>
            <Modal
                title="Create Brand"
                visible={visible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            className="float-right mr-3"
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            {loading ? "Submitting" : "Submit"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Table loading={loading} columns={columns} dataSource={brands} />
        </div>
    );
};

export default BrandPage;
