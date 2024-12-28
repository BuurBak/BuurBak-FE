import { Recycle, Shield } from "lucide-react";
import { OpenTrailer } from "../icons/TrailerIcons";

const Highlights = () => {
  return (
    <div className="flex justify-between w-full p-5 md:px-20 md:py-16 flex-col md:flex-row">
      <div className="w-fit mb-5 md:mb-0 flex flex-col items-center text-center">
        <div className="p-4 mb-3 border-2 border-secondary-100 rounded-full">
          <div className="h-8 w-8 flex justify-center items-center">
            <OpenTrailer color="#398D89" size={60} />
          </div>
        </div>
        <h5 className="text-secondary-100 font-bold">Altijd in de buurt</h5>
        <p className="max-w-4/5">
          Samen met jou bouwen we aan een sterkere buurt. Door je aanhangwagen
          te delen, maak je deel uit van een gemeenschap die elkaar helpt. Het
          voelt geweldig om te weten dat je buren er voor je zijn als je een
          handje nodig hebt.
        </p>
      </div>
      <div className="w-full mb-5 md:mb-0 flex flex-col items-center text-center">
        <div className="p-4 mb-3 border-2 border-primary-100 rounded-full">
          <Recycle className="h-8 w-8 text-primary-100" />
        </div>
        <h5 className="text-primary-100 font-bold">Altijd duurzaam</h5>
        <p className="max-w-4/5">
          Bij ons draait het allemaal om duurzaamheid. Door samen aanhangwagens
          te delen, verminderen we de druk op het milieu. Minder nieuwe
          aanhangwagens betekent minder productie, verspilling en een schonere
          planeet. Door met ons mee te doen, draag je direct bij aan een
          groenere toekomst.
        </p>
      </div>
      <div className="w-full mb-5 md:mb-0 flex flex-col items-center text-center">
        <div className="p-4 mb-3 border-2 border-secondary-100 rounded-full">
          <Shield className="h-8 w-8 text-secondary-100" />
        </div>
        <h5 className="text-secondary-100 font-bold">Altijd eenvoudig</h5>
        <p className="max-w-4/5">
          We begrijpen dat het leven al ingewikkeld genoeg is. Daarom hebben we
          het huren en verhuren van aanhangwagens super eenvoudig gemaakt. Ons
          platform is ontworpen voor jouw gemak, zodat je snel en stressvrij de
          spullen kunt vervoeren die je wilt. Doe met ons mee en ervaar hoe
          handig het kan zijn!
        </p>
      </div>
    </div>
  );
};

export default Highlights;
