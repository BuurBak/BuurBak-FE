import React, { useEffect, useState } from 'react';
import Card from './Card';
import Button from './Button';

const AanbodCatogorien: React.FC = () => {

  return (
    <div className='w-full sm:px-20 py-4 flex flex-col bg-offWhite-100 justify-center items-center'>
      <div className='w-full justify-center md:justify-between items-center flex flex-row mb-4'><h3 className='font-bold'>Catogorieën</h3><Button type='secondary' styling='hidden md:flex' label={'Bekijk ons hele aanbod'} /></div>
      <div className='flex flex-col md:flex-row md:justify-start w-full gap-4 justify-center items-center lg:justify-center overflow-auto'>
        <Card titel={'Open aanhangers'} discription='Bied veelzijdig en eenvoudig laden.' type={'category'} img={'/img/verhuurfoto.png'} link={''} />
        <Card titel={'Gesloten aanhangers'} discription='Beschermt lading tegen weersinvloeden en diefstal.' type={'category'} img={'/img/verhuurfoto.png'} link={''} />
        <Card titel={'Motor(fiets) aanhangers'} discription='Vergroot het transportgemak voor tweewielers' type={'category'} img={'/img/verhuurfoto.png'} link={''} />
        <Card titel={'Bagage aanhangers'} discription='Bied extra ruimte voor reisbenodigdheden.' type={'category'} img={'/img/verhuurfoto.png'} link={''} />
      </div>
      <div className='w-full flex justify-center mt-4'><Button type='secondary' styling='flex md:hidden' label={'Bekijk ons hele aanbod'} /></div>
    </div>
  );
};

export default AanbodCatogorien;
