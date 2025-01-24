import React from 'react';
import { dogsList } from '../Dogs/page';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Milai from '@/public/images/Javier Milai.png';
import { Strips } from '../Strips';

export const Header = ({ name }: { name: string }) => {
  if (name === 'milai') {
    return <MilaiHeader />;
  }

  return <DogsHeader />;
};

export const DogsHeader = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 border-b-2 border-b-blue_1 p-4">
      <div className="w-full md:w-[300px]">
        <Strips />
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {dogsList.map((dog, idx) => (
          <div
            className="relative flex flex-col items-center gap-2 sm:gap-4"
            key={idx}
          >
            <div
              className={`absolute border-2 border-blue_1 left-1 right-1 sm:left-2 sm:right-2 top-1 sm:top-2 h-[60px] sm:h-[98px] z-0 ${dog.bgColor}`}
            ></div>
            <Image
              src={dog.image}
              alt="dog1"
              width={80}
              height={80}
              className="rounded-md relative z-1 w-20 h-20 sm:w-24 sm:h-24"
            />
            <p className="font-bold text-sm sm:text-base">{dog.name}</p>
          </div>
        ))}
      </div>
      <div className="w-full md:w-[300px]">
        <Strips />
      </div>
    </div>
  );
};

export const MilaiHeader = () => {
  const { id } = useParams();
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 border-b-2 border-b-blue_1 p-4">
      <div className="w-full md:w-[300px]">
        <Strips />
      </div>
      <div className="relative flex flex-col items-center gap-4">
        <div className="absolute border-2 border-blue_1 left-2 right-2 top-2 h-[80px] z-0 bg-mil_orange"></div>
        <Image
          src={Milai}
          alt="dog1"
          width={100}
          height={100}
          className="rounded-md relative z-1"
        />
        <p className="font-bold capitalize">Profesor {id}</p>
      </div>
      <div className="w-full md:w-[300px]">
        <Strips />
      </div>
    </div>
  );
};
