import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectorSort, setSort} from "../redux/slices/filterSlice.ts";

type SortType = {
  name: string;
  sortProperty: string
}

export const sortlist: SortType[] = [
  {name: "популярности по-возрастанию", sortProperty: "raiting"},
  {name: "популярности по-убыванию", sortProperty: "-raiting"},
  {name: "цене по-возрастанию", sortProperty: "price"},
  {name: "цене по-убыванию", sortProperty: "-price"},
  {name: "алфавиту по-возрастанию", sortProperty: "title"},
  {name: "алфавиту по-убыванию", sortProperty: "-title"},
];
export default function Sort() {
  const dispatch = useDispatch();
  const sort = useSelector(selectorSort);
  const [sortO, setSortO] = useState(false);
  const sortRef = useRef(null);

  const sortName = sort.name;
  useEffect(() => {
    const handleClickOutside = (event: React.MouseEvent<HTMLBodyElement>) => {
      //@ts-ignore
      if (!event.composedPath().includes(sortRef.current)) {
        setSortO(false);
      }
    };
    //@ts-ignore
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      //@ts-ignore
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setSortO(!sortO)}>{sortName}</span>
      </div>
      {sortO && (
        <div className="sort__popup">
          <ul>
            {sortlist.map((lis: SortType) => (
              <li key={lis.name}
                  onClick={() => {
                    dispatch(setSort(lis));
                    setSortO(false);
                  }}
                  className={
                    sort.sortProperty === lis.sortProperty ? "active" : ""
                  }
              >
                {lis.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
