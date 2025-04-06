import React, { useEffect, useState } from "react";
import { Input, Button, Tabs, Card, Badge, Avatar, Divider, Row, Col, Modal, Table, Form } from "antd";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
  TagsFilled,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { BsTicketPerforatedFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Invoice from "./Invoice/Index.jsx"

const PlaceOrder = () => {
  const navigate = useNavigate(); // Initialize navigation
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [form] = Form.useForm(); // Form instance
  const [products, setProducts] = useState([]); // List of added products
  const [cartCount, setCartCount] = useState(0); // Cart count state
  const [totalAmount, setTotalAmount] = useState(0); // Total amount state
  const [totalItems, setTotalItems] = useState(0); // Total items state
  const [totalQuantity, setTotalQuantity] = useState(0); // Total amount state
  const [totalTax, setTotalTax] = useState(0); // Total tax state
  const [showInvoice, setShowInvoice] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false); // Add a flag to track download state
  const [totalDiscount, setTotalDiscount] = useState(0); // Add totalDiscount state

  

  useEffect(() => {
    calculateTotalAmount();
  }, [products]);
  
  // Open modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  const clearAll = () => {
    setProducts([]);
    setCartCount(0);
  };

  // Close modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Add product to the list
  const onFinish = (values) => {
    const discount = values.discount || 0; // Default discount to 0 if not provided
    const discountedPrice = values.price - (values.price * discount / 100); // Calculate discounted price
    const subtotal = discountedPrice * values.quantity; // Calculate subtotal based on quantity

    const newProduct = {
        key: products.length + 1,
        name: values.productName,
        quantity: values.quantity,
        mrp: values.price, // Store original MRP
        discount, // Store discount percentage
        subtotal, // Store calculated subtotal
    };

    setProducts([...products, newProduct]); // Add new product to the list
    setCartCount(products.length + 1); // Update cart count
    form.resetFields(); // Clear form fields
};

  // Delete product from the list
  const handleDelete = (key) => {
    const updatedProducts = products.filter((product) => product.key !== key);
    setProducts(updatedProducts);
    setCartCount(updatedProducts.length); // Update cart count
  };

  // Navigate to cart page with product data
  const goToCart = () => {
    navigate("/order/place-order/cart", { state: { products } });
  };

  const calculateTotalAmount = () => {
    const totalAmount = products.reduce((acc, product) => acc + product.subtotal, 0); // Use subtotal for total amount
    const totalQuantity = products.reduce((acc, product) => acc + Number(product.quantity), 0);
    const totalItems = products.length;
    const totalDiscount = products.reduce(
      (acc, product) => acc + (product.mrp * product.quantity * product.discount) / 100,
      0
    ); // Calculate total discount
    const totalTax = totalAmount * 0.16;

    setTotalAmount(totalAmount);
    setTotalQuantity(totalQuantity);
    setTotalItems(totalItems);
    setTotalDiscount(totalDiscount); // Update totalDiscount state
    setTotalTax(totalTax);
  }

  const invoiceData = {
    invoiceNumber: "INV-1001",
    date: new Date().toLocaleDateString(),
  };

  const orderInfo = {
        "order_code": "ORD785641",
        "order_status": "Confirmed",
        "order_date": "2025-02-24T05:39:38.000Z",
        "subtotal": "1190.00",
        "delivery_charge": "0.00",
        "handling_charge": "5.00",
        "high_demand_charge": "0.00",
        "total_amount": "1195.00",
        "payment_method": "",
        "address_id": "0252be8f-743f-4749-a1d0-8532dd6356e3",
        "payment_status": "Charged",
        "expected_delivery_time": null,
        "address": {
            "flat_building_name": "B-1",
            "area_sector_locality": "HCFM+XWP, DP Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091, India",
            "floor": "",
            "pincode": "700091"
        },
        "order_items": [
            {
                "product_id": "3eac0af3-41ea-49b3-ad0e-e0327dd1248a",
                "name": "Linc Glacier Ball Pen",
                "stock_id": null,
                "price": "230.00",
                "quantity": 1,
                "item_subtotal": "230.00"
            },
            {
                "product_id": "05998c1b-d34d-418a-b42b-6f53c7574ef2",
                "name": "Cello Finegrip Ball Pen",
                "stock_id": "ef7646f1-ae61-4b79-8389-e7b947bd4b8f",
                "price": "170.00",
                "quantity": 3,
                "item_subtotal": "510.00"
            },
            {
                "product_id": "3eac0af3-41ea-49b3-ad0e-e0327dd1248a",
                "name": "Flair Writo Meter Ball Pen",
                "stock_id": null,
                "price": "450.00",
                "quantity": 1,
                "item_subtotal": "450.00"
            }
        ]
      }

  const downloadInvoice = async () => {
    if (isDownloading) return; // Prevent multiple executions
    setIsDownloading(true); // Set the flag to true

    try {
        console.log("Downloading invoice...");
        setShowInvoice(false); // Ensure the component is unmounted
        setTimeout(() => {
            setShowInvoice(true); // Re-mount the component
        }, 100); // Add a small delay to ensure unmounting
    } finally {
        setIsDownloading(false); // Reset the flag after execution
    }
};

