import { Search } from 'lucide-react';

export function App() {
  return (
    <div className="overflow-hidden flex items-center flex-col">
      <nav className="py-5 flex flex-row w-full">
        <div className="w-full flex flex-row items-center justify-between">
          <h1 className="mx-auto font-Karantina text-orange-900 text-5xl flex">
            ALEXANDRIA
          </h1>
        </div>
      </nav>
      <div className="-mt-[88px] h-screen flex items-center justify-center flex-col">
        <h1 className="text-[150px] font-Lusitana text-orange-900">
          Alexandria
        </h1>
        <p className="font-Karantina text-[40px] -mt-16 text-orange-700">
          A Verdadeira Biblioteca de Magic
        </p>
        <button className="bg-orange-900 w-[250px] h-[40px] rounded-md font-Karatina font-bold text-orange-200 text-xl pb-1">
          Explorar
        </button>
      </div>
    </div>
  );
}
