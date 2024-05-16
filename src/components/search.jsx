import {useCallback, useContext, useRef, useState} from "react";
import style from "./Search.module.scss";
import {AppContext} from "../App.tsx";
import debounce from "lodash.debounce";

export default function Search() {
  const [vInput, setVInput] = useState("");
  const { searches, setSearches } = useContext(AppContext);
  const inputRef = useRef();
  const onClickClear = () => {
    setSearches("");
    setVInput("");
    inputRef.current.focus();
  };

  const updateVInput = useCallback(
    debounce((str) => {
      setSearches(str);
    }, 500),
    []
  );
  const onChangeInput = (event) => {
    setVInput(event.target.value);
    updateVInput(event.target.value);
  };
  return (
    <>
      <input
        ref={inputRef}
        value={vInput}
        onChange={onChangeInput}
        className={style.root}
        placeholder="Поиск пиццы"
      />
      {vInput && <button onClick={onClickClear}>X</button>}
    </>
  );
}
