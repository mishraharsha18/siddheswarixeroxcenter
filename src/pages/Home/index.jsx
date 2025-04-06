import React from "react";
import { Layout, Typography, Row, Col, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

function Home() {
    const navigate = useNavigate();

    return (
        <Content style={{ padding: "50px", background: "#fff" }}>
            <Row justify="center" align="middle" style={{ minHeight: "60vh" }}>
                <Col span={12}>
                    <Title level={1} style={{ color: "#1890ff" }}>
                        Welcome to Siddheswari Enterprise
                    </Title>
                    <Paragraph style={{ fontSize: "18px", lineHeight: "1.6" }}>
                        Siddheswari Enterprise is committed to delivering the
                        best products and services to our esteemed customers.
                        Explore our wide range of offerings and find the perfect
                        solutions tailored for your needs.
                    </Paragraph>
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => navigate("/products")}
                    >
                        Explore Products
                    </Button>
                </Col>
                <Col span={12}>
                    <img
                        src="https://via.placeholder.com/400"
                        alt="Siddheswari Enterprise"
                        style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "8px",
                        }}
                    />
                </Col>
            </Row>
        </Content>
    );
}

export default Home;
