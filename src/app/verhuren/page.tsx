"use client";

import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Check, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { hasToken } from "../../lib/cookieUtil";
import { checkStripeConnection } from "../api/Payment-controller";
import { postTrailer } from "../api/Trailer-controller";
import Details from "../Components/AanbodItem/Details";
import Button from "../Components/Button";
import TrailerImagesUpload from "../Components/TrailerImagesUpload";
import { PostTrailer } from "../Types/TrailerType";
import { getDayAbbreviation } from "./getDayAbbreviation";
import { SharedSelection } from "@heroui/system";
import { Chip } from "@heroui/chip";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { Input } from "@heroui/input";
import SearchPlaceProvider, { LocationData } from "../Components/SearchPlaceProvider";
import { HeroUIBasedButton } from "../Components/HeroUIBasedButton";
import { toast } from "../hooks/use-toast";


const Verhuren = () => {
  const [stripe, setStripe] = useState<boolean>();
  const [files, setFiles] = useState<File[]>([]);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [selectedAccessoires, setSelectedAccessories] = useState<Array<string>>([]);
  const [selectFilter, setSelectFilter] = useState<string>('');
  const [trailerLocationData, setTrailerLocationData] = useState<LocationData[]>([]);

  const {
    register,
    handleSubmit,
    formState,
    setValue,
    watch,
    getValues,
    reset,
  } = useForm<PostTrailer>({
    defaultValues: {
      accessories: [],
      address: {
        city: "",
        house_number: "",
        postal_code: "",
        street_name: "",
      },
      availability: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      car_driving_license: "",
      description: "",
      dimensions: { height: undefined, length: undefined, width: undefined },
      images: [],
      location: { latitude: undefined, longitude: undefined },
      rental_price: undefined,
      title: "",
      trailer_type: ""
    },
  });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  //TODO: These should be enums
  const license: string[] = ["B", "BE"];
  const trailerType: string[] = [
    "Open Aanhanger",
    "Gesloten Aanhanger",
    "Motorfiets Aanhanger",
    "Bagage Aanhanger",
    "Fietsen Aanhanger",
    "Overig",
  ];
  const accessoryDropdownValues: string[] = [
    "Disselslot",
    "Oprijplaten",
    "7 naar 13 polige adapter",
    "13 naar 7 polige adapter",
    "Afdekzeil",
    "Afdeknet",
    "Pionnen",
    "Kruiwagen",
    "'Lange lading' bord",
  ].sort();

  const toggleDay = (day: keyof PostTrailer["availability"]) => {
    setValue(`availability.${day}`, !watch(`availability.${day}`));
  };

  useEffect(() => {
    setValue("accessories", selectedAccessoires);
  }, [selectedAccessoires])

  useEffect(() => {
    const checkStripe = async () => {
      let res = await checkStripeConnection();
      console.log(res);
      if (res) {
        if (res.ready_for_payments) {
          setStripe(res.ready_for_payments);
        } else {
          toast({
            title: "Verbind eerst jouw account met stripe via het dashboard",
            variant: "error",
          });
        }
      } else {
        toast({
          title: "Er is helaas iets mis gegaan probeer het later opnieuw",
          variant: "error",
        });
      }
    };
    checkStripe();
  }, []);

  useEffect(() => {
    const checkIsSignedIn = async () => {
      const token = await hasToken("sb-tnffbjgnzpqsjlaumogv-auth-token");
      if (token) {
        setIsSignedIn(true);
      }
    };

    checkIsSignedIn();
  });

  useEffect(() => {
    setValue('images', files.map((file) => file.name))
  }, [files])

  const onSubmit = async (data: PostTrailer, event: any) => {
    console.log('Submitting trailer')
    event.preventDefault();
    await postTrailer(data);
  };

  const trailerPictures = () => {
    return (
      <div className="flex flex-col">
        <TrailerImagesUpload
          onFilesChange={setFiles}
          {...register("images", {
            required: "Upload 5 fotos van de aanhanger"
          })}
        />
        <p className="text-error-100">{errors.images?.message}</p>
      </div>
    );
  };

  const trailerTypeSelector = () => {
    return (
      <div>
        <span className="font-bold">Kies je type aanhanger:</span>
        <Autocomplete
          className="buurbak-light border-primary-100 rounded border-1"
          aria-label="trailer_type"
          placeholder="Type aanhanger"
          {...register("trailer_type", {
            required: "Kies jouw type aanhanger",
          })}
          {...register("title")}
        >
          {trailerType.map((item, index) => (
            <AutocompleteItem
              key={index}
              aria-label={item}
              className="buurbak-light "
            >
              {item}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <p className="text-error-100">{errors.title?.message}</p>
      </div>
    );
  };

  const trailerDescription = () => {
    return (
      <div>
        <p className="font-bold">Geef een korte beschrijving voor de huurder:</p>
        <textarea
          id="message"
          className="w-full h-32 rounded border-1 border-primary-100 px-2"
          placeholder="Deze aanhanger is ideaal voor banken verhuizen, omdat..."
          aria-label="description"
          {...register("description", {
            required: "Geef je aanhanger een korte omschrijving"
          })}
        />
        <p className="text-error-100">{errors.description?.message}</p>
      </div>
    );
  };

  const filteredAccessories = useMemo(
    () => accessoryDropdownValues
      .filter((accessory) => !selectedAccessoires.includes(accessory))
      .filter((accessory) =>
        accessory.toLowerCase().includes(selectFilter.toLowerCase())
      ),
    [selectFilter, selectedAccessoires]
  );


  const handleSelectionChange = (keys: SharedSelection) => {
    const newSelection = Array.from(keys) as Array<string>;

    setSelectedAccessories(newSelection.sort());
  };

  const removeSelectedAccessory = (accessory: string) => {
    setSelectedAccessories(selectedAccessoires.filter((selected) => selected !== accessory));
  };

  const trailerAccessories = () => {
    return (
      <div>
        <p className="font-bold">
          Kies de accessoires die je bij je aanhanger wilt verhuren:
        </p>
        <Listbox
          aria-label="Kies jouw accessoires"
          selectionMode="multiple"
          selectedKeys={selectedAccessoires}
          onSelectionChange={handleSelectionChange}
          isVirtualized
          virtualization={{
            maxListboxHeight: 200,
            itemHeight: 40
          }}
          topContent={
            <>
              {selectedAccessoires.map((accessory) => (
                <Chip key={accessory} onClose={() => removeSelectedAccessory(accessory)}>{accessory}</Chip>
              ))}
              <Input
                value={selectFilter}
                placeholder="Zoeken"
                onChange={(event) => {
                  setSelectFilter(event.target.value);
                }} />
            </>
          }
        >
          {filteredAccessories.map((accessory) => (
            <ListboxItem onPressStart={() => setSelectFilter('')} key={accessory}>
              {accessory}
            </ListboxItem>
          ))}
        </Listbox>
      </div >
    );
  };

  const getLocationData = (type: string): LocationData | undefined => {
    return trailerLocationData.find((component) => component.types.includes(type));
  };

  // This component can better be done with just some API requests to the Places API, since Americans do postcodes different.
  const trailerLocation = () => {
    return (
      <div className="gap-5">
        <p className="font-bold">
          Kies de locatie waarvandaan je aanhanger opgehaald kan worden als hij gehuurd wordt:
        </p>
        {trailerLocationData.length > 0
          ? (
            <>
              <div className="grid grid-flow-col grid-rows-2 gap-2">
                <Input className="row-span-1" label='Straatnaam' value={getLocationData('route')?.longName} />
                <Input className="row-span-1" label='Postcode' value={getLocationData('postal_code')?.longName} />
                <Input className="row-span-1" label='Huisnummer' value={getLocationData('street_number')?.longName} />
                <Input className="row-span-1" label='Plaats' value={getLocationData('locality')?.longName} />
              </div>
              <div className="flex justify-right mt-2">
                <HeroUIBasedButton buttonVariant="primary" onPress={() => setTrailerLocationData([])}>Zoek opnieuw</HeroUIBasedButton>
              </div>
            </>
          )
          : (
            <div>
              <SearchPlaceProvider onLocationChange={setTrailerLocationData} />
            </div>
          )
        }
        <p className="text-error-100">{errors.location?.message}</p>
      </div>
    );
  };

  const trailerLicenseRequirement = () => {
    return (
      <div>
        <p className="font-bold">
          Kies het soort rijbewijs wat vereist is om de aanhanger te gebruiken:
        </p>
        <Autocomplete
          className="w-full buurbak-light border-primary-100 rounded border-1"
          aria-label="car_driving_license"
          placeholder="Benodigd rijbewijs"
          {...register("car_driving_license", {
            required:
              "Vul het rijbewijs in dat nodig is voor jouw aanhanger",
          })}
        >
          {license.map((item, index) => (
            <AutocompleteItem
              key={index}
              aria-label={item}
              className="buurbak-light "
            >
              {item}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <p className="text-error-100">
          {errors.car_driving_license?.message}
        </p>
      </div>
    );
  };

  const trailerDimensions = () => {
    return (
      <div className="wut">
        <p className="font-bold">
          Vul de afmetingen van je aanhanger in cm:
        </p>
        <div className="flex flex-col gap-2 justify-center">
          <Input
            label="lengte"
            {...register("dimensions.length", {
              required: "Vul de lengte van je aanhanger in"
            })}
          />
          <p className="text-error-100">
            {errors.dimensions?.length?.message}
          </p>
          <Input
            label="breedte"
            {...register("dimensions.width", {
              required: "Vul de breedte van je aanhanger in"
            })}
          />
          <p className="text-error-100">
            {errors.dimensions?.width?.message}
          </p>
          <Input
            label="hoogte"
            {...register("dimensions.height", {
              required: "Vul de hoogte van je aanhanger in"
            })}
          />
          <p className="text-error-100">
            {errors.dimensions?.height?.message}
          </p>
        </div>
      </div>
    );
  };

  const trailerPricePerDay = () => {
    return (
      <div className="flex flex-col">
        <p className="font-bold">
          Voor hoeveel € per dag wil je je aanhanger verhuren:
        </p>
        <Input
          label="Prijs... "
          {...register("rental_price", {
            required: "Vul de huurprijs per dag van je aanhanger in"
          })}
        />
        <p className="text-error-100">{errors.rental_price?.message}</p>
      </div>
    );
  };

  const trailerAvailability = () => {
    return (
      <div>
        <p className="font-bold">
          Kies de dagen waarop je de aanhanger beschikbaar wilt maken voor
          ophalen:
        </p>
        <div className="flex flex-row gap-3 w-full">
          {(
            Object.keys(getValues().availability) as Array<
              keyof PostTrailer["availability"]
            >
          ).map((day) => (
            <div
              key={day}
              aria-label={day}
              className={`flex flex-col items-center justify-center rounded w-14 h-20 cursor-pointer ${!watch(`availability.${day}`)
                ? "bg-primary-100 text-white"
                : "bg-offWhite-100"
                }`}
              onClick={() => toggleDay(day)}
            >
              <p className="font-bold">{getDayAbbreviation(day)}</p>
              {!watch(`availability.${day}`) ? (
                <Check className="h-4 w-4" />
              ) : (
                <X className="h-4 w-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const trailerAdPreview = () => {
    return (
      <div hidden className="w-full bg-offWhite-100 min-h-screen p-5">
        <div className=" bg-white w-full h-fit sm:sticky sm:top-32 p-5 rounded">
          <div className="flex flex-row gap-1">
            <div className="flex flex-col">
              {files[0] && (
                <Image
                  //Is this a memory leak?
                  src={URL.createObjectURL(files[0])}
                  alt=""
                  className="h-auto rounded-lg"
                  width={200}
                  height={200}
                />
              )}
            </div>
            <div className="w-2/4 flex flex-col gap-1">
              {files.length > 1 && files.map((file, index) => {
                if (index > 0) {
                  return (
                    <Image
                      //Is this a memory leak?
                      src={URL.createObjectURL(file)}
                      alt=""
                      className="w-full h-auto rounded-lg"
                      width={200}
                      height={200}
                    />
                  );
                }
              })}
            </div>
          </div>
          <div>
            <h6 className="flex flex-row text-primary-100 font-bold">
              {watch("trailer_type")}
            </h6>
            <p className="text-gray-100">Omschrijving:</p>
            <p>{watch("description")}</p>
          </div>
          <div className="flex flex-col p-2 gap-3 items-center">
            <hr className="w-full h-0.5 bg-black-100 "></hr>
            <h4 className="font-bold">Locatie</h4>
            <h6>{watch("address.city")}</h6>
            <h4 className="font-bold">Prijs</h4>
            <h6>
              €{watch("rental_price") ? watch("rental_price") : 0} per dag
            </h6>
            <hr className="w-full h-0.5 bg-black-100 "></hr>
          </div>
          <Details trailerOffer={watch()} />
          <div className="flex flex-col items-center">
            <Button
              label="Voeg jouw aanhanger toe"
              submit
              disabled={
                isSubmitting || isSubmitSuccessful || !isSignedIn || !stripe
              }
            />
            <Link
              href={
                "https://drive.google.com/file/d/1D9S05Qn7hC3bsEi_ElAqz8uX1s6Se5UZ/view"
              }
              target="_blank"
              className="underline italic text-black-100 "
            >
              Algemene Voorwaarden
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <h4 className="text-center text-h3 font-bold my-5">
        Creëer jouw aanhanger advertentie
      </h4>
      <form
        onSubmit={handleSubmit(onSubmit, () => { console.log("Submitting trailer form failed") })}
        noValidate
        className="flex flex-col gap-5 mx-5"
      >
        {trailerPictures()}
        {trailerTypeSelector()}
        {trailerDescription()}
        {trailerAccessories()}
        {trailerLocation()}
        {trailerLicenseRequirement()}
        {trailerDimensions()}
        {trailerPricePerDay()}
        {trailerAvailability()}
        <Button
          className="mb-2"
          label="Voeg jouw aanhanger toe"
          submit
          disabled={
            isSubmitting || isSubmitSuccessful || !isSignedIn || !stripe
          }
        />

        {/* {trailerAdPreview()} */}
      </form>
      <HeroUIBasedButton buttonVariant="primary" onPress={() => onSubmit({} as PostTrailer, { preventDefault: () => { } })}>KLICK</HeroUIBasedButton>
    </>
  );
};

export default Verhuren;
