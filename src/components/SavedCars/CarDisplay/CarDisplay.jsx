import React, { Component } from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import { withRouter } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import CloseMuiIcon from '@material-ui/icons/Close';
import axios from 'axios';
import ApplicationRoutes from '../../../constants/Routes';
import { ApiServer } from '../../../Defaults';

const CarDisplayWrapper = styled.div`
  width: 100%;
  min-height: 80px;
  max-height: 80px;
  overflow: hidden;
  background-color: rgb(140, 140, 140, 0.7);
  display: grid;
  grid-template-columns: 30% 70%;
  position: relative;
  opacity: 0;
  bottom: 80px;
  box-shadow: 0px 0px 2px 0px rgb(0, 0, 0, 0.1);
  animation: 0.55s slide-in ease-in-out ${props => props.delay ? props.delay : '0s'};
  animation-fill-mode: forwards;
  margin-bottom: 16px;
  @keyframes slide-in {
    0% {
      opacity: 0;
      bottom: 80px;
    }
    100% {
      opacity: 1;
      position: inline-block;
    }
  }
`;

const CarImage = styled.div`
  width: 100%;
  height: 100%;
  & > img {
    width: 100%;
    height: 80px;
    background-position: cover;
  }
`;

const CarInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CarTitle = styled.div`
  width: 100%;
  text-align: left;
  padding-left: 8px;
  & > span {
    font-weight: 600;
    color: white;
    & > span {
      font-weight: 200;
    }
  }
`;

const CloseIcon = styled(CloseMuiIcon)`
  color: #fff;
`;

const CloseIconWrapper = styled.div`
  position: absolute;
  right: 2px;
  top: 2px;
  cursor: pointer;
  z-index: 100;
`;

class CarDisplay extends Component {

  goToCarDetail = (node, vin) => {
    if (node.target.tagName !== 'path' && node.target.tagName !== 'svg') {
      this.props.handleClose();
      this.props.history.push(`${ApplicationRoutes.carPage}?vin=${vin}`);
    }
  }

  removeSavedCar = (carId) => {
    axios.delete(`${ApiServer}/api/v1/car/delete?car_id=${carId}`).then(data => {
      this.props.updateCarList(carId);
    });
  }

  render() {
    const { delay, car, } = this.props;
    return(
      <CarDisplayWrapper delay={delay} onClick={(node) => this.goToCarDetail(node, car.vin)}>
        <CloseIconWrapper id="close-button" onClick={() => this.removeSavedCar(car.id)}>
          <CloseIcon />
        </CloseIconWrapper>
        <CarImage>
          <img src={car.photo} alt={`Pierpont global | ${car.model.name} ${car.model.maker.name} ${car.year} ${car.engine}`} />
        </CarImage>
        <CarInfo>
          <CarTitle>
            <span>{ car.model.maker.name } - <span>{ car.model.name }</span></span>
          </CarTitle>
          <div style={{ paddingLeft: '8px' }}>
            <div>
              <span style={{ color: '#fff' }}>{ car.year } | { car.engine }</span>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#e2e2e2' }}><b>VIN: </b>{ car.vin }</span>
            </div>
          </div>
        </CarInfo>
      </CarDisplayWrapper>
    );
  }
}

export default withRouter(CarDisplay);
