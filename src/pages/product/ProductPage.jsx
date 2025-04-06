import React, { useEffect, useState } from "react";
import { apiCall } from "../../../common/request";
import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    message,
    Tabs,
    Card,
    Select,
    Row,
    Col,
    Typography,
    Checkbox
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, CheckCircleOutlined } from "@ant-design/icons";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState("");
    const [loading, setLoading] = useState(false);
    const [tabsActiveKey, setTabsActiveKey] = useState("all");
    const [isEditing, setIsEditing] = useState(false);
    const [addedProducts, setAddedProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
        fetchBrands();
    }, [tabsActiveKey]);

    const fetchProducts = async () => {
        setProducts([]);
        setLoading(true);
        try {

            const { data } = await apiCall(
                "GET",
                `/product?tabName=${tabsActiveKey}`
            );
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchBrands = async () => {
        try {
            const { data } = await apiCall("GET", "/brand");
            setBrands(data);
        } catch (error) {
            console.error("Failed to fetch brands:", error);
        }
    };

    const handleEdit = async (record) => {
        setIsEditing(true);
        setVisible(true);
        setEditingKey(record._id);
        try {
            const { data } = await apiCall("GET", `/product/${record._id}`);
            form.setFieldsValue(data);
        } catch (error) {
            console.error("Failed to fetch product:", error);
        }
    };

    const handleDelete = (id) => {
        Modal.confirm({
            title: "Are you sure to archive this product?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk: async () => {
                setLoading(true);
                try {
                    await apiCall("PUT", `/product/${id}`, {
                        archive: true,
                    });
                    fetchProducts();
                    message.success("Product archived successfully");
                } catch (error) {
                    console.error("Failed to archive product:", error);
                } finally {
                    setLoading(false);
                }
            },
        });
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            editable: true,
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            editable: true,
        },
        {
            title: "Variation",
            dataIndex: "variation",
            key: "variation",
            editable: true,
        },
        {
            title: "SKU",
            dataIndex: "sku",
            key: "sku",
            editable: false,
        },
        {
            title: "Brand",
            dataIndex: "brand_id",
            key: "brand_id",
            render: (text) => {
                const brand = brands.find((brand) => brand._id === text);
                return brand ? brand.name : text;
            },
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            editable: true,
            render: (text) => `₹ ${text}`,
        },
        {
            title: "Stock",
            dataIndex: "stock",
            key: "stock",
            editable: true,
        },
        {
            title: "Tags",
            dataIndex: "tags",
            key: "tags",
            editable: true,
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (_, record) => {
                const handleToggle = () => {
                    const isAdded = addedProducts.includes(record._id);
                    if (isAdded) {
                        setAddedProducts(
                            addedProducts.filter((id) => id !== record._id)
                        );
                    } else {
                        setAddedProducts([...addedProducts, record._id]);
                        message.success("Added to cart");
                    }
                };
                const isAdded = addedProducts.includes(record._id);
                return (
                    <div
                        style={{ display: "flex", justifyContent: "space-between" }}
                    >
                        <Typography.Link onClick={() => handleEdit(record)}>
                            <EditOutlined />
                        </Typography.Link>
                        <Checkbox
                            checked={addedProducts.includes(record._id)}
                            onChange={handleToggle}
                            style={{ color: isAdded ? "black" : "green" }}
                        >Add
                        </Checkbox>
                        <Typography.Link
                            onClick={() => handleDelete(record._id)}
                            style={{ color: "red" }}
                        >
                            <DeleteOutlined />
                        </Typography.Link>
                    </div>
                );
            },
        },
    ];

    const handleCreate = () => {
        setIsEditing(false);
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
    };

    const handleSubmitForm = async (values) => {
        setLoading(true);
        try {
            if (isEditing && editingKey) {
                await apiCall("PUT", `/product/${editingKey}`, values);
                message.success("Product updated successfully");
            } else {
                const response = await apiCall("POST", "/product", values);
                setProducts([...products, response.data]);
                message.success("Product created successfully");
            }
            setVisible(false);
            setLoading(false);
            fetchProducts();
        } catch ({ error }) {
            setLoading(false);
            message.error(error.message || "Failed to save product");
        }
    };

    return (
        <div>
            <Card title="Products" bordered={false}>
                <div style={{ float: "right" }}>
                    <Button
                        type="primary"
                        onClick={handleCreate}
                        icon={<PlusOutlined />}
                        style={{ marginBottom: 16 }}
                    >
                        Create Product
                    </Button>
                </div>
                <Tabs
                    defaultActiveKey="1"
                    onChange={(key) => setTabsActiveKey(key)}
                    items={[
                        {
                            label: "Active",
                            key: "all",
                        },
                        {
                            label: "Archived",
                            key: "archived",
                        },
                    ]}
                />
                <Table
                    columns={columns}
                    dataSource={products}
                    loading={loading}
                    rowKey={(record) => record._id}
                />
            </Card>
            <Modal
                open={visible}
                width={800}
                title={
                    <div
                        style={{
                            backgroundColor: "#1890ff",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            color: "white",
                            textAlign: "center",
                            fontSize: "18px",
                            fontWeight: "semibold",
                        }}
                    >
                        {isEditing ? "Update Product" : "Create Product"}
                    </div>
                }
                okText={isEditing ? "Update" : "Create"}
                cancelText="Cancel"
                onCancel={handleCancel}
                onOk={() => form.submit()}
                closable={false}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    onFinish={handleSubmitForm}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Name"
                                key={"name"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input product name!",
                                    },
                                ]}
                            >
                                <Input placeholder="Enter product name" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Description"
                                key={"description"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input description!",
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    cols={3}
                                    placeholder="Enter description"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={8}>
                            <Form.Item
                                name="brand_id"
                                label="Brand"
                                key={"brand_id"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select a brand!",
                                    },
                                ]}
                            >
                                <Select placeholder="Select a brand">
                                    {Array.isArray(brands) ? (
                                        brands.map((brand) => (
                                            <Select.Option
                                                key={brand._id}
                                                value={brand._id}
                                            >
                                                {brand?.name}
                                            </Select.Option>
                                        ))
                                    ) : (
                                        <></>
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="price"
                                label="Price"
                                key={"price"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input price!",
                                    },
                                ]}
                            >
                                <Input
                                    type="number"
                                    placeholder="Enter price"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="stock"
                                label="Stock"
                                key={"stock"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input stock!",
                                    },
                                ]}
                            >
                                <Input
                                    type="number"
                                    placeholder="Enter stock"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={10}>
                            <Form.Item
                                name="variation"
                                label="Variation"
                                key={"variation"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input variation!",
                                    },
                                ]}
                            >
                                <Input placeholder="Enter variation" />
                            </Form.Item>
                        </Col>
                        <Col span={14}>
                            <Form.Item
                                name="tags"
                                label="Tags"
                                key={"tags"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input tags!",
                                    },
                                ]}
                            >
                                <Input placeholder="Enter tags" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default ProductPage;

