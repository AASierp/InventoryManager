import { useState } from "react";
import { postOrder } from "../api/ordersAPI";

function OrderForm({ refreshInventory }) {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleOrder = async (e) => {
    e.preventDefault();
    const order = {
      productId: Number(productId),
      quantity: Number(quantity),
    };
    try{
        await postOrder(order);
        refreshInventory();
    }catch(error){
        console.error(error);
        throw new Error("Order could not be placed.")
    }
  };
  

  return (

    <>
        <form onSubmit={handleOrder}>
            <input type="text" />
            <input type="text" />
            <button type="submit" />
        </form>
    </>

  );
}
