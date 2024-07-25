import { useState } from "react";
import ProductCard from "./components/ProductCard";
import products from "./components/products";
import ShoppingCart from "./components/ShoppingCart";
import Modal from "./components/Modal";

function App() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const totalOrder = shoppingCart.reduce((total, item) => {
    return total + item.product.price * item.count;
  }, 0);

  const startNewOrder = () => {
    setShoppingCart([]);
    setModalIsOpen(false);
    setOrderConfirmed(true);
  };

  return (
    <div className={`main-page ${modalIsOpen ? "layout" : ""}`}>
      {modalIsOpen ? (
        <Modal
          shoppingCart={shoppingCart}
          totalOrder={totalOrder}
          startNewOrder={startNewOrder}
        />
      ) : (
        ""
      )}
      <div className="product-list">
        <h1 className="product-list__header">Desserts</h1>
        <div className="list">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              shoppingCart={shoppingCart}
              setShoppingCart={setShoppingCart}
              orderConfirmed={orderConfirmed}
              setOrderConfirmed={setOrderConfirmed}
            />
          ))}
        </div>
      </div>
      <ShoppingCart
        setModalIsOpen={setModalIsOpen}
        shoppingCart={shoppingCart}
        setShoppingCart={setShoppingCart}
        totalOrder={totalOrder}
      />
    </div>
  );
}

export default App;
