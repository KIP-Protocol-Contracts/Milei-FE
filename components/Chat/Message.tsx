import moment from "moment";
import Image, { StaticImageData } from "next/image";

export const UserMessage = ({ msg }: { msg: string }) => {
  return <div className="p-4 rounded-md bg-light-yellow">{msg}</div>;
};

export const BotMessage = ({
  msg,
  name,
  pfp,
}: {
  msg: string;
  name: string;
  pfp: string | StaticImageData;
}) => {
  const currentTime = moment().format("hh:mm A");

  return (
    <div className="flex gap-2">
      <div className="bg-mil_orange h-[30px] border border-blue_1">
        <Image src={pfp} alt="dog1" width={30} height={30} />
      </div>
      <div>
        <div className="h-[30px] flex items-baseline gap-2">
          <p className="font-semibold capitalize">{name}</p>
          <span className="text-[#BCBEC7] text-[10px]">{currentTime}</span>
        </div>
        <p>{msg}</p>
      </div>
    </div>
  );
};
