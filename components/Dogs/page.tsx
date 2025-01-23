import Lucas from "@/public/images/lucas.png";
import Milton from "@/public/images/milton.png";
import Murray from "@/public/images/murray.png";
import Image from "next/image";
import Link from "next/link";
import { Strips } from "../Strips";

export const dogsList = [
  {
    name: "Lucas",
    chatLink: "/chat/lucas",
    image: Lucas,
    bgColor: "bg-mil_orange",
  },
  {
    name: "Murray",
    chatLink: "/chat/murray",
    image: Murray,
    bgColor: "bg-background",
  },
  {
    name: "Milton",
    chatLink: "/chat/milton",
    image: Milton,
    bgColor: "bg-blue_1",
  },
];

export function DogsPage() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col items-center border h-full justify-center">
        <div className="relative mb-10">
          <h1 className="font-bold text-3xl">Meet Milei's Loyal Companions!</h1>
          <div className="absolute right-1 mt-2 w-[302px]">
            <Strips />
          </div>
        </div>
        <div className="flex items-center justify-center gap-20 p-4">
          {dogsList.map((dog, idx) => (
            <div className="flex flex-col items-center gap-4" key={idx}>
              <div className="flex flex-col items-center border-4 border-blue_1 shadow-lg shadow-mil_orange">
                <p className="font-semibold text-3xl mb-4">{dog.name}</p>
                <Image src={dog.image} alt="dog1" width={300} height={400} />
              </div>
            </div>
          ))}
        </div>

        <Link href={"/chat/dogs"}>
          <button className="bg-blue_1 text-white flex items-center gap-2 px-8 py-2">
            <p className="font-semibold text-sm">Continue to chat</p>
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.1562 7.43748C11.1562 7.57837 11.1003 7.7135 11.0007 7.81313C10.901 7.91275 10.7659 7.96873 10.625 7.96873H6.375C6.2341 7.96873 6.09898 7.91275 5.99935 7.81313C5.89972 7.7135 5.84375 7.57837 5.84375 7.43748C5.84375 7.29658 5.89972 7.16145 5.99935 7.06182C6.09898 6.9622 6.2341 6.90623 6.375 6.90623H10.625C10.7659 6.90623 10.901 6.9622 11.0007 7.06182C11.1003 7.16145 11.1562 7.29658 11.1562 7.43748ZM10.625 9.03123H6.375C6.2341 9.03123 6.09898 9.0872 5.99935 9.18682C5.89972 9.28645 5.84375 9.42158 5.84375 9.56248C5.84375 9.70337 5.89972 9.8385 5.99935 9.93813C6.09898 10.0378 6.2341 10.0937 6.375 10.0937H10.625C10.7659 10.0937 10.901 10.0378 11.0007 9.93813C11.1003 9.8385 11.1562 9.70337 11.1562 9.56248C11.1562 9.42158 11.1003 9.28645 11.0007 9.18682C10.901 9.0872 10.7659 9.03123 10.625 9.03123ZM15.4062 8.49998C15.4065 9.69232 15.0981 10.8644 14.5109 11.9022C13.9238 12.94 13.078 13.8081 12.0559 14.422C11.0337 15.0359 9.87001 15.3747 8.67806 15.4054C7.48611 15.4362 6.30651 15.1578 5.25406 14.5974L2.99293 15.3511C2.80572 15.4135 2.60482 15.4226 2.41276 15.3773C2.22069 15.3319 2.04504 15.234 1.90549 15.0945C1.76595 14.9549 1.66803 14.7793 1.6227 14.5872C1.57737 14.3952 1.58643 14.1943 1.64887 14.007L2.40258 11.7459C1.90994 10.8197 1.63479 9.79343 1.598 8.745C1.56121 7.69656 1.76375 6.65353 2.19026 5.69506C2.61676 4.7366 3.25601 3.88789 4.05949 3.21337C4.86297 2.53884 5.80956 2.05623 6.8274 1.80216C7.84525 1.54809 8.9076 1.52924 9.93382 1.74704C10.96 1.96484 11.9232 2.41356 12.7501 3.05916C13.577 3.70475 14.2459 4.53024 14.7062 5.47298C15.1664 6.41571 15.4058 7.4509 15.4062 8.49998ZM14.3438 8.49998C14.3435 7.60357 14.137 6.71924 13.7403 5.91541C13.3436 5.11157 12.7673 4.40977 12.0559 3.86431C11.3446 3.31885 10.5173 2.94434 9.63805 2.76977C8.75882 2.5952 7.8512 2.62524 6.98543 2.85757C6.11966 3.08989 5.31894 3.51828 4.64522 4.10959C3.9715 4.70089 3.44284 5.43926 3.10015 6.26757C2.75746 7.09588 2.60991 7.99193 2.66893 8.88638C2.72795 9.78084 2.99195 10.6497 3.44051 11.4258C3.47816 11.491 3.50153 11.5634 3.50909 11.6383C3.51664 11.7131 3.50821 11.7888 3.48434 11.8601L2.65625 14.3437L5.13984 13.5156C5.19394 13.4972 5.2507 13.4878 5.30785 13.4877C5.40115 13.4879 5.49277 13.5126 5.57348 13.5595C6.46186 14.0735 7.46995 14.3444 8.49631 14.3451C9.52267 14.3457 10.5311 14.076 11.4201 13.5632C12.3092 13.0503 13.0474 12.3123 13.5607 11.4235C14.0739 10.5347 14.344 9.52634 14.3438 8.49998Z"
                fill="white"
              />
            </svg>
          </button>
        </Link>

        <Link href={"/"} className="text-blue_1 font-semibold text-sm mt-6">
          Looking for Milei instead? Switch to his chatbot.
        </Link>
      </div>
    </div>
  );
}
