import React from "react";
import { Input, Button, Tabs, Card, Badge, Avatar, Divider, Table } from "antd";
import {
    SearchOutlined,
    ShoppingCartOutlined,
    HeartOutlined,
    UserOutlined,
    TagsFilled,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { BsTicketPerforatedFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { TiArrowBackOutline } from "react-icons/ti";

const CartPage = () => {
    const navigate = useNavigate(); // Initialize navigation

    return (
        <div className="p-1 flex flex-col gap-4">
            <p className="text-xl font-bold text-gray-500">Place An Order</p>
            {/* LEFT SECTION - Product Search & Selection */}
            <div className="flex justify-space-between gap-4">
                <div className=" flex flex-col gap-3">
                    {/* Header & Search Bar */}
                    <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4">

                        <div className="flex items-center space-x-3">
                            <Button
                                type="primary"
                                className="w-24 md:w-auto hover:bg-red-400"
                                onClick={() => navigate('/order/place-order')}
                            >
                                Add Customer
                            </Button>
                            <Button type="primary" danger className="w-24 md:w-auto hover:bg-red-400">Shift End</Button>
                            <TiArrowBackOutline
                                className="bg-red-500 text-white p-2 rounded-sm text-4xl cursor-pointer hover:bg-red-400"
                                onClick={() => navigate('/order/place-order')}
                            />
                            <Button type="primary" className="hover:bg-red-400">Ascending</Button>
                            <div>
                                <Badge count={8}>
                                    <Button
                                        icon={<ShoppingCartOutlined />}
                                        className="border border-gray-300 hover:bg-red-400"
                                        onClick={() => navigate('/order/place-order/cart')}
                                    />
                                </Badge>
                            </div>
                            <div>
                                <Badge count={0}>
                                    <Button
                                        icon={<HeartOutlined />}
                                        className="border border-gray-300 hover:bg-red-400"
                                    />
                                </Badge>
                            </div>

                        </div>
                    </div>
                    <div className="flex items-center justify-start gap-2">
                        <Input
                            placeholder="Search By Name/Sku/Barcode"
                            prefix={<SearchOutlined className="text-gray-500" />}
                            className="w-full md:w-96 border border-gray-300 rounded-lg"
                        />
                    </div>
                </div>
                {/* Customer Info */}
                <div className="flex justify-between items-center bg-blue-50 border border-gray-200 px-8 rounded-md ">
                    {/* Left Side - Avatar & Customer Details */}
                    <div className="flex items-center space-x-3">
                        <Avatar size={40} style={{ backgroundColor: "#ECFFA6", color: "#FE9D82", border: "1px solid rgb(83, 82, 77)" }} className="bg-yellow-200 text-green-700 font-bold">
                            WC
                        </Avatar>
                        <div className="flex flex-col ml-4">
                            <p className="text-sm font-semibold text-gray-800">Walkin Customer</p>
                            <p className="text-xs text-gray-500">Phone: 0700000100</p>
                        </div>
                    </div>

                    {/* Right Side - Edit & Delete Buttons */}
                    <div className="flex items-center space-x-2">
                        <Button type="text" icon={<EditOutlined />} className="text-gray-600 hover:text-blue-500" />
                        <Button type="text" danger icon={<DeleteOutlined />} />
                    </div>
                </div>
                {/* Discount Info */}
                <div className="flex items-center justify-between gap-2">
                     {/* Discount Buttons */}
                     <div className="flex flex-col flex-wrap gap-2">
                        <Button type="primary" danger className="text-white" style={{ background: "linear-gradient(90deg, #E52D27 0%, #B31217 100%)" }}>
                            <TagsFilled /> Saved Discount
                        </Button>
                        <Button type="primary" style={{ background: "linear-gradient(90deg, #E7AF06 0%,rgb(233, 184, 37) 100%)" }} >
                            <BsTicketPerforatedFill /> Custom Discount
                        </Button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button type="primary" style={{ backgroundColor: "#17A0B6", border: "1px dashed rgb(186, 225, 231)" }} className="text-white">
                            HOLD THIS ORDER
                        </Button>
                        <select className="border border-gray-300 rounded-md p-1">Switch Hold Order
                            <option>Switch Hold Order</option>
                            <option>Order #12345</option>
                            <option>Order #67890</option>
                        </select>
                        
                    </div>
                </div>
            </div>
            <div>
                <ProductGrid />
            </div>

            {/* RIGHT SECTION - Order Summary & Payment */}
            <div className="w-full flex flex-col">
                <OrderSummary />
                <Card className="border border-gray-300 rounded-lg bg-gray-50 shadow-md p-3 flex flex-col"></Card>
            </div>
        </div>
    );
};

// 🛒 Product Grid Component
const ProductGrid = () => {
    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (src) => <Avatar shape="square" size={64} src={src} />,
        },
        {
            title: "Product Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "SKU",
            dataIndex: "sku",
            key: "sku",
            render: (sku) => <span className="text-red-500">{sku}</span>,
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price) => <span className="font-bold text-blue-600">Ksh {price}</span>,
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <div className="flex space-x-2">
                    <Button type="text" icon={<EditOutlined />} />
                    <Button type="text" danger icon={<DeleteOutlined />} />
                </div>
            ),
        },
    ];

    const data = [
        {
            key: "1",
            image: "https://picsum.photos/200/300",
            name: "Test Product 1",
            sku: "KU00000001",
            price: 102.0,
        },
        {
            key: "2",
            image: "https://picsum.photos/200/300?blur=2",
            name: "Test Product 2",
            sku: "KU00000002",
            price: 150.0,
        },
        {
            key: "3",
            image: "https://picsum.photos/200/300?grayscale",
            name: "Test Product 3",
            sku: "KU00000003",
            price: 180.0,
        },
    ];

    return <Table columns={columns} dataSource={data} pagination={false} />;
};

