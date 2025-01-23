import React from "react";
import { dogsList } from "../Dogs/page";
import Image from "next/image";
import { useParams } from "next/navigation";
import Milei from "@/public/images/Javier Milei.png";
import { Strips } from "../Strips";

export const Header = ({ name }: { name: string }) => {
  if (name === "milei") {
    return <MileiHeader />;
  }

  return <DogsHeader />;
};

export const DogsHeader = () => {
  return (
    <div className="flex items-center justify-center gap-10 border-b-2 border-b-blue_1 p-4">
      <div className="w-[300px]">
        <Strips />
      </div>
      {dogsList.map((dog, idx) => (
        <div className="relative flex flex-col items-center gap-4" key={idx}>
          <div
            className={`absolute border-2 border-blue_1 left-2 right-2 top-2 h-[98px] z-0 ${dog.bgColor}`}
          ></div>
          <Image
            src={dog.image}
            alt="dog1"
            width={100}
            height={100}
            className="rounded-md relative z-1"
          />
          <p className="font-bold">{dog.name}</p>
        </div>
      ))}
      <div className="w-[300px]">
        <Strips />
      </div>
    </div>
  );
};

export const MileiHeader = () => {
  const { id } = useParams();
  return (
    <div className="flex items-center justify-center gap-10 border-b-2 border-b-blue_1 p-4">
      <div className="w-[300px]">
        <Strips />
      </div>
      <div className="relative flex flex-col items-center gap-4">
        <div className="absolute border-2 border-blue_1 left-2 right-2 top-2 h-[80px] z-0 bg-mil_orange"></div>
        <Image
          src={Milei}
          alt="dog1"
          width={100}
          height={100}
          className="rounded-md relative z-1"
        />
        <p className="font-bold capitalize">{id}</p>
      </div>
      <div className="w-[300px]">
        <Strips />
      </div>
    </div>
  );
};
