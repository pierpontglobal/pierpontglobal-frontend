import ACTIONS from './actionTypes';
import userInitialState from './initialState';
import _ from 'lodash';

const userReducer = (state = userInitialState, action) => {

  let newState = _.cloneDeep(state);

  switch(action.type) {
    case ACTIONS.CREATE_USER:
    case ACTIONS.MODIFY_USER:
      let user = action.payload;
      newState.user = user;
      return newState;

    case ACTIONS.REMOVE_USER:
      newState.user = {};
      return newState;

    case ACTIONS.SAVED_CARS_REQUESTED:
      newState.fetchingSavedCars = true;
      return newState;

    case ACTIONS.SAVED_CARS_RECEIVED:
      newState.fetchingSavedCars = false;
      newState.savedCars = action.payload;
      return newState;

    case ACTIONS.REMOVE_SAVED_CAR_REQUESTED:
      newState.fetchingSavedCars = true;
      return newState;

    case ACTIONS.REMOVE_SAVED_CAR_RECEIVED:
      newState.fetchingSavedCars = false;
      newState.savedCars = newState.savedCars.filter(x => x.vin !== action.payload);
      return newState;

    case ACTIONS.ADD_SAVED_CAR_REQUESTED:
      newState.fetchingSavedCars = true;
      return newState;

    case ACTIONS.ADD_SAVED_CAR_RECEIVED:
      newState.fetchingSavedCars = false;
      newState.savedCars = [...newState.savedCars, action.payload];
      return newState;

    default:
      return state;
  }
}

export default userReducer;



