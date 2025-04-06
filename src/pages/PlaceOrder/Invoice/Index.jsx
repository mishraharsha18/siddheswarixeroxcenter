import { useEffect, useRef } from 'react';
// import logo from "../../../../../assets/icon.png";

const Invoice = ({ orderInfo, onInvoiceGenerated }) => {
    const hasPrinted = useRef(false); // Track if printing has occurred

    useEffect(() => {
        if (Object.keys(orderInfo).length > 0 && !hasPrinted.current) {
            hasPrinted.current = true; // Mark as printed
            handleGeneratePDF();
        }
    }, [orderInfo]);

    const handleGeneratePDF = () => {
        const printWindow = window.open("", "_blank");
        const printContent = document.querySelector(".invoice-container");

        if (printWindow && printContent) {
            printWindow.document.write(`
            <html>
                <head>
                    <title>Invoice</title>
                    <style>
                        body {
                            margin: 0;
                            padding: 0;
                            background: white;
                        }
                        .invoice-container {
                            width: 210mm;
                            margin: 0 auto;
                        }
                        @media print {
                            @page {
                                size: A4;
                                margin: 14mm;
                            }
                        }
                    </style>
                </head>
                <body>
                    ${printContent.outerHTML}
                    <script>
                        window.onload = function() {
                            window.print();
                            window.onafterprint = function() {
                                window.close();
                                window.opener.postMessage("invoice-printed", "*"); // Notify parent window
                            };
                        };
                    </script>
                </body>
            </html>
        `);
            printWindow.document.close();
        }
    };

    useEffect(() => {
        const handleInvoicePrinted = (event) => {
            if (event.data === "invoice-printed") {
                hasPrinted.current = false; // Reset the flag for subsequent prints
                onInvoiceGenerated(); // Notify parent component
            }
        };

        window.addEventListener("message", handleInvoicePrinted);
        return () => window.removeEventListener("message", handleInvoicePrinted);
    }, [onInvoiceGenerated]);

    const styles = {
        container: {
            width: "97%",
            margin: "20px auto",
            border: "1px solid black",
            padding: "10px",
            fontFamily: "Arial, sans-serif",
            overflow: "auto",
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid black",
            paddingBottom: "10px",
        },
        table: {
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
        },
        th: {
            border: "1px solid black",
            padding: "8px",
            textAlign: "left",
            backgroundColor: "#f2f2f2",
        },
        td: {
            border: "1px solid black",
            padding: "8px",
            textAlign: "left",
        },
    };

    return (
        <div className="invoice-container">
            <div style={styles.container}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {/* <img src={logo} alt="AP logo" style={{ aspectRatio: '1/1', width: '50px' }} /> */}
                </div>
                <div style={styles.header}>
                    <div style={{ maxWidth: "60%" }}>
                        <p><strong>Invoice To: Harsha</strong></p>
                        <p>
                            <strong>Address:</strong> {orderInfo?.address?.flat_building_name + " " + orderInfo?.address?.area_sector_locality}
                        </p>
                        <p><strong>Pincode:</strong> {orderInfo?.address?.pincode}</p>
                    </div>
                    <div>
                        <p><strong>Order Id:</strong> {orderInfo?.order_code}</p>
                        <p><strong>Invoice Date:</strong> {new Date(orderInfo?.order_date).toLocaleDateString()}</p>
                        <p><strong>Payment Method:</strong> {orderInfo?.payment_method}</p>
                    </div>
                </div>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Sl. No</th>
                            <th style={styles.th}>Name</th>
                            <th style={styles.th}>Price</th>
                            <th style={styles.th}>Qty</th>
                            <th style={styles.th}>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderInfo?.order_items?.map((item, index) => (
                            <tr key={index}>
                                <td style={styles.td}>{index + 1}</td>
                                <td style={styles.td}>{item?.name}</td>
                                <td style={styles.td}>₹ {item?.price}</td>
                                <td style={styles.td}>{item?.quantity}</td>
                                <td style={styles.td}>₹ {item?.price}</td>
                            </tr>
                        ))}
                        <tr>
                            <td style={{ ...styles.td, textAlign: 'right', fontWeight: '700' }} colSpan={4}>Grand Total</td>
                            <td style={{ ...styles.td, textAlign: 'right', fontWeight: '500' }}>₹ {orderInfo?.total_amount}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Invoice;