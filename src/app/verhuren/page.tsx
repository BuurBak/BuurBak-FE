"use client";

import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Chip, Input, Listbox, ListboxItem, SharedSelection } from "@heroui/react";
import { Check, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { hasToken } from "../../lib/cookieUtil";
import { getImage, postImages } from "../api/Images-controller";
import { checkStripeConnection } from "../api/Payment-controller";
import { postTrailer } from "../api/Trailer-controller";
import Details from "../Components/AanbodItem/Details";
import Button from "../Components/Button";
import InputField from "../Components/InputField";
import LocationInput from "../Components/LocationInput";
import TrailerImagesUpload from "../Components/TrailerImagesUpload";
import { PostImageRes } from "../Types/Image";
import { PostTrailer } from "../Types/TrailerType";
import { getDayAbbreviation } from "./getDayAbbreviation";
import { toast } from "../hooks/use-toast";


type LocationData = {
  address: string;
  lat: number;
  lng: number;
};

const Verhuren = () => {
  const [stripe, setStripe] = useState<boolean>();
  const [files, setFiles] = useState<File[]>([]);
  const [pictures, setPictures] = useState<string[]>([]);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [selectedAccessoires, setSelectedAccessories] = useState<Array<string>>([]);
  const [selectFilter, setSelectFilter] = useState<string>('');

  const form = useForm<PostTrailer>({
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
      trailer_type: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState,
    setValue,
    watch,
    getValues,
    reset,
    control,
  } = form;
  const { errors, isSubmitSuccessful, isSubmitting } = formState;

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  //TODO: These should be enums
  const license: string[] = ["B", "BE"];
  const soortAanhanger: string[] = [
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
    setValue("title", watch("trailer_type"));
  }, [watch("trailer_type")]);

  useEffect(() => {
    const imageUuidArray = async () => {
      const imageUUID: string[] = [];
      const res = await postImages(files);

      if (res) {
        res.forEach((item: PostImageRes) => {
          imageUUID.push(item.uuid);
          const prevPictures = pictures;
          setPictures([...prevPictures, item.url]);
        });
        setValue("images", imageUUID);
      }
    };

    if (files.length > 0) {
      imageUuidArray();
    }
    getImageById(watch("images.0"));
  }, [files]);

  const handleLocationChange = (locationData: LocationData) => {
    setValue("location.latitude", locationData.lat);
    setValue("location.longitude", locationData.lng);

    const extractAddress = (input: string) => {
      const parts = input.split(",").map((part) => part.trim());

      const address = {
        city: "",
        house_number: "",
        postal_code: "",
        street_name: "",
      };

      if (parts.length >= 3) {
        // Extract street name and house number (from the first part)
        const streetAndNumber = parts[0].match(/(.*\D)\s(\d+[A-Za-z]?)$/);
        if (streetAndNumber) {
          address.street_name = streetAndNumber[1].trim();
          address.house_number = streetAndNumber[2].trim();
        }

        // Extract postal code and city (from the second part)
        const postalCodeCity = parts[1].trim();
        const postalCodeMatch = postalCodeCity.match(/(\d{4}\s?[A-Za-z]{2})/i); // Added 'i' for case insensitivity
        if (postalCodeMatch) {
          address.postal_code = postalCodeMatch[1];
        }

        // City is whatever comes after the postal code (if any)
        const cityMatch = postalCodeCity
          .replace(address.postal_code, "")
          .trim();
        if (cityMatch) {
          address.city = cityMatch;
        }

        // Set the values for each field
        setValue("address.city", address.city);
        setValue("address.house_number", address.house_number);
        setValue("address.postal_code", address.postal_code);
        setValue("address.street_name", address.street_name);
      }
    };

    extractAddress(locationData.address);
  };

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

  const getImageById = async (id: string) => {
    const res = await getImage(id);
    return res;
  };

  useEffect(() => {
    const checkIsSignedIn = async () => {
      const token = await hasToken("sb-tnffbjgnzpqsjlaumogv-auth-token");
      if (token) {
        setIsSignedIn(true);
      }
    };

    checkIsSignedIn();
  });

  const onSubmit = (data: PostTrailer) => {
    const addTrailer = async () => {
      await postTrailer(data);
    };

    addTrailer();
  };

  const uploadPictures = () => {
    return (
      <div className="w-3/4 flex flex-col gap-5">
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

  const trailerType = () => {
    return (
      <div className="w-3/4 ">
        <p className="font-bold">Kies je type aanhanger:</p>
        <Autocomplete
          className="w-full buurbak-light mt-5 border-primary-100 rounded border-1"
          aria-label="trailer_type"
          placeholder="Type aanhanger"
          {...register("trailer_type", {
            required: "Kies jouw type aanhanger",
          })}
        >
          {soortAanhanger.map((item, index) => (
            <AutocompleteItem
              key={index}
              aria-label={item}
              className="buurbak-light "
            >
              {item}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <p className="text-error-100">{errors.trailer_type?.message}</p>
      </div>
    );
  };

  const trailerDescription = () => {
    return (
      <div className="w-3/4">
        <p className="font-bold">Geef een korte beschrijving voor de huurder:</p>
        <textarea
          id="message"
          className="flex flex-row mt-5 p-2.5 w-full h-32 rounded border-1 border-primary-100"
          placeholder="Deze aanhanger is ideaal voor banken verhuizen, omdat..."
          aria-label="description"
          {...register("description", {
            required: "Vul een korte beschrijving in voor jouw aanhanger",
          })}
        />
        <p className="text-error-100">{errors.description?.message}</p>
      </div>
    );
  };

  const handleSelectionChange = (keys: SharedSelection) => {
    const newSelection = Array.from(keys) as Array<string>;
    setSelectedAccessories(newSelection.sort());
  };

  const filteredAccessories = useMemo(
    () => accessoryDropdownValues
      .filter((accessory) => !selectedAccessoires.includes(accessory))
      .filter((accessory) =>
        accessory.toLowerCase().includes(selectFilter.toLowerCase())
      ),
    [selectFilter, selectedAccessoires]
  );

  const removeSelectedAccessory = (accessory: string) => {
    setSelectedAccessories(selectedAccessoires.filter((selected) => selected !== accessory));
  };

  const trailerAccessories = () => {
    return (
      <div className="w-3/4">
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
                <Chip onClose={() => removeSelectedAccessory(accessory)}>{accessory}</Chip>
              ))}
              <Input
                value={selectFilter}
                placeholder="Zoeken"
                className="w-full"
                onChange={(event) => {
                  setSelectFilter(event.target.value);
                }} />
            </>
          }
        >
          <>
            {filteredAccessories.map((accessory) => (
              <ListboxItem onPressStart={() => setSelectFilter('')} key={accessory}>
                {accessory}
              </ListboxItem>
            ))}
          </>
        </Listbox>
      </div >
    );
  };

  const trailerLocation = () => {
    return (
      <div className="w-3/4 gap-5">
        <p className="font-bold">
          Kies de locatie waarvandaan je aanhanger opgehaald kan worden als hij gehuurd wordt:
        </p>
        <LocationInput
          onLocationChange={handleLocationChange}
          {...register("location", {
            required: "Vul jouw locatie in",
            validate: (__fieldValue) => {
              return watch("location.latitude") !== undefined &&
                watch("location.longitude") !== undefined &&
                watch("address.city") !== "" &&
                watch("address.house_number") !== "" &&
                watch("address.postal_code") !== "" &&
                watch("address.street_name") !== ""
                ? true
                : "Vul jouw locatie in";
            },
          })}
        />
        <p className="text-error-100">{errors.location?.message}</p>
      </div>
    );
  };

  const trailerLicenseRequirement = () => {
    return (
      <div className="w-3/4 gap-5">
        <p className="font-bold">
          Kies het soort rijbewijs wat vereist is om de aanhanger te gebruiken:
        </p>
        <Autocomplete
          className="w-full buurbak-light mt-5 border-primary-100 rounded border-1"
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
    const min = 50;
    return (
      <div className="flex flex-col w-3/4 gap-5">
        <p className="font-bold">
          Vul de afmetingen van je aanhanger in cm:
        </p>
        <div className="flex flex-col gap-3 w-full">
          <InputField
            inputType="text"
            label="Vul de lengte van je aanhanger in cm"
            icon
            rangeMin={min}
            rangeMax={300}
            iconLeft
            type="number"
            iconName="L"
            outline
            className="w-full"
            {...register("dimensions.length", {
              valueAsNumber: true,
              required: "Vul de lengte in van jou aanhanger",
              min: {
                value: min,
                message: "De lengte moet minimaal 10 cm zijn",
              },
              max: {
                value: 300,
                message: "De lengte mag maximaal 300 cm zijn",
              },
            })}
          />
          <p className="text-error-100">
            {errors.dimensions?.length?.message}
          </p>
          <InputField
            inputType="text"
            label="Vul de breedte van je aanhanger in cm"
            icon
            iconLeft
            type="number"
            iconName="B"
            outline
            className="w-full"
            {...register("dimensions.width", {
              valueAsNumber: true,
              required: "Vul de breedte in van jou aanhanger",
              min: {
                value: min,
                message: "De breedte moet minimaal 10 cm zijn",
              },
              max: {
                value: 300,
                message: "De breedte mag maximaal 300 cm zijn",
              },
            })}
          />
          <p className="text-error-100">
            {errors.dimensions?.width?.message}
          </p>
          <InputField
            inputType="text"
            label="Vul de hoogte van je aanhanger in cm"
            icon
            iconLeft
            type="number"
            iconName="H"
            outline
            className="w-full"
            {...register("dimensions.height", {
              valueAsNumber: true,
              required: "Vul de hoogte in van jou aanhanger",
              min: {
                value: min,
                message: "De hoogte moet minimaal 10 cm zijn",
              },
              max: {
                value: 400,
                message: "De hoogte mag maximaal 400 cm zijn",
              },
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
      <div className="flex flex-col w-3/4 gap-5">
        <p className="font-bold">
          Voor hoeveel € per dag wil je je aanhanger verhuren:
        </p>
        <InputField
          inputType="text"
          label="Prijs... "
          icon
          iconLeft
          iconName="Euro"
          outline
          className="w-full"
          type="number"
          {...register("rental_price", {
            valueAsNumber: true,
            required: "Vul de prijs in van jouw aanhanger",
            min: {
              value: 0,
              message: "De prijs moet minimaal 0 euro zijn",
            },
          })}
        />
        <p className="text-error-100">{errors.rental_price?.message}</p>
      </div>
    );
  };

  const trailerAvailability = () => {
    return (
      <div className="flex flex-col gap-5 w-3/4">
        <p className="font-bold">
          Kies de dagen waarop je de aanhanger beschikbaar wilt maken voor
          ophaal:
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
      <div className="w-full lg:w-1/3 bg-offWhite-100 min-h-screen p-5">
        <div className=" bg-white w-full h-fit sm:sticky sm:top-32 p-5 rounded">
          <div className="flex flex-row gap-1">
            {pictures[0] && (
              <Image
                src={pictures[0]}
                alt=""
                className="w-2/4 h-auto rounded-lg"
                width={200}
                height={200}
              />
            )}
            <div className="w-2/4 flex flex-col gap-1">
              <div className=" w-2/4 flex flex-row gap-1">
                {pictures[1] && (
                  <Image
                    src={pictures[1]}
                    alt=""
                    className="w-full h-auto rounded-lg"
                    width={200}
                    height={200}
                  />
                )}
                {pictures[2] && (
                  <Image
                    src={pictures[2]}
                    alt=""
                    className="w-full h-auto rounded-lg"
                    width={200}
                    height={200}
                  />
                )}
              </div>
              <div className="w-2/4 flex flex-row gap-1">
                {pictures[3] && (
                  <Image
                    src={pictures[3]}
                    alt=""
                    className="w-full h-auto rounded-lg"
                    width={200}
                    height={200}
                  />
                )}
                {pictures[4] && (
                  <Image
                    src={pictures[4]}
                    alt=""
                    className="w-full h-auto rounded-lg"
                    width={200}
                    height={200}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="mt-2">
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
          <div className="flex flex-col mt-5 items-center">
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full min-h-screen h-fit flex flex-col sm:flex-row pt-32 gap-5"
      noValidate
    >
      <div className="w-full lg:w-2/3">
        <h3 className="text-center text-h3 font-bold mt-2">
          Creer jouw aanhanger advertentie
        </h3>
        <div className="flex flex-col items-center pt-5 gap-5">
          {uploadPictures()}
          {trailerType()}
          {trailerDescription()}
          {trailerAccessories()}
          {trailerLocation()}
          {trailerLicenseRequirement()}
          {trailerDimensions()}
          {trailerPricePerDay()}
          {trailerAvailability()}
        </div>
      </div>

      {trailerAdPreview()}
    </form>
  );
};

export default Verhuren;
