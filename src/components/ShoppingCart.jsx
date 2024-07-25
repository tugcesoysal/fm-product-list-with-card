/* eslint-disable react/prop-types */

const ShoppingCart = ({
  shoppingCart,
  setShoppingCart,
  setModalIsOpen,
  totalOrder,
}) => {
  const removeProduct = (productName) => {
    setShoppingCart((prev) => {
      const updatedCart = prev.filter(
        (item) => item.product.name !== productName,
      );
      return updatedCart;
    });
  };

  return (
    <div className="shopping-cart">
      <h1 className="shopping-cart__header">
        Your Cart ({shoppingCart.length})
      </h1>
      <div className="shopping-cart__cart">
        {shoppingCart.length === 0 ? (
          <>
            <img
              src="./assets/images/illustration-empty-cart.svg"
              alt="empty cart illustration"
              className="empty-img"
            />
            <p>Your added items will appear here</p>{" "}
          </>
        ) : (
          <>
            <div className="cart__list">
              {shoppingCart.map((item, index) => (
                <div key={index} className="cart__product">
                  <div className="cart__product-info">
                    {" "}
                    <p className="cart__product-name">{item.product.name}</p>
                    <div className="cart__product-details">
                      {" "}
                      <p className="cart__product-count">{item.count}x</p>
                      <p className="cart__product-price">
                        @ ${item.product.price.toFixed(2)}
                      </p>
                      <p className="cart__product-totalPrice">
                        ${(item.count * item.product.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <img
                    onClick={() => removeProduct(item.product.name)}
                    src="./assets/images/icon-remove-item.svg"
                    alt="remove product icon"
                    className="remove-icon"
                  />
                </div>
              ))}
            </div>
            <div className="cart__order-total">
              <p className="total">Order Total</p>
              <p className="price">${totalOrder.toFixed(2)}</p>
            </div>
            <div className="cart__delivery-info">
              <img
                src="./assets/images/icon-carbon-neutral.svg"
                className="carbon-neutral-icon"
                alt="carbon-neutral-icon"
              />
              <p className="delivery-info">
                This is a <span>carbon-neutral</span> delivery
              </p>
            </div>
            <button
              onClick={() => setModalIsOpen(true)}
              className="cart__confirm-btn"
            >
              Confirm Order
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