const handleInvoiceGenerated = () => {
    setShowInvoice(false); // Reset the invoice rendering state
};

  const OrderSummary = () => (
    <Card className="border border-gray-300 rounded-lg bg-gray-50 shadow-md p-3 flex flex-col">
      {/* Customer Info */}
      <div className="flex justify-between items-center bg-blue-50 border border-gray-200 mt-2 p-3 rounded-md shadow-sm">
        <div className="flex items-center space-x-3">
          <Avatar size={40} style={{ backgroundColor: "#ECFFA6", color: "#FE9D82", border: "1px solid rgb(83, 82, 77)" }} className="bg-yellow-200 text-green-700 font-bold">
            WC
          </Avatar>
          <div className="flex flex-col ml-4">
            <p className="text-sm font-semibold text-gray-800">Walkin Customer</p>
            <p className="text-xs text-gray-500">Phone: 0700000100</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button type="text" icon={<EditOutlined />} className="text-gray-600 hover:text-blue-500" />
          <Button type="text" danger icon={<DeleteOutlined />} />
        </div>
      </div>
  
      {/* Discount Buttons */}
      <div className="flex flex-wrap gap-2 mt-2">
        <Button type="primary" danger className="flex-1 text-white" style={{ background: "linear-gradient(90deg, #E52D27 0%, #B31217 100%)" }}>
          <TagsFilled /> Saved Discount
        </Button>
        <Button type="primary" block style={{ background: "linear-gradient(90deg, #E7AF06 0%,rgb(233, 184, 37) 100%)" }}>
          <BsTicketPerforatedFill /> Custom Discount
        </Button>
      </div>
  
      {/* Order Summary Details */}
        <div className="bg-[#E8EDF8] px-4 py-2 mt-4">
          <table className="w-full mt-2">
            <tbody>
          <tr>
            <td>Total Items:</td>
            <td className="text-right font-medium">{totalItems}</td>
          </tr>
          <tr>
            <td>Total Quantity:</td>
            <td className="text-right font-medium">{totalQuantity}</td>
          </tr>
          <tr>
            <td>Total Discount:</td>
            <td className="text-right">₹ {totalDiscount.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Taxable Amount:</td>
            <td className="text-right">₹ {totalTax?.toFixed(2)}</td>
          </tr>
          <tr className="text-md font-bold text-gray-800">
            <td>TOTAL Amount :</td>
            <td className="text-right">₹ {totalAmount}</td>
          </tr>
            </tbody>
          </table>
        </div>
        
        <Divider />
        
        {/* Payment Method */}
      <h4 className="text-lg font-semibold text-gray-800">Payment Method</h4>
      <div className="flex flex-wrap gap-2 mt-2">
        {["💵 Pay Cash", "💳 Credit", "📱 Mobile", "💳 Credit Card", "💳 Debit Card", "🏦 Bank Transfer", "🔀 Split", "❓ Other"].map((text, index) => (
          <Button key={index} className="flex-1 bg-gray-300 text-center">
            <div>{text.split(" ")[0]}</div>
            <div>{text.split(" ")[1]}</div>
          </Button>
        ))}
      </div>
  
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
          className="mt-4"
          onClick={downloadInvoice}
        >
          GENERATE INVOICE
        </Button>
      </div>
    </Card>
  );
  const ProductGrid = () => {
    return (
      <Row gutter={[16, 16]} className="overflow-y-auto">
        {/* No predefined products */}
        <Col xs={24} className="text-center text-gray-500">
        <Table
            size="small"
            dataSource={products}
            columns={[
              {
                title: "Product Name",
                dataIndex: "name",
                key: "name",
              },
              {
                title: "MRP",
                dataIndex: "mrp",
                key: "mrp",
                render: (mrp) => `₹ ${Number(mrp).toFixed(2)}`, // Format MRP
              },
              {
                title: "Quantity",
                dataIndex: "quantity",
                key: "quantity",
              },
              {
                title: "Discount (%)",
                dataIndex: "discount",
                key: "discount",
                render: (discount) => `${discount}%`, // Format discount
              },
              {
                title: "Subtotal",
                dataIndex: "subtotal",
                key: "subtotal",
                render: (subtotal) => `₹ ${subtotal.toFixed(2)}`, // Format subtotal
              },
              {
                title: "Action",
                key: "action",
                render: (_, record) => (
                  <Button
                    type="link"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(record.key)}
                  >
                    Delete
                  </Button>
                ),
              },
            ]}
            pagination={false}
          />
        </Col>
      </Row>
    );
  };

  return (
    <div className="p-1 flex flex-col lg:flex-row flex-wrap gap-4">
      {/* LEFT SECTION - Product Search & Selection */}
      <div className="flex-1 flex flex-col gap-3">
        <p className="text-xl font-bold text-gray-500">Place An Order</p>

        {/* Header & Search Bar */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
          <Input
            placeholder="Search By Name/Sku/Barcode"
            prefix={<SearchOutlined className="text-gray-500" />}
            className="w-full md:w-96 border border-gray-300 rounded-lg"
          />
          <div className="flex items-center space-x-4">
            <div>
              <Badge count={cartCount}>
                <Button
                  icon={<ShoppingCartOutlined />}
                  className="border border-gray-300"
                  onClick={goToCart}
                />
              </Badge>
            </div>
            <div>
              <Badge count={0}>
                <Button icon={<HeartOutlined />} className="border border-gray-300" />
              </Badge>
            </div>
            <Button icon={<PlusOutlined/>} type="primary" className="w-24 md:w-auto" onClick={showModal}>
              Add Product
            </Button>
            <Button icon={<DeleteOutlined/>} type="primary" danger className="w-24 md:w-auto" onClick={clearAll}>
              Clear All
            </Button>
            
          </div>
        </div>
        {/* Product Grid */}
        <ProductGrid />,
      </div>

      {/* RIGHT SECTION - Order Summary & Payment */}
      <div className="w-full lg:w-1/3 flex flex-col">
        <OrderSummary />
        {showInvoice && <Invoice orderInfo={orderInfo} onInvoiceGenerated={handleInvoiceGenerated} />} {/* Pass callback */}
      </div>

        <Modal
        width={600}
          title="Add Product"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} onFinish={onFinish}>
            <Form.Item
          label="Product Name"
          name="productName"
          rules={[{ required: true, message: "Please enter product name!" }]}
            >
          <Input placeholder="Enter product name" />
            </Form.Item>
            <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Quantity"
              name="quantity"
              initialValue={1}
              rules={[{ required: true, message: "Please enter quantity!" }]}
            >
              <Input type="number" placeholder="Enter quantity" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please enter price!" }]}
            >
              <Input type="number" placeholder="Enter price" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Discount (%)"
              name="discount"
              initialValue={0}
              rules={[{ required: true, message: "Please enter discount!" }]}
            >
              <Input type="number" placeholder="Enter discount percentage" />
            </Form.Item>
          </Col>
            </Row>
            <Form.Item>
          <Button className="float-right" type="primary" htmlType="submit">
            Add Product
          </Button>
            </Form.Item>
          </Form>

          {/* Product Table */}
        <Table
          size="small"
          dataSource={products}
          columns={[
            {
              title: "Product Name",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "MRP",
              dataIndex: "mrp",
              key: "mrp",
              render: (mrp) => `₹ ${Number(mrp).toFixed(2)}`, // Format MRP
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              key: "quantity",
            },
            {
              title: "Discount (%)",
              dataIndex: "discount",
              key: "discount",
              render: (discount) => `${discount}%`, // Format discount
            },
            {
              title: "Subtotal",
              dataIndex: "subtotal",
              key: "subtotal",
              render: (subtotal) => `₹ ${subtotal.toFixed(2)}`, // Format subtotal
            },
            {
              title: "Action",
              key: "action",
              render: (_, record) => (
                <Button
                  type="link"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(record.key)}
                >
                  Delete
                </Button>
              ),
            },
          ]}
          pagination={false}
        />
      </Modal>

      {showInvoice && <Invoice orderInfo={orderInfo} />}
    </div>
  );
};

