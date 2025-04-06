import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../../../common/request";
import loginImage from "../../assets/login.jpg";

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (values) => {
        try {
            setLoading(true);
            console.log(values);

            // Check if the provided credentials match the hardcoded ones
            if (values.email === "harsha@mailinator.com" && values.password === "1234") {
                const response = {
                    user: {
                        token: "121212121212",
                    },
                };
                const { user } = response;
                console.log(user.token, response);

                // Store the token in localStorage
                localStorage.setItem("authToken", user.token);

                // Redirect to the home page after login
                message.success("Login successful!");
                navigate("/home");
            } else {
                throw new Error("Incorrect email or password");
            }
        } catch (error) {
            console.error("Login Error:", error.message);
            message.error(error.message || "Login failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex items-center justify-center">
                <img src={loginImage} alt="Login Image" className="w-1/2" />
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
                        Admin Login
                    </h2>
                    <Form layout="vertical" onFinish={handleLogin}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email!",
                                },
                                {
                                    type: "email",
                                    message: "Please enter a valid email!",
                                },
                            ]}
                        >
                            <Input placeholder="Enter your email" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input.Password placeholder="Enter your password" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                className="h-10 mt-2"
                                type="primary"
                                htmlType="submit"
                                block
                                loading={loading}
                            >
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
