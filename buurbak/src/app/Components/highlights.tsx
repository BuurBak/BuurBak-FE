import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline'
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function Highlights() {
    return <div className="flex justify-around w-screen p-5 md:px-20 md:py-16 flex-col md:flex-row">
        <div className="w-full mb-5 md-mb-0 md:w-1/3 flex flex-col items-center text-center">
            <div className="p-4 mb-3 border-2 border-secondary-100 rounded-full"><ArchiveBoxXMarkIcon className="h-8 w-8 text-secondary-100"/></div>
            <h2 className="text-secondary-100 font-bold">Altijd in de buurt</h2>
            <p className='max-w-4/5'>Samen met jou bouwen we aan een sterkere buurt. Door je aanhangwagen te delen, maak je deel uit van een gemeenschap die elkaar helpt. Het voelt geweldig om te weten dat je buren er voor je zijn als je een handje nodig hebt.</p>
        </div>
        <div className="w-full mb-5 md-mb-0 md:w-1/3 flex flex-col items-center text-center">
            <div className="p-4 mb-3 border-2 border-primary-100 rounded-full"><ArrowPathRoundedSquareIcon className="h-8 w-8 text-primary-100"/></div>
            <h2 className="text-primary-100 font-bold">Altijd duurzaam</h2>
            <p className='max-w-4/5'>Bij ons draait het allemaal om duurzaamheid. Door samen aanhangwagens te delen, verminderen we de druk op het milieu. Minder nieuwe aanhangwagens betekent minder productie, verspilling en een schonere planeet. Door met ons mee te doen, draag je direct bij aan een groenere toekomst.</p>
        </div>
        <div className="w-full mb-5 md-mb-0 md:w-1/3 flex flex-col items-center text-center">
            <div className="p-4 mb-3 border-2 border-secondary-100 rounded-full"><ShieldCheckIcon className="h-8 w-8 text-secondary-100"/></div>
            <h2 className="text-secondary-100 font-bold">Altijd eenvoudig</h2>
            <p className='max-w-4/5'>We begrijpen dat het leven al ingewikkeld genoeg is. Daarom hebben we het huren en verhuren van aanhangwagens super eenvoudig gemaakt. Ons platform is ontworpen voor jouw gemak, zodat je snel en stressvrij de spullen kunt vervoeren die je wilt. Doe met ons mee en ervaar hoe handig het kan zijn!</p>
        </div>
    </div>;
}