// 🛒 Product Grid Component
const ProductGrid = () => {
  return (
    <Row gutter={[16, 16]} className="overflow-y-auto">
      {/* No predefined products */}
      <Col xs={24} className="text-center text-gray-500">
      <Table
          size="small"
          dataSource={products}
          columns={[
            {
              title: "Product Name",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "MRP",
              dataIndex: "mrp",
              key: "mrp",
              render: (mrp) => `₹ ${mrp?.toFixed(2)}`, // Format MRP
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              key: "quantity",
            },
            {
              title: "Discount (%)",
              dataIndex: "discount",
              key: "discount",
              render: (discount) => `${discount}%`, // Format discount
            },
            {
              title: "Subtotal",
              dataIndex: "subtotal",
              key: "subtotal",
              render: (subtotal) => `₹ ${subtotal.toFixed(2)}`, // Format subtotal
            },
            {
              title: "Action",
              key: "action",
              render: (_, record) => (
                <Button
                  type="link"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(record.key)}
                >
                  Delete
                </Button>
              ),
            },
          ]}
          pagination={false}
        />
      </Col>
    </Row>
  );
};

// 📌 Order Summary Component (Right Section)
const OrderSummary = () => (
  <Card className="border border-gray-300 rounded-lg bg-gray-50 shadow-md p-3 flex flex-col">
    {/* Hold Order & Switch Order */}
    <div className="flex flex-wrap items-center justify-between border border-yellow-300 p-2 rounded-md">
      <select className="border border-gray-300 rounded-md p-1">
        <option>Switch Hold Order</option>
        <option>Order #12345</option>
        <option>Order #67890</option>
      </select>
      <Button type="primary" style={{ backgroundColor: "#17A0B6", border: "1px dashed rgb(186, 225, 231)" }} className="text-white">
        HOLD THIS ORDER
      </Button>
    </div>

    {/* Customer Info */}
    <div className="flex justify-between items-center bg-blue-50 border border-gray-200 mt-2 p-3 rounded-md shadow-sm">
      <div className="flex items-center space-x-3">
        <Avatar size={40} style={{ backgroundColor: "#ECFFA6", color: "#FE9D82", border: "1px solid rgb(83, 82, 77)" }} className="bg-yellow-200 text-green-700 font-bold">
          WC
        </Avatar>
        <div className="flex flex-col ml-4">
          <p className="text-sm font-semibold text-gray-800">Walkin Customer</p>
          <p className="text-xs text-gray-500">Phone: 0700000100</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button type="text" icon={<EditOutlined />} className="text-gray-600 hover:text-blue-500" />
        <Button type="text" danger icon={<DeleteOutlined />} />
      </div>
    </div>

    {/* Discount Buttons */}
    <div className="flex flex-wrap gap-2 mt-2">
      <Button type="primary" danger className="flex-1 text-white" style={{ background: "linear-gradient(90deg, #E52D27 0%, #B31217 100%)" }}>
        <TagsFilled /> Saved Discount
      </Button>
      <Button type="primary" block style={{ background: "linear-gradient(90deg, #E7AF06 0%,rgb(233, 184, 37) 100%)" }}>
        <BsTicketPerforatedFill /> Custom Discount
      </Button>
    </div>

      <Divider />

      {/* Payment Method */}
    <h4 className="text-lg font-semibold text-gray-800">Payment Method</h4>
    <div className="flex flex-wrap gap-2 mt-2">
      {["💵 Pay Cash", "💳 Credit", "📱 Mobile", "💳 Credit Card", "💳 Debit Card", "🏦 Bank Transfer", "🔀 Split", "❓ Other"].map((text, index) => (
        <Button key={index} className="flex-1 bg-gray-300 text-center">
          <div>{text.split(" ")[0]}</div>
          <div>{text.split(" ")[1]}</div>
        </Button>
      ))}
    </div>

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
        className="mt-4"
      >
        PLACE ORDER
      </Button>
    </div>
  </Card>
);

export default PlaceOrder;