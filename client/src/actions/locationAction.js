import { GET_LOCATION, RESET_LOCATION } from "./types";

export const getLocation = () => (dispatch) => {
  navigator.geolocation.getCurrentPosition((position) => {
    dispatch({
      type: GET_LOCATION,
      payload: [position.coords.latitude, position.coords.longitude],
    });
  });
};

//resetLocation

export const resetLocation = () => {
  return { type: RESET_LOCATION };
};
