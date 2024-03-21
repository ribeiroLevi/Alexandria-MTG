import React, {useState, useEffect} from 'react'
import axios from 'axios'

export function Lib() {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 100;

  useEffect(() => {
    async function  fetchData() {
      try{
        const response = await axios.get (`https://api.magicthegathering.io/v1/cards?page=${currentPage}&pageSize=${pageSize}`)
        const filteredCards = filterUniqueNames(response.data.cards);
        setCards(prevCards => [...prevCards, ...filteredCards]);
      }catch(error){
        console.log ("Error", error);
      }
    }
    fetchData()
  }, [currentPage])

  //filtro de cartas repetidas
  const filterUniqueNames = (cards) =>{
    const uniqueNames = new Set();
    const uniqueCards = [];

    for (const card of cards){
      if (!uniqueNames.has(card.name)){
        uniqueNames.add(card.name);
        uniqueCards.push(card);
      }
    }
    return uniqueCards;
  }

  const loadMoreCards = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <div className='flex flex-col align-middle items-center'>
      <h1 className='mx-auto font-Karantina text-orange-900 text-5xl flex mt-5 mb-5 uppercase font-bold'>Alexandria</h1>
      <ul className='flex flex-wrap justify-center grid-cols-8 gap-6'>
      {cards.map(card => (
                    <li key={card.id} className='w-[250px] flex flex-col justify-center items-center'>
                      <img src={card.imageUrl} alt="" className='rounded-[9px]' />
                      <p className='font-bold text-orange-900'>{card.name}</p>
                    </li>
                ))}
      </ul>
      <button onClick={loadMoreCards} className='bg-orange-900 text-orange-200 px-6 py-3 mt-5 mb-5 rounded-md'>More Cards</button>

          </div>
  )
}
