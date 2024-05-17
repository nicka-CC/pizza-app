import Category from "../components/category.tsx";
import Sort, {sortlist} from "../components/sort.tsx";
import qs from "qs";
import PizzaBlock from "../components/pizzaBlock.tsx";
import Skeletone from "../components/skelletonPizzaBlock.tsx";
import ReactPaginate from "react-paginate";
import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect, useRef, useState} from "react";
import {AppContext} from "../App.tsx";
import {Link, useNavigate} from "react-router-dom";
import {setCategoryId, setFilters, setPageCount,} from "../redux/slices/filterSlice";
import {fetchPizzas} from "../redux/slices/pizzaSlice";

export default function Home() {
  const categoryId = useSelector((state: any) => state.filter.categoryId);
  const sortVal = useSelector((state: any) => state.filter.sort.sortProperty);
  const isSearch = useRef(true);
  const isMounted = useRef(true);
  const pageCount = useSelector((state: any) => state.filter.pageCount);
  const {items, status} = useSelector((state: any) => state.pizza);
  const categoryIndex = categoryId;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {searches} = useContext(AppContext);

  const [image, setImage] = useState(true);

  const onClickedCategory = (id: number) => {
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
      dispatch(setFilters({...params, sort}));
    }
    isSearch.current = true;
  }, []);
  const ax = async () => {
    const order = sortVal.includes("-") ? "asc" : "desc";
    const sortBy = sortVal.replace("-", "");

    setImage(true);

    try {

      dispatch(
        // @ts-ignore
        fetchPizzas({sortBy, order, searches, categoryIndex, pageCount})
      );
      // setPiz(res.data);
    } catch (error) {
      console.log("AXIOS ERROR!!!", error);
    } finally {
      setImage(false);
    }
    // await axios
    //   .get(
    //     `https://65d62ccdf6967ba8e3bda424.mockapi.io/pizzes?page=${pageCount}&limit=4&${
    //       categoryIndex > 0 ? `category=${categoryIndex}` : ``
    //     }&sortBy=${sortBy}&order=${order}${
    //       searches ? `&search=${searches}` : ``
    //     }`
    //   )
    //   .then((res) => {
    //     setPiz(res.data);
    //     setImage(false);
    //   });
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
          <Sort/>
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {status === "error" ? (
            <div>
              <p>Произошла ОШИБКА</p>
              <p>Что-то пошло не так, пожалуйста, повторите попытку позже!</p>
            </div>
          ) : (
            <>
              {status === "loading"
                ? [...new Array(13)].map((_, index) => (
                  <Skeletone key={index}/>
                ))
                : items.map((pizza: any) => (
                  <Link to={`/pizza/${pizza.id}`} key={pizza.id}>

                    <PizzaBlock
                      
                      id={pizza.id}
                      title={pizza.title}
                      price={pizza.price}
                      image={pizza.imageUrl}
                      sizes={pizza.sizes}
                      types={pizza.types}
                    >
                    </PizzaBlock>
                  </Link>
                ))}

            </>
          )}
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
