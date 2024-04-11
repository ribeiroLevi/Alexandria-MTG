import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

interface Card {
  id: string;
  name: string;
  imageUrl: string;
  type: string;
  cmc: string;
  originalText: string;
  power: string;
  toughness: string;
  setName: string;
  rarity: string;
  manaCost: string;
}

export function Lib() {
  const [cards, setCards] = useState<Card[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [randomPlaceholder, setRandomPlaceholder] = useState("");
  const pageSize = 100;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://api.magicthegathering.io/v1/cards?page=${currentPage}&pageSize=${pageSize}`
        );
        const filteredCards = filterUniqueNames(response.data.cards);
        setCards((prevCards) => [...prevCards, ...filteredCards]);
      } catch (error) {
        console.log("Error", error);
      }
    }
    fetchData();
  }, [currentPage]);

  // Filter out cards with duplicate names
  const filterUniqueNames = (cards: Card[]) => {
    const uniqueNames = new Set();
    const uniqueCards = [];

    for (const card of cards) {
      if (!uniqueNames.has(card.name)) {
        uniqueNames.add(card.name);
        uniqueCards.push(card);
      }
    }
    return uniqueCards;
  };

  const loadMoreCards = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearch(query);
  };

  const queryCards =
    search.trim() !== ""
      ? cards.filter((card) =>
          card.name.toLowerCase().includes(search.toLowerCase())
        )
      : cards;

  const getRandomPlaceholder = async function fetchRandomNaame() {
    try {
      const response = await axios.get(
        "https://api.magicthegathering.io/v1/cards?pageSize=100"
      );
      const randomIndex = Math.floor(
        Math.random() * response.data.cards.length
      );
      const randomName = response.data.cards[randomIndex].name;
      setRandomPlaceholder(randomName);
    } catch (erro) {
      console.log("Error: ", erro);
    }
  };

  useEffect(() => {
    getRandomPlaceholder();
  }, []);

  return (
    <div className="flex flex-col align-middle items-center">
      <h1 className="mx-auto font-Karantina text-orange-900 text-5xl flex mt-5 mb-5 uppercase font-bold">
        Alexandria
      </h1>

      <nav>
        <form action="">
          <input
            type="text"
            onChange={handleSearch}
            placeholder={randomPlaceholder}
            className="my-3 w-[550px] h-8 rounded-sm indent-2 font-bold bg-orange-900 placeholder-orange-200 text-orange-200 placeholder-opacity-50 tracking-tight"
          />
        </form>
      </nav>
      <ul className="flex flex-wrap justify-center grid-cols-8 gap-6">
        {queryCards.map((card) => (
          <Dialog key={card.id}>
            <DialogTrigger asChild>
              <li className="w-[250px] flex flex-col justify-center items-center hover:mx-2 ease-in-out duration-150">
                <img
                  src={card.imageUrl}
                  alt=""
                  className="rounded-[9px] hover:scale-125 ease-in-out duration-150 size-[350px]"
                />
                <p className="font-bold text-orange-900">{card.name}</p>
              </li>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-5xl">
                  <div className="flex flex-col">
                    {card.name} <span className="text-2xl">{card.type}</span>
                  </div>
                </DialogTitle>
                <DialogDescription className="flex flex-row items-center">
                  <div>
                    <div className="flex flex-row justify-between w-[300px]">
                      <p className="text-3xl mt-3">Mana Value: {card.cmc}</p>
                      <p className="text-3xl mt-3">
                        Mana Cost: {card.manaCost}
                      </p>
                    </div>
                    <p className="text-3xl w-[300px] mt-3">
                      Texto da Carta: <br />
                      {card.originalText}
                    </p>
                    <div className="flex flex-row mt-3 w-[400px] justify-between">
                      <p className="text-3xl">
                        P/T: {card.power}/{card.toughness}
                      </p>
                      <p className="text-3xl">Expansion: {card.setName}</p>
                      <p className="text-3xl">Rarity: {card.rarity}</p>
                    </div>
                  </div>
                  <img
                    className="rounded-lg size-[500px] mx-4"
                    src={card.imageUrl}
                    alt=""
                  />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))}
      </ul>
      <button
        onClick={loadMoreCards}
        className="bg-orange-900 text-orange-200 px-6 py-3 mt-5 mb-5 rounded-md"
      >
        More Cards
      </button>
    </div>
  );
}
