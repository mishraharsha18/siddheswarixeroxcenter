import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Layout, Menu, theme, Badge, Avatar } from "antd";
const { Header, Content, Footer } = Layout;
import {
    HomeOutlined,
    ProductOutlined,
    DatabaseOutlined,
    FileTextOutlined,
    TeamOutlined,
    ShoppingCartOutlined,
    SettingOutlined,
    LogoutOutlined,
    CrownOutlined, // Add CrownOutlined for brand icon
} from "@ant-design/icons";
import {
    Link,
    NavLink,
    useNavigate,
    useLocation,
    Outlet,
} from "react-router-dom";

const items = [
    {
        key: "home",
        icon: <HomeOutlined />,
        label: "Home",
    },
    {
        key: "products",
        icon: <ProductOutlined />,
        label: "Products",
    },
    {
        key: "3",
        icon: <DatabaseOutlined />,
        label: "Stocks",
    },
    {
        key: "brands",
        icon: <CrownOutlined />, // Use CrownOutlined for brand icon
        label: "Brands",
    },
    {
        key: "place-order",
        icon: <TeamOutlined />,
        label: "Place Order",
    },
    {
        key: "settings",
        icon: <SettingOutlined />,
        label: "Setting",
    },
];

const AppLayout = ({ content = null }) => {
    const [li_selectedNav, setSelectedNav] = useState(); // Initialize with the first menu item
    const navigate = useNavigate(); // Get navigate function from React Router
    const location = useLocation(); // Get location from React Router
    const handleLogout = () => {
        // Remove token from localStorage
        localStorage.removeItem("authToken");
        // Redirect to login page
        navigate("/login");
    };

    useEffect(() => {
        // Update the selected key based on the current route
        const currentKey = location.pathname.split("/")[1];
        setSelectedNav(currentKey);
    }, [location]);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Header
                style={{
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "10px",
                    height: "50px",
                    margin: "10px 50px",
                }}
            >
                <div className="demo-logo" />
                <span
                    style={{
                        color: "#fff",
                        fontSize: "18px",
                        marginLeft: "10px",
                        fontWeight: "bold",
                        paddingRight: "15px",
                        // textTransform: 'uppercase',
                        cursor: "pointer",
                        transition: "color 0.3s ease",
                    }}
                >
                    Siddheswari Enterprise
                </span>

                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[li_selectedNav]}
                    items={items}
                    onClick={({ key }) => {
                        setSelectedNav(key); // Update the selected key
                        navigate(`/${key}`); // Navigate to the corresponding route
                    }}
                    style={{
                        flex: 1,
                        minWidth: 0,
                        height: "100%",
                        alignItems: "center",
                        overflow: "hidden",
                    }}
                    className="custom-menu"
                />

                <span className="mr-10 mt-3">
                    <Badge count={4} size="small">
                        {/* <span className="text-white text-xl mr-1 p-2">
                            Cart
                        </span> */}
                        <ShoppingCartOutlined
                            style={{
                                fontSize: "24px", // Increase size
                                color: "#fff", // Change color to orange-red or your desired color
                                cursor: "pointer", // Optional: Pointer cursor for better UX
                            }}
                        />
                    </Badge>
                </span>
                <Button
                    icon={<LogoutOutlined />}
                    theme="dark"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Header>
            <Content
                style={{
                    padding: "5px 48px",
                    marginTop: "5px",
                }}
            >
                {/* <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
                {content}
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: "center",
                }}
            >
                Siddheswari Enterprise 2022 Created by Harsha
            </Footer>
        </Layout>
    );
};

export default AppLayout;
