export function transformOffersData(offers: any[]): any[] {
  return offers?.map((offer: any) => ({
    key: offer.hotelName,
    Date: `${offer.startDate} - ${offer.endDate}`,
    Price: offer.totalCost,
    Hotel: offer.hotelCoverImage,
    HotelName: offer.hotelName,
    City: offer.hotelCity,
    Stars: offer.hotelStars,
    Nights: offer.duration,
    Start: offer.startDate,
    End: offer.endDate,
    id: offer.id,
    transportation: offer.transportation,
    mealPlan: offer.mealPlan,
    roomType: offer.roomType
  }));
}

export const findCountryName = (decodedName: string, vacationsCategories: any): string => {
  let foundCountryName: string | undefined;

  vacationsCategories.categories.some((category:any) => {
      return category.countrys.some((country:any) => {
          const foundOffer = country.offers.find((offer:any) => offer.hotelName === decodedName);
          if (foundOffer) {
              foundCountryName = country.countryName;
              return true; 
          }
          return false; 
      });
  });

  return foundCountryName || 'Country not found';
};