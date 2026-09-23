import {
  offers,
  filterOffers,
  bookingPrice,
  findOffer,
  isBookable,
} from "./catalog";
test("catalog identifiers are unique and legacy offers remain available", () => {
  expect(offers).toHaveLength(29);
  expect(new Set(offers.map((o) => o.id)).size).toBe(offers.length);
  expect(findOffer(222)?.hotelCity).toBe("Santorini");
});
test("price includes all packages and taxes in integer cents", () => {
  expect(bookingPrice(findOffer(222)!, 2)).toEqual({
    subtotal: 200000,
    fees: 20000,
    total: 220000,
    travelers: 2,
  });
  expect(() => bookingPrice(offers[0], 1.5)).toThrow();
  expect(() => bookingPrice(offers[0], 0)).toThrow();
  expect(() => bookingPrice(offers[0], 5)).toThrow();
});
test("combined filters and numeric price ordering work", () => {
  const result = filterOffers({
    country: "Switzerland",
    maxPrice: 1300,
    stars: 4,
    sort: "price-asc",
  });
  expect(
    result.every(
      (o) =>
        o.country === "Switzerland" && o.totalCost <= 1300 && o.hotelStars >= 4,
    ),
  ).toBe(true);
  expect(result.length).toBeGreaterThan(0);
});
test("departed offers cannot be booked", () => {
  expect(
    isBookable(
      { ...offers[0], startDate: "01-01-2020" },
      new Date("2026-01-01"),
    ),
  ).toBe(false);
  expect(
    isBookable(
      { ...offers[0], startDate: "01-01-2027" },
      new Date("2026-01-01"),
    ),
  ).toBe(true);
});
test("saved ids and search terms intersect", () => {
  expect(
    filterOffers({ saved: [222], query: "Santorini" }).map((o) => o.id),
  ).toEqual([222]);
  expect(filterOffers({ saved: [], query: "Santorini" })).toEqual([]);
});
