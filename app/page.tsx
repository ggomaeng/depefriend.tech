import Image from "next/image";
import React from "react";

export default function DepePage() {
  return (
    <div className="flex min-h-screen w-screen flex-col items-start bg-white p-2 text-black">
      <Image
        src={"https://i.imgur.com/sWppBb5.png"}
        width={100}
        height={100}
        alt="depe"
      />

      <div className="text-3xl font-bold">depe friends</div>
      <div>DEPE NFT Collection based on your PFP</div>

      <div className=" text-start">
        <div>
          Max supply: <span className="font-bold">1,000</span>
        </div>
        <div>
          Starting price: <span className="font-bold">69,000 DEPE</span>
        </div>
        <div>
          End price: <span className="font-bold">420,000 DEPE</span>
        </div>
      </div>
      <Button>deploy</Button>
    </div>
  );
}

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="border border-black px-1" {...props}>
      {props.children}
    </button>
  );
}
