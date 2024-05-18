import {calTotalPrice} from "./calTotalPrice.ts";

export const getCartFromLocalStorage = ()=>{
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calTotalPrice(items);
  if(items.length){
    return{items,totalPrice}
  }
  return data ? JSON.parse(data): [];
}