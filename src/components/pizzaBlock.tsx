import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addItem} from "../redux/slices/cartSlice.ts";
import {selectorCartById} from "../redux/slices/pizzaSlice.ts";
import {Link} from "react-router-dom";

type cartItemType = {
  id: number;
  title: string;
  price: number;
  image: string;
  sizes: number[];
  types: number[];
}
export default function PizzaBlock({id, title, price, image, sizes, types}: cartItemType) {
  const dispatch = useDispatch();
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  //@ts-ignore
  const cartItem = useSelector(selectorCartById(id));
  const [cout, setCout] = useState(0);
  const typenames = ["нормальная", "made in italy"];
  const addedCount = cartItem ? cartItem.count : 0;
  const onClickenAdd = () => {
    const item = {
      id,
      title,
      price,
      image,
      types: activeType,
      sizes: activeSize,
    };
    console.log(item)
    dispatch(addItem(item));
  };
  useEffect(() => {
    console.log(cartItem)
  }, [addedCount])

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`} >
        <img style={{width: "250px",height: "250px"}} className="pizza-block__image" src={image} alt="Pizza"/>
        </Link>
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type) => (
              <li
                key={type}
                onClick={() => setActiveType(type)}
                className={activeType === type ? "active" : ""}
              >
                {typenames[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={size}
                onClick={() => setActiveSize(index)}
                className={activeSize === index ? "active" : ""}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            onClick={onClickenAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
}
