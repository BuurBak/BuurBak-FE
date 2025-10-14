"use client";
import React, { ChangeEvent, useState } from "react";
import { Button, Card, CardContent } from "@mui/material"; // dit moet heroui worden
import Link from "next/link"; // dit moet heroui worden
import { Image } from "@heroui/image";

const OverOns = () => {
  return (
    <main className="flex-col">
      <div className="bg-zinc-100 text-gray-800 p-6">
        <div className="flex gap-6">
          <div>
            <Image
              src="/img/Anja_foto.svg"
              alt="foto Anja"
              width={400}
              height={320}
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-primary-100">
                Over BuurBak
              </h1>
              <h6 >
                BuurBak is hét deelplatform voor aanhangwagens
              </h6>
              <p>
                We brengen mensen samen door stilstaande aanhangwagens te delen. Zo maak je slim gebruik van wat er al is, help je anderen én heb je even persoonlijk contact met je buren.
              </p>
              <ul className="">
                <li className="mt-3">➡️ Meer delen, minder verspillen</li>
                <li className="mt-3">➡️ Slim, sociaal én duurzaam</li>
              </ul>
            </div>
            <div className="mt-auto">
              <Link href='/contact'>
                <Button className="bg-primary-100 text-white hover:bg-primary-200">
                  Contact
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white text-gray-800 p-6 px-20">
        <h4 className="font-bold">
          Ons Verhaal
        </h4>
        <p>
          Wat gebeurt er als iemand “iets met aanhangwagens” wil doen en een ander graag mensen helpt?
          Dan krijg je BuurBak.
        </p>
        <p>
          Oprichters Michiel van den Hazel en Anja Wolters ontdekten dat er meer dan 1 miljoen aanhangers in Nederland zijn – en dat die meer dan 99% van de tijd stilstaan.
          Zonde, vonden ze. Dus gingen ze aan de slag.
        </p>
        <p>
          <ul className="">
            <li className="mt-3">🧠 Geboren als project op de Hogeschool Utrecht</li>
            <li className="mt-3">💡 Gegroeid tot een community die elkaar blijft helpen</li>
          </ul>
        </p>
      </div>
      <div className="bg-zinc-100 text-gray-800 p-6 px-20">
        <h4 className="font-bold" >
          Samenwerking met de Hogeschool Utrecht
        </h4>
        <p>
          Sinds 2022 werkt BuurBak samen met studenten van de opleiding Open-ICT.
          Elke 20 weken neemt een nieuw studententeam het stokje over. Hierdoor groeit BuurBak continu door, én leren studenten van een écht product.
        </p>
        <p>
          <ul className="">
            <li className="mt-3">✅ Leren door te bouwen</li>
            <li className="mt-3">✅ Groeien door samenwerking</li>
            <li className="mt-3">✅ Helpen zit in ons DNA</li>
          </ul>
        </p>
      </div>
      <div className="bg-white text-gray-800 p-6 space-y-16 rounded-md ml-[70px] mr-[70px] mb-[20px]">
        <h1 className="text-center text-primary-100">Onze Reis - De Teams </h1>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex justify-center items-center mb-4">
              </div>
              <h4 className="font-bold mb-2">📅 2024 S2 - Team 6</h4>
              <ul className="">
                <li className="mt-3">🔍 Focus: Testen, bugs fixen, nieuwe pilot starten</li>
                <li className="mt-3">🎯 Doel: Platform stabiel en zelfstandig bruikbaar maken</li>
              </ul>
              <h6>👩‍💻 Front-end</h6>
              <p className="text-gray-700">
                Lysenca van Weerden, Lucas van der Vaart, Sander Kuiper, Robin van Barneveld
              </p>
              <h6>🖥️ Full-stack</h6>
              <p>Jesse Koekkoek (vrijwillig extern)</p>
              <h6>📋 Product Owner </h6>
              <p>Rembrandt Tran</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex justify-center items-center mb-4">
              </div>
              <h4 className="font-bold mb-2">📅 2024 S1 - Team 5</h4>
              <ul className="">
                <li className="mt-3">🔧 Focus: MVP afronden, back-end makeover, Stripe-integratie</li>
                <li className="mt-3">📢 Marketingfocus: Huurdersonderzoek voor social media</li>
              </ul>
              <h6>👩‍💻 Front-end</h6>
              <p className="text-gray-700">
                Jesse Elbertsen, Glenn van der Linden, Luuk van Dijk
              </p>
              <h6>🖥️ Back-end</h6>
              <p>Floris Gravendeel</p>
              <h6>📋 Product Owner </h6>
              <p>Ahmed Kzeibra</p>
              <h6>📈 Marketing </h6>
              <p>Anton van Someren</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex justify-center items-center mb-4">
              </div>
              <h4 className="font-bold mb-2">📅 2023 S2 - Team 4</h4>
              <ul className="">
                <li className="mt-3">🛠️ Focus: Start nieuwe responsive front-end, onderzoek naar betaalsystemen (PayPal)</li>
              </ul>
              <h6>👩‍💻 Front-end</h6>
              <p className="text-gray-700">
                Rianne Blom, Jesse Elbertsen, Luuk van Dijk, Seger van Vlijmen
              </p>
              <h6>🖥️ Back-end</h6>
              <p>Pieter Slebos, Isaak van Luijk</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex justify-center items-center mb-4">
              </div>
              <h4 className="font-bold mb-2">📅 2023 S1 - Team 3</h4>
              <ul className="">
                <li className="mt-3">🧭 Focus: Documentatie op orde brengen, basis verbeteren, accessibility & responsiveness</li>
              </ul>
              <h6>👩‍💻 Front-end</h6>
              <p className="text-gray-700">
                Justian Spijkerbosch
              </p>
              <h6>🖥️ Back-end</h6>
              <p>Tjonna Koster, Joel Lytsman Piernbaum</p>
              <h6>📋 Product Owner </h6>
              <p>Anton van Someren</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex justify-center items-center mb-4">
              </div>
              <h4 className="font-bold mb-2">📅 2022 S2 - Team 2</h4>
              <ul className="">
                <li className="mt-3">🛠️ Focus: Eerste pilot opzetten, mobiel gebruik verbeteren, Stripe-start</li>
                <li className="mt-3">🎯 Inzicht in weerstand van verhuurders</li>
              </ul>
              <h6>👩‍💻 Front-end</h6>
              <p className="text-gray-700">
                Tristan Haks, Matthijs Verhoef
              </p>
              <h6>🖥️ Back-end</h6>
              <p>Joas Boevink, Koen Baltus</p>
              <h6>📈 Business & Marketing</h6>
              <p>Anja Wolters, Michiel van den Hazel, Cosmo Alfonzo</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex justify-center items-center mb-4">
              </div>
              <h4 className="font-bold mb-2">📅 2022 S1 - Team 1</h4>
              <ul className="">
                <li className="mt-3">🚀 Start van het platform, validatie bij gebruikers, deelname UtrechtInc Student Validation Program</li>
              </ul>
              <h6>👩‍💻 Front-end</h6>
              <p className="text-gray-700">
                Matthijs Verhoef
              </p>
              <h6>🖥️ Back-end</h6>
              <p>Joas Boevink, Koen Baltus, Anton van Someren, Luca Bergman</p>
              <h6>📈 Business & Marketing</h6>
              <p>Anja Wolters, Michiel van den Hazel</p>
            </CardContent>
          </Card>
        </div>
      </div >
      <div className="bg-zinc-100 text-gray-800 p-6 px-20">
        <h4 className="font-bold mt-3" >
          💬 Tot Slot
        </h4>
        <p>
          BuurBak is niet alleen een platform.
          Het is een beweging.
          Een community van delers, doeners en denkers.
          Iedereen draagt bij - met techniek, ideeën, of simpelweg door iets te delen met je buur.
        </p>
      </div>
      <div className="bg-white text-gray-800 p-6 px-20">
        <h4 className="font-bold mt-3">
          Wil je ook meedoen?
        </h4>
        <p>
          <ul className="">
            <li className="mt-3">👉 [Neem contact op]</li>
            <li className="mt-3">👉 [Bekijk de aanhangers in jouw buurt]</li>
          </ul>
        </p>
      </div>
    </main >
  );
};


export default OverOns;
