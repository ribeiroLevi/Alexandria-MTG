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

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../components/ui/sheet';

import { Toaster } from '../components/ui/toaster';

import { Switch } from '../components/ui/switch';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../components/ui/form';
import { Button } from '../components/ui/button';

import InfiniteScroll from 'react-infinite-scroll-component';

import { CirclePlus, ShoppingCart } from 'lucide-react';

import useLocalStorageState from 'use-local-storage-state';
import { useToast } from './ui/use-toast';

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
  colors: string[];
  quantity: number;
};

interface CartProps {
  [cardId: string]: Card;
}

export function Lib() {
  const [cards, setCards] = useState<Card[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [randomPlaceholder, setRandomPlaceholder] = useState('');
  const pageSize: number = 100;
  const [filters, setFilters] = useState('');
  const [cart, setCart] = useLocalStorageState<CartProps>('cart', {});
  const { toast } = useToast();

  useEffect(() => {
    console.log('FETCH');
    async function fetchData() {
      try {
        const response = await axios.get(
          //filtra na requisição da API
          `https://api.magicthegathering.io/v1/cards?page=${currentPage}&pageSize=${pageSize}${filters}`
        );
        const filteredCards = filterUniqueNames(response.data.cards);
        setCards((prevCards) => [...prevCards, ...filteredCards]);
        console.log(response);
      } catch (error) {
        console.log('Error', error);
      }
    }
    fetchData();
  }, [currentPage, filters]);

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
    let newFilters = [];

    if (data.filterBlack) newFilters.push('B');
    if (data.filterBlue) newFilters.push('U');
    if (data.filterRed) newFilters.push('R');
    if (data.filterGreen) newFilters.push('G');
    if (data.filterWhite) newFilters.push('W');

    const queryString =
      newFilters.length > 0 ? `&colors=${newFilters.join('&')}` : '';
    setCards([]);
    setFilters(queryString);
  }

  const toCart = (card: Card): void => {
    console.log(card.name);

    if (card.quantity === undefined) {
      card.quantity = 0;
    } else {
      card.quantity++;
    }

    setCart((prevCart) => ({
      ...prevCart,
      [card.id]: card,
    }));
    toast({
      title: 'Carta Adicionada!',
    });
    console.log(cart, card.quantity);
  };

  const handleClearCart = () => {
    setCart({});
  };

  const getCards = () => Object.values(cart || {});

  return (
    <InfiniteScroll
      dataLength={cards.length} // This is important field to render the next data
      next={loadMoreCards} // Pass the function that will load more data
      hasMore={true} // Change this to false if there are no more records to be fetched
      loader={<h4 className="flex item-center">Loading...</h4>}
      endMessage={
        <p className="">
          <b>You have seen it all</b>
        </p>
      }
    >
      <div className="flex flex-col align-middle items-center">
        <div className="flex items-center justify-center w-[90%]">
          {' '}
          <h1 className="mx-auto font-Karantina text-orange-900 text-5xl flex mt-5 mb-5 uppercase font-bold">
            Alexandria
          </h1>
          <Sheet>
            <SheetTrigger>
              {' '}
              <ShoppingCart className="stroke-orange-900 size-7 cursor-pointer" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-3xl font-Karantina">
                  Lista
                </SheetTitle>
                <SheetDescription>
                  <div className="mb-4">
                    Aqui, você pode ver as cartas salvas do seu último deck e
                    exportar um arquivo .txt com sua lista!
                  </div>
                  {getCards().map((card) => (
                    <div>
                      {card.quantity}
                      {card.name}
                    </div>
                  ))}
                  <button onClick={handleClearCart}>CLEAR</button>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
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
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className="w-full flex flex-row items-center justify-around text-xl text-orange-900 mt-4">
                        <FormField
                          control={form.control}
                          name="filterWhite"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-3xl mx-3">
                                White
                              </FormLabel>
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
                              <FormLabel className="text-3xl mx-3">
                                Red
                              </FormLabel>
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
                              <FormLabel className="text-3xl mx-3">
                                Blue
                              </FormLabel>
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
                              <FormLabel className="text-3xl mx-3">
                                Green
                              </FormLabel>
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
                              <FormLabel className="text-3xl mx-3">
                                Black
                              </FormLabel>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        ></FormField>
                      </div>
                      <Button
                        type="submit"
                        className="bg-orange-900 w-[200px] h-[40px] text-2xl text-orange-200"
                      >
                        Submit
                      </Button>
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
                      <CirclePlus
                        className="mt-4 size-7"
                        onClick={() => toCart(card)}
                      />
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
      </div>
      <Toaster />
    </InfiniteScroll>
  );
}
