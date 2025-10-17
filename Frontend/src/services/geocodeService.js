import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY;
const API_URL = 'https://api.opencagedata.com/geocode/v1/json';

export const getAddressFromLatLng = async (lat, lng) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        q: `${lat}+${lng}`,
        pretty: 1,
        no_annotations: 1
      }
    });

    if (response.data.results.length > 0) {
      return response.data.results[0].formatted;
    } else {
      return "Address not found";
    }
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return "Could not fetch address";
  }
};