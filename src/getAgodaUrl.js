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

  return `https://www.agoda.com/${hotelName}/hotel/${locationUrl}?&adults=${adults}&children=${children?.length}&rooms=${no_rooms}&checkIn=${check_in}&los=${dayCount}&currencyCode=${currency}`;
}

// `https://www.agoda.com/dream-hostel-lviv/hotel/lviv-ua.html?finalPriceView=1&adults=2&children=0&rooms=1&maxRooms=0&checkIn=2022-11-01&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=1&showReviewSubmissionEntry=false&currencyCode=UAH&isFreeOccSearch=false&isCityHaveAsq=false&los=7&sh_pc_redirect=true&cid=1905113`;

// ("https://www.agoda.com/dream-hostel-lviv/hotel/lviv-ua.html?finalPriceView=1&adults=2&checkIn=2022-11-01&los=7");

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
