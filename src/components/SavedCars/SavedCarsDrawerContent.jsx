import React, { Component } from 'react';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import ArrowMuiIcon from '@material-ui/icons/NavigateNext';
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';
import CarDisplay from './CarDisplay/CarDisplay';
import { ApiServer } from '../../Defaults';

const Wrapper = styled.div`
  max-width: 400px;
  min-width: 400px;
  height: 100vh;
  background-color: #303030;
  position: relative;
  z-index: 2000;
`;

const Title = styled.div`
  margin-top: 24px;
  margin-bottom: 16px;
  text-align: center;
  & > span {
    color: white;
    font-size: 1.25rem;
  }
`;

const HideButton = styled(IconButton)`
  position: absolute;
  top: 0px;
  left: 0px;
`;

const ArrowIcon = styled(ArrowMuiIcon)`
  color: white;
`;

const CarList = styled.div`
  width: 100%;
  margin-top: 62px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const EmptyListMessage = styled.div`
  width: 100%;
  margin-top: 32px;
  text-align: center;
  position: relative;
  & > span {
    color: white;
    opacity: 0;
    position: absolute;
    left: -20px;
    font-size: 1.05rem;
    animation: 0.8s appears ease-in-out;
    animation-fill-mode: forwards;
  }

  @keyframes appears {
    0% {
      opacity: 0;
      left: -20px;
    }
    60% {
      left: 20px;
    }
    100% {
      opacity: 1;
      right: 0px;
      left: 0px;
    }
  }
`

class SavedCarsDrawerContent extends Component {
  state = {
    cars: [],
    loading: true,
  }

  componentDidMount = () => {
    axios.get(`${ApiServer}/api/v1/user/saved_cars`).then(data => {

      // Sample purposes
      let withPhoto = data.data.cars.map(car => {
        return {
          ...car,
          photo: 'https://photos.smugmug.com/Sample-Galleries/Auto-Advertorial-Lifestyle/i-fvB2gGh/4/a319f256/L/2016%20Avis%20-%20BMW%20328i%20Lifestyle%20073A%20-%20Deremer%20Studios%20LLC-L.jpg'
        }
      })

      this.setState({
        cars: withPhoto,
        loading: false,
      });
    });
  }

  updateCarList = (carId) => {
    console.log('will updte with');
    let cars = this.state.cars.filter(x => x.id !== carId);
    console.log(cars);
    this.setState({
      cars: cars
    });
  }

  render() {
    const { cars, loading } = this.state;
    console.log(cars);
    return(
      <>
        <Wrapper>
          <HideButton onClick={this.props.handleClose}>
            <ArrowIcon />
          </HideButton>
          <Title>
            <span>My saved cars</span>
          </Title>
          {
            loading ? <LinearProgress /> : cars.length === 0 ? <EmptyListMessage><span>No saved cars yet.</span></EmptyListMessage> : (
              (
                <CarList>
                  {
                    cars.map((car, index) => (
                      <CarDisplay car={car} delay={`${index * 0.2}s`} handleClose={this.props.handleClose} updateCarList={this.updateCarList} />
                    ))
                  }
                </CarList>
            ))
          }
        </Wrapper>
      </>
    );
  }
}

export default SavedCarsDrawerContent;