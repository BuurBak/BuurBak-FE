import { CheckCircleIcon } from '@heroicons/react/24/outline'
import Button from './Button'
import TextInputField from './TextInputField';
import { useState } from 'react';


export default function Landing() {

    const [inputValue1, setInputValue1] = useState('');

    const changeInputValue1 = (event: { target: { value: any; }; }) => {
        if (event.target && event.target.value !== undefined) {
            setInputValue1(event.target.value)
        }
    }

    const [inputValue2, setInputValue2] = useState('');

    const changeInputValue2 = (event: { target: { value: any; }; }) => {
        if (event.target && event.target.value !== undefined) {
            setInputValue2(event.target.value)
        }
    }
    
    const [inputValue3, setInputValue3] = useState('');

    const changeInputValue3 = (event: { target: { value: any; }; }) => {
        if (event.target && event.target.value !== undefined) {
            setInputValue3(event.target.value)
        }
    }


    return <div className="flex justify-center items-center h-screen w-full bg-landing-background bg-cover bg-center overflow-hidden">
        <div className="flex justify-center items-center flex-col w-full h-full backdrop-brightness-50">
            <h1 className="hidden md:flex text-white w-5/12 text-center font-sans font-bold">Huur en verhuur je aanhanger via BuurBak</h1>
            <h3 className="flex md:hidden text-white w-full text-center font-sans font-bold">Huur en verhuur je aanhanger via BuurBak</h3>
            <div className='flex flex-col items-center mt-5 mb-16'>
                <div className='hidden md:flex flex-row w-fit justify-between'>
                    <div className='flex items-center mr-10'><CheckCircleIcon className="h-8 w-8 text-succes-100 mr-4" /><h6 className='text-white'>Altijd in de buurt</h6></div>
                    <div className='flex items-center mr-10'><CheckCircleIcon className="h-8 w-8 text-succes-100 mr-4" /><h6 className='text-white'>Altijd duurzaam</h6></div>
                    <div className='flex items-center'><CheckCircleIcon className="h-8 w-8 text-succes-100 mr-4" /><h6 className='text-white'>Altijd eenvoudig</h6></div>
                </div>
                <div className='md:grid grid-cols-2 gap-y-4 gap-x-10 flex flex-col xl:flex xl:flex-row justify-between mt-12 w-fit'>
                    <TextInputField label='Type' icon filled outline inputValue={inputValue1} setInputValue={changeInputValue1} />
                    <TextInputField label='Waar' icon filled outline inputValue={inputValue2} setInputValue={changeInputValue2} />
                    <TextInputField label='Wanneer' icon filled outline inputValue={inputValue3} setInputValue={changeInputValue3} />
                    <Button label='Bekijk het aanbod' styling='w-[246px]'/>
                </div>
            </div>
        </div>
    </div>;
}

// 