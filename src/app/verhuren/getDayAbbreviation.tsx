import { Trailer } from "../Types/TrailerType";

export const getDayAbbreviation = (day: keyof Trailer["availability"]) => {
    switch (day) {
        case "monday":
            return "Ma";
        case "tuesday":
            return "Di";
        case "wednesday":
            return "Wo";
        case "thursday":
            return "Do";
        case "friday":
            return "Vr";
        case "saturday":
            return "Za";
        case "sunday":
            return "Zo";
        default:
            return "";
    }
};