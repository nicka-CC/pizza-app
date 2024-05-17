type Category = {
  value:number;
  onClickOnCategory:(i:number)=> (void)
}
export default function Category({value, onClickOnCategory}:Category){
  // console.log(value);

  const catigories = [
    "Все",
    "Мясные",
    "Итальянские",
    "Американские",
    "Жирные",
    "Дешёвые",
    "Диетические",
  ];
  return (
    <div className="categories">
      <ul>
        {catigories.map((category, index) => {
          return (
            <li
              key={index}
              onClick={() => onClickOnCategory(index)}
              className={value === index ? "active" : ""}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
