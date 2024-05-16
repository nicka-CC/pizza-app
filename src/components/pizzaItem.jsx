import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function PizzaItem(props) {
  const {id} = useParams()
  const [pizzaData,setPizzaData] = useState();
  useEffect(() => {
    async function getPizzs(){
      try {
        const {data} = await axios.get(`https://65d62ccdf6967ba8e3bda424.mockapi.io/pizzes/`+id)
        setPizzaData(data)
        console.log(data)

      }catch(error){
        alert('some error')
      }
      }
    getPizzs();
    },[])
  if (!pizzaData) {
    return <h1>Загрузка...</h1>
  }
  return(
    <div className="container">
      <img src={pizzaData.imageUrl} alt="Pizza logo" />
      <h2>{pizzaData.title}</h2>
      <h2>{pizzaData.price} Р</h2>
    </div>
  )
}