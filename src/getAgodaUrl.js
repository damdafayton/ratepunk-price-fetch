export function getAgodaUrl(data) {
  const {
    hotel_name,
    location,
    country,
    check_in,
    adults,
    children,
    no_rooms,
    currency,
    check_out,
  } = data;

  const hotelName = getHotelName(hotel_name);
  const dayCount = getDayCount(check_in, check_out);
  const locationUrl = getLocationUrl(location, country);

  return `https://www.agoda.com/${hotelName}/hotel/${locationUrl}?&adults=${adults}&children=${children?.length}&rooms=${no_rooms}&los=${dayCount}&currencyCode=${currency}&checkIn=${check_in}`;
}

const getDayCount = (check_in, check_out) => {
  const msInOneDay = 1000 * 60 * 60 * 24;
  const durationInMs = new Date(check_out) - new Date(check_in);

  return durationInMs / msInOneDay;
};

const getHotelName = (hotel_name) => {
  return hotel_name.toLowerCase().replaceAll(" ", "-");
};

const getLocationUrl = (location, country) => {
  const countryAbbrv = countryMap[country];

  return `${location.toLowerCase()}-${countryAbbrv.toLowerCase()}.html`;
};

const countryMap = { Ukraine: "UA" };
