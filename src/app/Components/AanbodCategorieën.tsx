"use client";

import React from "react";
import Button from "./Button";
import Card from "./Card";

type category = {
  title: string;
  discription: string;
  type: "overview" | "category";
  img: string;
  link: string;
  index: number;
};

const AanbodCategorieën: React.FC = () => {
  const categorys: category[] = [
    {
      title: "Open aanhangers",
      discription: "Bied veelzijdig en eenvoudig laden.",
      type: "category",
      img: "/img/verhuurfoto.png",
      link: "",
      index: 0,
    },
    {
      title: "Gesloten aanhangers",
      discription: "Beschermt lading tegen weersinvloeden en diefstal.",
      type: "category",
      img: "/img/verhuurfoto.png",
      link: "",
      index: 1,
    },
    {
      title: "Motor(fiets) aanhangers",
      discription: "Vergroot het transportgemak voor tweewielers",
      type: "category",
      img: "/img/verhuurfoto.png",
      link: "",
      index: 2,
    },
    {
      title: "Bagage aanhangers",
      discription: "Bied extra ruimte voor reisbenodigdheden.",
      type: "category",
      img: "/img/verhuurfoto.png",
      link: "",
      index: 3,
    },
  ];

  return (
    <div className="w-full sm:px-20 py-4 flex flex-col bg-offWhite-100 justify-center items-center">
      <div className="w-full justify-center md:justify-between items-center flex flex-row mb-4">
        <h3 className="font-bold">Categorieën</h3>
        <Button
          type="secondary"
          styling="hidden md:flex"
          label={"Bekijk ons hele aanbod"}
        />
      </div>
      <div className="flex flex-col md:flex-row flex-wrap 2xl:flex-nowrap w-full gap-4 justify-center items-center 2xl:justify-between">
        {categorys?.map((category: category) => (
          <Card
            title={category.title}
            discription={category.discription}
            type={category.type}
            img={category.img}
            styling="grow"
            link={category.link}
            key={category.index}
          />
        ))}
      </div>
      <div className="w-full flex justify-center mt-4">
        <Button
          type="secondary"
          styling="flex md:hidden"
          label={"Bekijk ons hele aanbod"}
        />
      </div>
    </div>
  );
};

export default AanbodCategorieën;
