export interface Offer {
  id: number;
  location: string;
  hotelName: string;
  pickUpLocation: string;
  hotelRoom: string;
  startDate: string;
  endDate: string;
  totalCost: number;
  arrivalTime: string;
  hotelStars: number;
  hotelCity: string;
  duration: string;
  amenities: string[];
  hotelCoverImage: string;
  person: number;
  hotelDescription: string;
  roomType: string;
  roomImage: string;
  mealPlan: string;
  transportation: string;
  activities: Activity[];
  cancellationPolicy: string;
  reviews: Review[];
  additionalImages: string[];
  offerImage: string
}

export interface Activity {
  img: string;
  name: string;
  description: string;
}

export interface Review {
  username: string;
  rating: number;
  comment: string;
}

export interface CountryOffer {
  countryName: string;
  description: string;
  image: string;
  offers: Offer[];
}

export interface VacationCategory {
  name: string;
  description: string;
  image: string;
  countrys: CountryOffer[];
}

export interface VacationsCategories {
  categories: VacationCategory[];
}

export interface OfferColumn {
  id: any;
  City: string;
  key: string;
  Date: string;
  Price: number;
  Hotel: string;
  HotelName: string;
  Stars: number;
  Nights: number;
  Start: string;
  End: string;
}

export interface Filters {
  startDate: Date | string | null;
  endDate: Date | string | null;
  minPrice: number | null;
  maxPrice: number | null;
  starRating: string[];
  nights: number | null;
  transportation: string[];
  mealPlan: string[];
  roomType: string[];
}

export interface Comment {
  _id: Number;
  userName: string;
  userId: string;
  userImage: string;
  content: string;
}
export interface Author {
  userName: string;
  userId: string;
  userImage: string;
}
export interface Post {
  _id: string;
  title: string;
  description: string;
  author: Author;
  likes: number;
  comments?: Comment[];
  images?: string[];
}

export type NotificationType = "success" | "error";

export interface FormData {
  title: string;
  description: string;
  images: string;
}