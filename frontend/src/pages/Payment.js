import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-toastify";
import axios from "axios";

import { useCard } from "../context/cardContext";
import { useAuth } from "../context/auth";

const base = process.env.REACT_APP_BASE_URL;
const Payment = () => {
  const navigate = useNavigate();
  const { auth, temp } = useAuth();
  const { card, setCard } = useCard();
  const [clientToken, setclientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState("");

  //get payment token
  const getPaymentToken = async () => {
    try {
      const { data } = await axios.get(
        `${base}/api/v1/product/braintree/token`
      );
      setclientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPaymentToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${base}/api/v1/product/braintree/payment`,
        { nonce, card }
      );
      setLoading(false);
      toast.success("payment done successfully");
      navigate("/dashboard/user/order");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div>
      <div className="col-md-4 text-center payment-form">
        <p>Total Amount :- $ {temp?.price}</p>
        {auth?.user?.address ? (
          <>
            <div>
              <h6>Current Address :- {auth?.user?.address}</h6>
              <button
                className="btn btn-warning my-3"
                onClick={() => navigate("/dashboard/user/profile")}
              >
                Update Address
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              className="btn btn-warning"
              onClick={() => {
                navigate("/login", {
                  state: "/card",
                });
              }}
            >
              Please Login to checkout
            </button>
          </>
        )}
        <div className="mt-2">
          {!clientToken || !card?.length ? (
            ""
          ) : (
            <>
              <DropIn
                options={{
                  authorization: clientToken,
                  paypal: {
                    flow: "vault",
                  },
                }}
                onInstance={(instance) => setInstance(instance)}
              />
              <button
                className="btn btn-primary"
                onClick={handlePayment}
                disabled={loading || !instance || !auth?.user?.address}
              >
                {loading ? "processing ..." : "Make Payment"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
