/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
const ProductCard = ({
  product,
  setShoppingCart,
  shoppingCart,
  orderConfirmed,
  setOrderConfirmed,
}) => {
  const { image, name, category, price } = product;
  const [imageSrc, setImageSrc] = useState("");
  const [activeButton, setActiveButton] = useState(false);
  const [count, setCount] = useState(0);

  const updateImageSrc = () => {
    if (window.innerWidth > 1000) {
      setImageSrc(image.desktop);
    } else if (window.innerWidth > 450) {
      setImageSrc(image.tablet);
    } else {
      setImageSrc(image.mobile);
    }
  };

  useEffect(() => {
    if (!shoppingCart) {
      setActiveButton(false);
      setCount(0);
    }
    if (orderConfirmed) {
      setActiveButton(false);
      setCount(0);
      setOrderConfirmed(false);
    }
  }, [shoppingCart, orderConfirmed, setOrderConfirmed]);

  useEffect(() => {
    updateImageSrc();
    window.addEventListener("resize", updateImageSrc);
    return () => {
      window.removeEventListener("resize", updateImageSrc);
    };
  });

  const handleActiveButton = () => {
    setCount(1);
    setActiveButton(true);
    setShoppingCart((prev) => {
      const updatedCart = [...prev];
      updatedCart.push({ product, count: 1 });
      return updatedCart;
    });
  };

  const increment = () => {
    setCount((prev) => prev + 1);
    setShoppingCart((prev) => {
      const updatedCart = [...prev];
      const cartItemIndex = updatedCart.findIndex(
        (item) => item.product.name === product.name,
      );
      updatedCart[cartItemIndex].count += 1;
      return updatedCart;
    });
  };

  const decrement = () => {
    if (count === 0) return;
    setCount((prev) => prev - 1);
    setShoppingCart((prev) => {
      const updatedCart = [...prev];
      const cartItemIndex = updatedCart.findIndex(
        (item) => item.product.name === product.name,
      );
      if (cartItemIndex !== -1 && updatedCart[cartItemIndex].count > 0) {
        updatedCart[cartItemIndex].count -= 1;
        if (updatedCart[cartItemIndex].count === 0) {
          updatedCart.splice(cartItemIndex, 1);
          setActiveButton(false);
        }
      }
      return updatedCart;
    });
  };

  return (
    <div className="product-card">
      <div className="product-card__image">
        <img
          src={imageSrc}
          alt={`${name} thumbnail`}
          className={`product-card__img ${activeButton ? "active-card" : ""}`}
        />
        {activeButton ? (
          <button className="atc-btn-active">
            <img
              src="./assets/images/icon-decrement-quantity.svg"
              className="decrement-icon"
              onClick={decrement}
            />
            {count}
            <img
              src="./assets/images/icon-increment-quantity.svg"
              className="increment-icon"
              onClick={increment}
            />
          </button>
        ) : (
          <button onClick={handleActiveButton} className="atc-btn">
            <img
              src="/assets/images/icon-add-to-cart.svg"
              alt="add to cart button icon"
              className="atc-icon"
            />
            Add to Cart
          </button>
        )}
      </div>
      <div className="product-card__info">
        <p className="category">{category}</p>
        <p className="name">{name}</p>
        <p className="price">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
