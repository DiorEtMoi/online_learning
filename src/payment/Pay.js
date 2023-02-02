import React from "react";
import "./style.scss";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Pay = ({ setPayment, setCanLearn }) => {
    const initialOptions = {
        "client-id":
            "AQVdNJ2adELwM1B1LTHKG8rcc-MKrGUU9g4SLcy3SYuAyYukSyCU7BFEZz7ix0nIaFksX0AeZrWkR8-h",
        currency: "USD",
        intent: "capture",
    };

    const handleApprove = () => {
        setCanLearn(true);
        setPayment(false);
        toast.success("Cảm ơn bạn đã đăng ký khóa học.");
    };

    const navigate = useNavigate();
    return (
        <div className="payment">
            <div className="payment_container">
                <div title="Đóng cổng thanh toán" className="payment_close">
                    <i
                        onClick={() => {
                            setPayment(false);
                        }}
                        className="fa-regular fa-circle-xmark"
                    ></i>
                </div>
                <PayPalScriptProvider options={initialOptions}>
                    <PayPalButtons
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        description: "Oki for looking good",
                                        amount: {
                                            value: "0.1",
                                        },
                                    },
                                ],
                            });
                        }}
                        onApprove={async (data, actions) => {
                            const order = await actions.order.capture();
                            handleApprove();
                        }}
                        onCancel={() => {
                            toast.error("Bạn đã cancel trả tiền khóa học.");
                        }}
                        onError={() => {
                            toast.error(
                                "Đã sảy ra lỗi trong quá trình trả tiền, vui lòng kiểm tra lại."
                            );
                        }}
                    />
                </PayPalScriptProvider>
            </div>
        </div>
    );
};

export default Pay;