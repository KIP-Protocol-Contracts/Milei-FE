import moment from 'moment';
import Image, { StaticImageData } from 'next/image';

export const UserMessage = ({ msg }: { msg: string }) => {
  return <div className="p-4 rounded-md bg-light-yellow text-sm">{msg}</div>;
};

export const BotMessage = ({
  msg,
  name,
  pfp,
  bgColor = 'bg-mil_orange',
}: {
  msg: string;
  name: string;
  pfp: string | StaticImageData;
  bgColor?: string;
}) => {
  if (!msg || msg === '') return null;

  const currentTime = moment().format('hh:mm A');

  return (
    <div className="flex gap-2">
      <div className="relative h-[46px] w-[46px]">
        <div
          className={`absolute inset-0.5 ${bgColor} border border-blue_1`}
        ></div>
        <Image
          src={pfp}
          alt="dog1"
          width={46}
          height={46}
          className="relative"
        />
      </div>
      <div className="w-full">
        <div className="h-[46px] flex items-center gap-2">
          <p className="font-semibold capitalize">{name}</p>
          <span className="text-[#BCBEC7] text-[10px]">{currentTime}</span>
        </div>
        <p className="text-sm text-wrap">{msg}</p>
      </div>
    </div>
  );
};
