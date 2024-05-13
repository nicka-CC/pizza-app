import Category from "../components/category";
import Sort, { list, sortlist } from "../components/sort";
import qs from "qs";
import PizzaBlock from "../components/pizzaBlock";
import axios from "axios";
import Skeletone from "../components/skelletonPizzaBlock";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import {
  setCategoryId,
  setPageCount,
  setFilters,
} from "../redux/slices/filterSlice";
export default function Home() {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortVal = useSelector((state) => state.filter.sort.sortProperty);
  const isSearch = useRef(true);
  const isMounted = useRef(true);
  const pageCount = useSelector((state) => state.filter.pageCount);
  const categoryIndex = categoryId;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searches } = useContext(AppContext);
  const [piz, setPiz] = useState([]);
  const [image, setImage] = useState(true);

  const onClickedCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      console.log(params);
      const sort = sortlist.find(
        (obj) => obj.sortProperty === params.sortValue
      );
      console.log(sort);
      dispatch(setFilters({ ...params, sort }));
    }
    isSearch.current = true;
  }, []);
  const ax = () => {
    const order = sortVal.includes("-") ? "asc" : "desc";
    const sortBy = sortVal.replace("-", "");

    setImage(true);

    axios
      .get(
        `https://65d62ccdf6967ba8e3bda424.mockapi.io/pizzes?page=${pageCount}&limit=4&${
          categoryIndex > 0 ? `category=${categoryIndex}` : ``
        }&sortBy=${sortBy}&order=${order}${
          searches ? `&search=${searches}` : ``
        }`
      )
      .then((res) => {
        setPiz(res.data);
        setImage(false);
      });
  };
  useEffect(() => {
    if (isSearch.current) {
      ax();
      window.scrollTo(0, 0);
    }
    isSearch.current = true;
  }, [categoryIndex, sortVal, searches, pageCount]);

  useEffect(() => {
    if (!isMounted.current) {
      const queryString = qs.stringify({
        sortValue: sortVal,
        categoryId,
        pageCount,
      });
      navigate(`?${queryString}`);
      console.log(queryString);
    }
    isMounted.current = false;
  }, [categoryId, sortVal, searches, pageCount]);
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
                    id={pizza.id}
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
          nextLabel=">"
          previousLabel="<"
          onPageChange={(event) => {
            console.log("selected", event.selected);
            dispatch(setPageCount(event.selected + 1));
          }}
          pageRangeDisplayed={4}
          pageCount={3}
          forcePage={pageCount}
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}
