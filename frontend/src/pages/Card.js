import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-toastify";
import axios from "axios";

import { useCard } from "../context/cardContext";
import { useAuth } from "../context/auth";

const base = process.env.REACT_APP_BASE_URL;

const Card = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
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

  const totalPrice = () => {
    try {
      let total = 0;
      card?.map((item) => {
        total += item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${base}/api/v1/product/braintree/payment`,
        {
          nonce,
          card,
        }
      );
      setLoading(false);
      localStorage.removeItem("card");
      setCard([]);
      toast.success("payment done successfully");
      navigate("/dashboard/user/order");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const removeCardItem = (id) => {
    try {
      let myCard = [...card];
      let index = myCard.findIndex((item) => item._id === id);

      console.log(myCard);
      myCard.splice(index, 1);
      console.log(myCard);
      setCard(myCard);
      localStorage.setItem("card", JSON.stringify(myCard));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center bg-light p-2">
            {`Hello ${auth?.token && auth?.user?.name}`}
          </h3>
          <h3 className="text-center">
            {card?.length > 0
              ? `You have ${card.length} items in your cart ${
                  auth.token ? "" : "please login to checkout"
                }`
              : "Your cart is empty"}
          </h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          {card.map((c) => {
            return (
              <div className="row" key={c._id}>
                <div className="col-md-4">
                  <img
                    src={`${base}/api/v1/product/product-photo/${c._id}`}
                    alt={c.name}
                    className="card-img-top"
                    width="100px"
                  />
                </div>
                <div className="col-md-8">
                  <p>{c.name}</p>
                  <p>{c.description}</p>
                  <p>Price : {c.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCardItem(c._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-md-4">
          <h4>card Summary</h4>
          <p>Total : {totalPrice()}</p>
          {auth?.user?.address ? (
            <>
              <div className="mb-3">
                <h6>Current Address</h6>
                <h6>{auth?.user?.address}</h6>
                <button
                  className="btn btn-warning"
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
                  {loading ? "processing .." : "Make Payment"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