// 📌 Order Summary Component (Right Section)
const OrderSummary = () => (
    <Card className="border border-gray-300 rounded-lg bg-gray-50 shadow-md p-3 flex flex-col">

        {/* Order Summary Details */}
        <div className="bg-[#E8EDF8] px-4 py-2 mt-4 ">
            <table className="w-full mt-2">
                <tbody>
                    <tr>
                        <td>Total Items:</td>
                        <td className="text-right font-medium">1</td>
                    </tr>
                    <tr>
                        <td>Total Pieces:</td>
                        <td className="text-right font-medium">1</td>
                    </tr>
                    <tr>
                        <td>Discount:</td>
                        <td className="text-right">Ksh 0.00</td>
                    </tr>
                    <tr>
                        <td>Taxable Amount:</td>
                        <td className="text-right">Ksh 102.00</td>
                    </tr>
                    <tr>
                        <td>Tax:</td>
                        <td className="text-right">Ksh 0.00</td>
                    </tr>
                    <tr className="text-md font-bold text-gray-800">
                        <td>TOTAL AMOUNT:</td>
                        <td className="text-right">Ksh 102.00</td>
                    </tr>
                    <tr className="text-md font-bold text-red-600">
                        <td>AMOUNT DUE:</td>
                        <td className="text-right">Ksh 102.00</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <Divider />

        {/* Payment Method */}
        <h4 className="text-lg font-semibold text-gray-800">Payment Method</h4>
        <div className="flex flex-wrap gap-2 mt-2">
            {["💵 Pay Cash", "💳 Credit", "📱 Mobile", "💳 Credit Card", "💳 Debit Card", "🏦 Bank Transfer", "🔀 Split", "❓ Other"].map((text, index) => (
                <Button key={index} className="flex bg-gray-300 text-center">
                    <div>{text.split(" ")[0]}</div>
                    <div>{text.split(" ")[1]}</div>
                </Button>
            ))}

        {/* Place Order Button */}
        <div className="flex items-center justify-center">
            <Button
                type="primary"
                style={{
                    background: "#a8d9f7",
                    border: "0.4px solid #4b9eff",
                    boxShadow: "0px 0px 6px #5aa6ff",
                    borderRadius: "2px",
                    fontWeight: "800",
                    padding: "8px 17px",
                    color: "#292929",
                    fontSize: "14px",
                }}
            >
                PLACE ORDER
            </Button>
        </div>
        <div>
            <div className="text-md font-bold text-gray-800">
                <span>TOTAL AMOUNT:</span>
                <span className="text-right"> Ksh 102.00</span>
            </div>
            <div className="text-md font-bold text-red-600">
                <span>AMOUNT DUE:</span>
                <span className="text-right"> Ksh 102.00</span>
            </div>
        </div>
        </div>

    </Card>
);

export default CartPage;
