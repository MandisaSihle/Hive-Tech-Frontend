import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Empty from "../components/default/Empty";
import Footer from "../components/default/Footer";
import Header from "../components/default/Header";
import OrderListCard from "../components/order/orderListCard";
import { clearCarts, fetchCarts } from "../reduxs/cart/operations";
import { getCarts } from "../reduxs/cart/selectors";
import { checkoutOrderAction } from "../reduxs/order/actions";
import { getOrders } from "../reduxs/order/selectors";
import { getUser } from "../reduxs/users/selectors";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  const user = useSelector(getUser);
  const orders = useSelector(getOrders);
  const carts = useSelector(getCarts);
  
  const errors = orders ? orders.errors : {};
  const [isLoading, setIsLoading] = useState(false);

  
  const isEmpty =
    carts && carts.results && carts.results.length > 0 ? false : true;

  useEffect(() => {
    dispatch(fetchCarts());
  }, [dispatch]);

  const order_items = (carts.results || []).map((cart) => ({
    qty: cart.quantity,
    product: cart.product.id,
  }));

  const initialValues = {
    customer_name: user ? user.name : "",
    customer_phone: "",
    address: "",
    pin_code: "",
    building_type: "",
    city: "",
    state: "",
  };

  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const onSubmitCheckout = () => {
    setIsLoading(true);

    dispatch(
      checkoutOrderAction({
        ...values,
        total_price: carts.totalPrice,
        total_qty: carts.totalCartItems,
        order_items,
      })
    )
      .then(() => {
        navigate("/thank-you");
        dispatch(clearCarts());
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Header />

      {isEmpty ? (
        <Empty />
      ) : (
        <div className="checkout-container">
          <h2>Checkout</h2>

          <form>
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={values.address}
              onChange={handleInputChange}
              placeholder="Enter Street address or P.O. Box"
              className="custom-input"
            />
            {errors && errors.address && (
              <span className="error-text">{errors.address[0]}</span>
            )}

            <label>Pin Code</label>
            <input
              type="text"
              name="pin_code"
              value={values.pin_code}
              onChange={handleInputChange}
              placeholder="Enter Pin Code"
              className="custom-input"
            />
            {errors && errors.pin_code && (
              <span className="error-text">{errors.pin_code[0]}</span>
            )}

            <label>Building Type</label>
            <input
              type="text"
              name="building_type"
              value={values.building_type}
              onChange={handleInputChange}
              placeholder="Apt, suite, unit, building, floor, etc."
              className="custom-input"
            />
            {errors && errors.building_type && (
              <span className="error-text">
                {errors.building_type[0]}
              </span>
            )}

            <label>City</label>
            <input
              type="text"
              name="city"
              value={values.city}
              onChange={handleInputChange}
              placeholder="Enter city"
              className="custom-input"
            />

            <label>State</label>
            <input
              type="text"
              name="state"
              value={values.state}
              onChange={handleInputChange}
              placeholder="Enter state"
              className="custom-input"
            />
          </form>

          <div className="order-items">
            {(carts.results || []).map((cart) => (
              <OrderListCard key={cart.id} cart={cart} />
            ))}
          </div>

          <button 
            onClick={onSubmitCheckout} 
            disabled={isLoading} 
            className="custom-btn"
          >
            {isLoading ? "Processing..." : "Place Order"}
          </button>
        </div>
      )}

      <Footer />
    </>
  );
}