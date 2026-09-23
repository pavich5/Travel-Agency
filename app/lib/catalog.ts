import { vacationsCategories } from "../mocks/data";
import type { Offer } from "../types";

export const photos: Record<string, string> = {
  Italy:
    "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1800&q=85",
  Greece:
    "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=1200&q=85",
  Switzerland:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
  Canada:
    "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=85",
  Portugal:
    "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=85",
  France:
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85",
  Thailand:
    "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=85",
  Mexico:
    "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=1200&q=85",
};

export type TravelOffer = Offer & {
  country: string;
  season: string;
  image: string;
};
export const offers: TravelOffer[] = vacationsCategories.categories.flatMap(
  (category) =>
    category.countrys.flatMap((country) =>
      country.offers.map((offer) => ({
        ...offer,
        pickUpLocation:
          ("pickUpLocation" in offer ? offer.pickUpLocation : undefined) ||
          "Contact the agency to confirm your pickup",
        hotelRoom:
          ("hotelRoom" in offer ? offer.hotelRoom : undefined) ||
          offer.roomType,
        country:
          country.countryName === "France-Paris"
            ? "France"
            : country.countryName,
        season: category.name.split(" ")[0],
        image:
          photos[
            country.countryName === "France-Paris"
              ? "France"
              : country.countryName
          ] || offer.offerImage,
      })),
    ),
);
export const destinations = Array.from(
  new Set(offers.map((offer) => offer.country)),
).map((name) => ({
  name,
  image: photos[name] || offers.find((offer) => offer.country === name)!.image,
  count: offers.filter((offer) => offer.country === name).length,
  price: Math.min(
    ...offers
      .filter((offer) => offer.country === name)
      .map((offer) => offer.totalCost),
  ),
}));
export const findOffer = (id: string | number) =>
  offers.find((offer) => offer.id === Number(id));
export const money = (value: number) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
export function departureDate(value: string) {
  const [day, month, year] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}
export const formatDate = (value: string) =>
  departureDate(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
export const isBookable = (offer: TravelOffer, now = new Date()) =>
  departureDate(offer.startDate).getTime() > now.getTime();
export function bookingPrice(offer: TravelOffer, packages: number) {
  if (!Number.isInteger(packages) || packages < 1 || packages > 4)
    throw new Error("Choose between 1 and 4 packages.");
  const subtotal = Math.round(offer.totalCost * 100) * packages;
  const fees = Math.round(subtotal * 0.1);
  return {
    subtotal,
    fees,
    total: subtotal + fees,
    travelers: offer.person * packages,
  };
}

export interface OfferFilters {
  query?: string;
  country?: string;
  season?: string;
  month?: string;
  from?: string;
  to?: string;
  maxPrice?: number;
  stars?: number;
  meal?: string;
  nights?: number;
  transportation?: string;
  room?: string;
  saved?: number[];
  sort?: string;
}
export function filterOffers(filters: OfferFilters) {
  const query = (filters.query || "").trim().toLowerCase();
  const result = offers.filter(
    (offer) =>
      (!query ||
        `${offer.hotelName} ${offer.hotelCity} ${offer.country}`
          .toLowerCase()
          .includes(query)) &&
      (!filters.country ||
        offer.country.toLowerCase() === filters.country.toLowerCase()) &&
      (!filters.season ||
        offer.season.toLowerCase() === filters.season.toLowerCase()) &&
      (!filters.month || offer.startDate.split("-")[1] === filters.month) &&
      (!filters.from ||
        departureDate(offer.startDate).getTime() >=
          new Date(filters.from).getTime()) &&
      (!filters.to ||
        departureDate(offer.startDate).getTime() <=
          new Date(filters.to).getTime()) &&
      (!filters.maxPrice || offer.totalCost <= filters.maxPrice) &&
      (!filters.stars || offer.hotelStars >= filters.stars) &&
      (!filters.meal || offer.mealPlan === filters.meal) &&
      (!filters.nights || parseInt(offer.duration) <= filters.nights) &&
      (!filters.transportation ||
        offer.transportation === filters.transportation) &&
      (!filters.room || offer.roomType === filters.room) &&
      (!filters.saved || filters.saved.includes(offer.id)),
  );
  if (filters.sort === "price-asc")
    result.sort((a, b) => a.totalCost - b.totalCost);
  if (filters.sort === "price-desc")
    result.sort((a, b) => b.totalCost - a.totalCost);
  if (filters.sort === "date")
    result.sort(
      (a, b) =>
        departureDate(a.startDate).getTime() -
        departureDate(b.startDate).getTime(),
    );
  return result;
}
