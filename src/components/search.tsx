import {useCallback, useContext, useRef, useState} from "react";
//@ts-ignore
import style from "./Search.module.scss";
import {AppContext} from "../App.tsx";
//@ts-ignore
import debounce from "lodash.debounce";

export default function Search() {
  const [vInput, setVInput] = useState<string>('');
  const {searches, setSearches} = useContext(AppContext);
  const inputRef = useRef<HTMLInputElement>();
  const onClickClear = () => {
    setSearches("");
    setVInput("");
    inputRef.current?.focus();
  };

  const updateVInput = useCallback(
    debounce((str:string) => {
      setSearches(str);
    }, 500),
    []
  );
  const onChangeInput = (event:React.ChangeEvent<HTMLInputElement>) => {
    setVInput(event.target.value);
    updateVInput(event.target.value);
  };
  return (
    <>
      <input
        //@ts-ignore
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
