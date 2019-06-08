import ActionTypes from './actionTypes';
import axios from 'axios';
import {ApiServer} from '../../Defaults';

const createUser = user => ({
  type: ActionTypes.CREATE_USER,
  payload: user
});

const modifyUser = (user) => ({
  type: ActionTypes.MODIFY_USER,
  payload: user
});

const removeUser = () => ({
  type: ActionTypes.REMOVE_USER,
  payload: {}
});

const removeSavedCar = (carVin) => {
  return function(dispatch) {
    dispatch({
      type: ActionTypes.REMOVE_SAVED_CAR_REQUESTED,
      payload: {}
    });

    return axios.delete(`${ApiServer}/api/v1/car/delete?vin=${carVin}`)
      .then(data => {
        dispatch({
          type: ActionTypes.REMOVE_SAVED_CAR_RECEIVED,
          payload: carVin
        });
        return data;
      })
  }
}

const addSavedCar = (carVin) => {
  return function(dispatch) {
    dispatch({
      type: ActionTypes.ADD_SAVED_CAR_REQUESTED,
      payload: {}
    });

    return axios.post(`${ApiServer}/api/v1/car/save`, { vin: carVin })
      .then(data => {

        let withPhoto = {
          ...data.data.car.car_information,
          ...data.data.car.sale_information,
          photo: data.data.car.car_information.images.filter(img => img.f5 === 'FRONTLEFT')[0].f3
        }

        dispatch({
          type: ActionTypes.ADD_SAVED_CAR_RECEIVED,
          payload: withPhoto,
        });
        return withPhoto;
      })
  }
}

const fetchSavedCars = () => {
  return function(dispatch) {
    dispatch({
      type: ActionTypes.SAVED_CARS_REQUESTED,
      payload: {}
    });
    
    return axios.get(`${ApiServer}/api/v1/user/saved_cars`)
      .then(
        data => {
          // Sample purposes
          let withPhoto = data.data.cars.map(car => {
            return {
              ...car,
              photo: car.car_images.filter(img => img.f5 === 'FRONTLEFT')[0].f3,
            }
          });
          dispatch({
            type: ActionTypes.SAVED_CARS_RECEIVED,
            payload: withPhoto,
          });
          return withPhoto;
        },
        error => console.log(error.response)
      )
  }
}

export default {
  createUser,
  modifyUser,
  removeUser,
  fetchSavedCars,
  removeSavedCar,
  addSavedCar
};