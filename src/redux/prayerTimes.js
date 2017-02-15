import adhan from '../utils/Adhan';

const LOAD_SUCCESS_LOCATION = 'location/LOAD_SUCCESS_LOCATION';
const SET_METHOD = 'location/SET_METHOD';
const SET_MADHAB = 'location/SET_MADHAB';

const initialState = {
  lat: null,
  lng: null,
  offset: new Date().getTimezoneOffset() / (60 * -1),
  method: 'MuslimWorldLeague',
  madhab: 'Shafi',
  coordinates: null
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_SUCCESS_LOCATION: {
      return {
        ...state,
        lat: action.location.lat,
        lng: action.location.lng,
        coordinates: new adhan.Coordinates(action.location.lat, action.location.lng)
      };
    }
    case SET_METHOD: {
      return {
        ...state,
        method: action.method
      };
    }
    case SET_MADHAB: {
      return {
        ...state,
        method: action.madhab
      };
    }
    default:
      return state;
  }
};

export const loadLocation = () => dispatch =>
  fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDf0Ko76wn1zoj5LjCm1zBs9KnUBbvWTjI', { method: 'POST' })
  .then(response => response.json())
  .then(({ location }) => dispatch({
    type: LOAD_SUCCESS_LOCATION,
    location
  }))

export const getTimesList = () =>
  Object.keys(adhan.Prayer).filter(name => name !== 'None');

export const getPrayerTimes = (globalState) => {
  const date = new Date();
  const params = adhan.CalculationMethod[globalState.prayerTimes.method]();
  params.madhab = adhan.Madhab[globalState.prayerTimes.madhab];

  let times = new adhan.PrayerTimes(
    globalState.prayerTimes.coordinates,
    date,
    params
  );

  if (times.nextPrayer() === 6) {
    date.setDate(date.getDate() + 1);

    times = new adhan.PrayerTimes(
      globalState.prayerTimes.coordinates,
      date,
      params
    );
  }

  return times;
}

export const getNextPrayer = (globalState) => {
  const nextPrayerIndex = getPrayerTimes(globalState).nextPrayer();
  const prayerName = getTimesList()[nextPrayerIndex];

  return { name: prayerName, time: getPrayerTimes(globalState)[prayerName.toLowerCase()] };
}

export const setMethod = (method) => ({ method, type: SET_METHOD });
export const setMadhab = (method) => ({ madhab, type: SET_MADHAB });
