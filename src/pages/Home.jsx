import Category from "../components/category";
import Sort from "../components/sort";
import PizzaBlock from "../components/pizzaBlock";
import Skeletone from "../components/skelletonPizzaBlock";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { createContext, useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { setCategoryId } from "../redux/slices/filterSlice";
export default function Home() {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortValue = useSelector((state) => state.filter.sort.sortProperty);
  const categoryIndex = categoryId;
  const dispatch = useDispatch();
  const { searches } = useContext(AppContext);
  const [piz, setPiz] = useState([]);
  const [image, setImage] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  console.log(categoryIndex, sortValue);
  const onClickedCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  console.log(categoryId);
  useEffect(() => {
    const order = sortValue.includes("-") ? "asc" : "desc";
    const sortBy = sortValue.replace("-", "");

    setImage(true);
    fetch(
      `https://65d62ccdf6967ba8e3bda424.mockapi.io/pizzes?page=${currentPage}&limit=4&${
        categoryIndex > 0 ? `category=${categoryIndex}` : ``
      }&sortBy=${sortBy}&order=${order}${searches ? `&search=${searches}` : ``}`
    )
      .then((response) => {
        return response.json();
      })
      .then((arr) => {
        setPiz(arr);
        setImage(false);
      });
    window.scrollTo(0, 0);
  }, [categoryIndex, sortValue, searches, currentPage]);
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Category
            value={categoryIndex}
            onClickOnCategory={onClickedCategory}
          />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {image
            ? [...new Array(13)].map((_, index) => <Skeletone key={index} />)
            : piz
                // .filter((pizza) => {
                //   if (
                //     pizza.title.toLowerCase().includes(searches.toLowerCase())
                //   ) {
                //     return true;
                //   }
                //   return false;
                // })
                .map((pizza) => (
                  <PizzaBlock
                    key={pizza.id}
                    title={pizza.title}
                    price={pizza.price}
                    image={pizza.imageUrl}
                    sizes={pizza.sizes}
                    types={pizza.types}
                  >
                    {console.log(pizza.imageUrl)}
                  </PizzaBlock>
                ))}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={(event) => setCurrentPage(event.selected + 1)}
          pageRangeDisplayed={4}
          pageCount={3}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}
