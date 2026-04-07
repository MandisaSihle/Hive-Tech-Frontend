import React from 'react';
import { useDispatch } from 'react-redux';
import { addCart, removeCart, updateCart } from '../../reduxs/cart/operations';

export default function ProductCard(props) {
  const { id, name, description, price, image } = props.product;

  let quantity = props.cart ? props.cart.quantity : 0;
  const cartId = props.cart ? props.cart.id : 0;

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addCart({ quantity: 1, product: id }));
  };

  const increaseCart = () => {
    dispatch(updateCart({ quantity: quantity + 1, cartId }));
  };

  const decreaseCart = () => {
    if (quantity <= 0) {
      dispatch(removeCart(cartId));
    } else {
      dispatch(updateCart({ quantity: quantity - 1, cartId }));
    }
  };

  return (
    <div className="product-card">
      <img className="product-image" src={image} alt="product" />

      <div className="product-content">
        <p className="product-title">{name}</p>
        <p className="product-description">{description}</p>

        <div className="price-content">
          <p className="product-price">${price}</p>

          {quantity > 0 ? (
            <div className="added-cart">
              <span onClick={decreaseCart}>-</span>
              <span className="margin-top-4">{quantity}</span>
              <span onClick={increaseCart} className="margin-top-4">
                +
              </span>
            </div>
          ) : (
            <button onClick={addToCart} className="add-cart-btn">
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}