import {cartSliseState} from "../redux/slices/cartSlice"

export const calTotalPrice = (items: cartSliseState[]) => {
  return items.reduce(
    (sum, obj) => obj.price * obj.count + sum,
    0
  );
}