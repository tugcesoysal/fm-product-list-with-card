/* eslint-disable react/prop-types */

const Modal = ({ shoppingCart, totalOrder, startNewOrder }) => {
  return (
    <div className="modal">
      <img
        src="./assets/images/icon-order-confirmed.svg"
        alt="confirm icon"
        className="confirm-icon"
      />
      <h1 className="modal__header">Order Confirmed</h1>
      <p className="modal__parag">We hope you enjoy your food!</p>
      <div className="modal__shopping-cart">
        {shoppingCart.map((item, index) => (
          <div key={index} className="cart__product">
            <img
              src={item.product.image.thumbnail}
              alt="product thumbnail"
              className="modal__thumbnail"
            />
            <div className="cart__product-info">
              {" "}
              <p className="cart__product-name">{item.product.name}</p>
              <div className="cart__product-details">
                {" "}
                <p className="cart__product-count">{item.count}x</p>
                <p className="cart__product-price">
                  @ ${item.product.price.toFixed(2)}
                </p>
              </div>
            </div>
            <p className="cart__product-totalPrice">
              ${(item.count * item.product.price).toFixed(2)}
            </p>
          </div>
        ))}

        <div className="cart__order-total">
          <p className="total">Order Total</p>
          <p className="price">${totalOrder.toFixed(2)}</p>
        </div>
      </div>
      <button onClick={() => startNewOrder()} className="newOrder-btn">
        Start New Order
      </button>
    </div>
  );
};

export default Modal;
