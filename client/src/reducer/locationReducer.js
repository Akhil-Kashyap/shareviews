import { GET_LOCATION, RESET_LOCATION } from "../actions/types";

const initialState = {
  location: [],
  zoom: 2,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LOCATION: {
      return {
        location: action.payload,
        zoom: 13,
      };
    }
    case RESET_LOCATION: {
      return {
        location: [],
        zoom: 2,
      };
    }

    default:
      return state;
  }
}
