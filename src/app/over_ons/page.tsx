"use client";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import { Button, Card, CardContent } from "@mui/material";
import Link from "next/link";

const OverOns = () => {
    return (
        <main className="min-h-screen bg-gray-50 flex items-start justify-center flex-col gap-2">
        <div className="bg-white text-gray-800 p-6 rounded-md ml-[70px] mr-[70px] mb-[20px] mt-[110px]"> 
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-shrink-0">
        <Image
          src="/img/Anja_foto.svg" 
          alt="foto Anja"
          width={400}
          height={320}
          className="rounded-lg object-cover"
        />
      </div>
          <div className="flex-1">
        <h3 className="text-primary-100 text-md font-semibold mb-2">Over ons</h3>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Wij willen bijdragen aan een duurzamere wereld
        </h2>
        <p className="text-sm text-gray-800 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud a deserunt mollit anim
          id est laborum.
        </p>
      </div>
      <div className="mt-auto">
      <Link href='/contact'>
        <Button className="bg-primary-100 text-white hover:bg-primary-200 items-end text-2xl lowercase p-3">
          Contact
        </Button>
      </Link>
      </div>
        </div>
        </div>
        <div className="bg-white text-gray-800 p-6 space-y-16 rounded-md ml-[70px] mr-[70px] mb-[20px]">
        <h3 className="text-center text-primary-100 text-md font-semibold mb-6">Samenwerking</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex justify-center items-center mb-4">
                <Image src="/img/HU-logo.svg" alt="HU Logo" width={64} height={64} />
              </div>
              <h4 className="font-bold mb-2">Hogeschool Utrecht</h4>
              <p className="text-sm text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex justify-center items-center mb-4">
                <Image src="/img/utrechtinc_logo.svg" alt="Utrecht Inc Logo" width={64} height={64} />
              </div>
              <h4 className="font-bold mb-2">Utrecht Inc</h4>
              <p className="text-sm text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua.
              </p>
            </CardContent>
          </Card>
        </div>
        </div>
        </main>
    );
};


export default OverOns;
