import { isMobile } from 'react-device-detect';

let webpSupported = false;

const getLocation = async () => {
  const requestUrl = new URL(`${process.env.NEXT_PUBLIC_API_URL}/locations`);
  const response = await fetch(requestUrl);

  let newLargeImageUrl = undefined;
  let newMediumImageUrl = undefined;
  let newSmallImageUrl = undefined;


  try {
    const parsedResponse = await response.json();
    if (webpSupported) {
      if (parsedResponse[0].image_url_large?.indexOf("jpeg") !== -1) {
        newLargeImageUrl = parsedResponse[0].image_url_large.replace(
          "fm=jpeg",
          "fm=webp"
        );
        newMediumImageUrl = parsedResponse[0].image_url_medium.replace(
          "fm=jpeg",
          "fm=webp"
        );
        newSmallImageUrl = parsedResponse[0].image_url_small.replace(
          "fm=jpeg",
          "fm=webp"
        );
      } else if (parsedResponse[0].image_url_large?.indexOf("jpg") !== -1) {
        newLargeImageUrl = parsedResponse[0].image_url_large.replace(
          "fm=jpg",
          "fm=webp"
        );
        newMediumImageUrl = parsedResponse[0].image_url_medium.replace(
          "fm=jpg",
          "fm=webp"
        );
        newSmallImageUrl = parsedResponse[0].image_url_small.replace(
          "fm=jpg",
          "fm=webp"
        );
      }
    }

    return {
      url: isMobile ? newMediumImageUrl || parsedResponse[0]?.image_url_medium : (newLargeImageUrl || parsedResponse[0]?.image_url_large),
      smallUrl: newSmallImageUrl || parsedResponse[0]?.image_url_small,
      imageLink: parsedResponse[0]?.image_link,
      attribution: {
        image_author_username: parsedResponse[0]?.image_author_username,
        image_author_name: parsedResponse[0]?.image_author_name,
        image_author_link: parsedResponse[0]?.image_author_link,
        originalImageLink: parsedResponse[0]?.image_link,
      },
      country: parsedResponse[0]?.country,
      countryName: parsedResponse[0]?.country_name,
      city: parsedResponse[0]?.city?.id,
      cityInfo: parsedResponse[0]?.city,
      cityName: parsedResponse[0]?.city_name,
      fact: parsedResponse[0]?.fact,
      id: parsedResponse[0]?._id,
    };
  } catch (error) {
    console.error(error);
    return {};
  }
};

export default getLocation;
