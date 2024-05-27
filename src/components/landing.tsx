import { Link } from 'react-router-dom';

export function Landing() {
  return (
    <div className="h-screen w-screen overflow-hidden flex items-center flex-col">
      <img
        src="/ALEXANDRIA.svg"
        alt=""
        className="absolute w-screen bottom-0 "
      />

      <nav className="py-5 flex flex-row w-full">
        <div className="w-full flex flex-row items-center justify-between">
          <h1 className="mx-auto font-Karantina text-orange-900 text-5xl flex">
            ALEXANDRIA
          </h1>
        </div>
      </nav>
      <div className="flex flex-row w-[1600px] justify-between">
        <div className="-mt-[88px] h-screen flex items-left justify-center flex-col">
          <div></div>
          <h1 className="text-[150px] font-Karantina uppercase text-orange-900">
            Alexandria
          </h1>
          <p className="font-Karantina text-[40px] -mt-16 text-orange-700">
            The Supreme Magic The Gathering Library
          </p>

          <Link
            to={'/lib'}
            className="bg-orange-900 w-[250px] h-11 rounded-md font-Karatina font-bold text-orange-200 text-xl pb-1 text-center align-middle pt-1"
          >
            Explorar
          </Link>
        </div>
        <div className="h-screen overflow-hidden">
          <img
            src="/chandra.png"
            alt="figura"
            className="w-[1000px] animate-fade-up duration-500"
          />
        </div>
      </div>
    </div>
  );
}
