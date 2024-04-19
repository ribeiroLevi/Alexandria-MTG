import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';

import { Switch } from '../components/ui/switch';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '../components/ui/form';
import { Button } from '../components/ui/button';

type Card = {
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
};
export function Lib() {
  const [cards, setCards] = useState<Card[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [randomPlaceholder, setRandomPlaceholder] = useState('');
  const pageSize: number = 100;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://api.magicthegathering.io/v1/cards?page=${currentPage}&pageSize=${pageSize}`
        );
        const filteredCards = filterUniqueNames(response.data.cards);
        setCards((prevCards) => [...prevCards, ...filteredCards]);
      } catch (error) {
        console.log('Error', error);
      }
    }
    fetchData();
  }, [currentPage]);

  // Filter out cards with duplicate names
  const filterUniqueNames = (cards: Card[]) => {
    const uniqueNames = new Set();
    const uniqueCards: Card[] = [];

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
    search.trim() !== ''
      ? cards.filter((card) =>
          card.name.toLowerCase().includes(search.toLowerCase())
        )
      : cards;

  const getRandomPlaceholder = async function fetchRandomName() {
    try {
      const response = await axios.get(
        'https://api.magicthegathering.io/v1/cards?pageSize=100'
      );
      const randomIndex = Math.floor(
        Math.random() * response.data.cards.length
      );
      const randomName = response.data.cards[randomIndex].name;
      setRandomPlaceholder(randomName);
    } catch (erro) {
      console.log('Error: ', erro);
    }
  };

  useEffect(() => {
    getRandomPlaceholder();
  }, []);

  const FormSchema = z.object({
    filterRed: z.boolean(),
    filterBlue: z.boolean(),
    filterBlack: z.boolean(),
    filterGreen: z.boolean(),
    filterWhite: z.boolean(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      filterRed: false,
      filterBlue: false,
      filterGreen: false,
      filterBlack: false,
      filterWhite: false,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data, null, 2));
  }

  return (
    <div className="flex flex-col align-middle items-center">
      <h1 className="mx-auto font-Karantina text-orange-900 text-5xl flex mt-5 mb-5 uppercase font-bold">
        Alexandria
      </h1>
      <nav className="flex flex-row w-[800px] items-center justify-around">
        <form action="">
          <input
            type="text"
            onChange={handleSearch}
            placeholder={randomPlaceholder}
            className="my-3 w-[550px] h-8 rounded-sm indent-2 font-bold bg-orange-900 placeholder-orange-200 text-orange-200 placeholder-opacity-50 tracking-tight"
          />
        </form>
        <Dialog>
          <DialogTrigger>
            <button className="bg-orange-900 w-[100px] h-8 font-bold rounded-sm text-orange-200">
              Filtros
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                <div className="w-full flex flex-col items-center">
                  <p className="text-4xl text-orange-900">Filtros</p>{' '}
                  <p className="text-xl text-orange-900">
                    Selecione um ou mais filtos e pressione "Confirmar"!
                  </p>
                </div>
              </DialogTitle>
              <DialogDescription>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="w-full flex flex-row items-center justify-around text-xl text-orange-900 mt-4">
                      <FormField
                        control={form.control}
                        name="filterWhite"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>White</FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      ></FormField>
                      <FormField
                        control={form.control}
                        name="filterRed"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Red</FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      ></FormField>
                      <FormField
                        control={form.control}
                        name="filterBlue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Blue</FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      ></FormField>
                      <FormField
                        control={form.control}
                        name="filterGreen"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Green</FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      ></FormField>
                      <FormField
                        control={form.control}
                        name="filterBlack"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Black</FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      ></FormField>
                      <Button type="submit">Submit</Button>
                    </div>
                  </form>
                </Form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </nav>
      <ul className="flex flex-wrap justify-center grid-cols-8 gap-6 ">
        {queryCards.map((card) => (
          <Dialog key={card.id}>
            <DialogTrigger asChild>
              <li className="w-[250px] flex flex-col justify-center items-center hover:mx-1 ease-in-out duration-150 hover:cursor-pointer">
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
                  <div className="flex flex-col text-orange-900">
                    {card.name} <span className="text-2xl">{card.type}</span>
                  </div>
                </DialogTitle>
                <DialogDescription className="flex flex-row items-center">
                  <div className="text-orange-700">
                    <div className="flex flex-row justify-between w-[300px]">
                      <p className="text-3xl mt-3">
                        <span className="text-orange-900">Mana Value:</span>{' '}
                        {card.cmc}
                      </p>
                      <p className="text-3xl mt-3">
                        <span className="text-orange-900">Mana Cost:</span>{' '}
                        {card.manaCost}
                      </p>
                    </div>
                    <p className="text-3xl w-[300px] mt-3">
                      <span className="text-orange-900">Texto da Carta:</span>{' '}
                      <br />
                      {card.originalText}
                    </p>
                    <div className="flex flex-row mt-3 w-[400px] justify-between">
                      <p className="text-3xl">
                        <span className="text-orange-900">P/T:</span>
                        {card.power}/{card.toughness}
                      </p>
                      <p className="text-3xl">
                        <span className="text-orange-900">Expansion:</span>{' '}
                        {card.setName}
                      </p>
                      <p className="text-3xl">
                        <span className="text-orange-900">Rarity:</span>{' '}
                        {card.rarity}
                      </p>
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
