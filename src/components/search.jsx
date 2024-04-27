import { useContext } from "react";
import style from "./Search.module.scss";
import { AppContext } from "../App";
export default function Search() {
  const { searches, setSearches } = useContext(AppContext);
  return (
    <>
      <input
        value={searches}
        onChange={(event) => setSearches(event.target.value)}
        className={style.root}
        placeholder="Поиск пиццы"
      />
      {searches && <button onClick={() => setSearches("")}>X</button>}
    </>
  );
}
