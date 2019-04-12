import React from 'react';
import axios from 'axios';
import { ActionCableProvider, ActionCableConsumer } from 'react-actioncable-provider';
import ActionCable from 'actioncable';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import FilterPanel from '../../FilterPanel/FilterPanel';
import SortBar from '../../SortBar/SortBar';
import CarCard from '../../CarCard/CarCard';
import { ApiServer } from '../../../Defaults';
import './styles.css';

const qs = require('query-string');

const SidePanel = styled.div`
  max-width: 220px;
  width: 100%;
  display: none;


@media only screen and (min-width: 600px) {
}
  
@media only screen and (min-width: 768px) {
  display: flex;
}
`;

const CarSection = styled.div`
  height: 95vh;
  padding-left: 10px;
  padding-right: 10px;
  overflow: scroll;
  -ms-overflow-style: -ms-autohiding-scrollbar;
`;

const MarketPlaceContainer = styled.div`
  display: flex;
  align-items: stretch;
  height: 100%;
  margin: 0 auto;
  left: 0;
  right: 0;
  max-width: 1200px;
  justify-content: center;

`;

class MarketPlacePage extends React.Component {
  constructor(props) {
    super(props);

    this.cable = null;

    this.params = qs.parse(window.location.search, { ignoreQueryPrefix: true });

    this.state = {
      cars: [],
      availableArguments: [],
      loaded: false,
      page: 1,
      carsSectionHeight: 0,
      size: 0,
    };

    this.getCars = this.getCars.bind(this);
    this.requestPrice = this.requestPrice.bind(this);
    this.handleReceived = this.handleReceived.bind(this);

    this.carsSection = React.createRef();
  }

  componentDidMount() {
    this.getCars();
  }

  async getCars() {
    let str = '';
    this.params = qs.parse(window.location.search, { ignoreQueryPrefix: true });

    const { page, size } = this.state;

    Object.keys(this.params).forEach((key) => {
      if (this.params[key] !== '' && key !== 'page') {
        str += `&${key}=${encodeURIComponent(this.params[key])}`;
      }
    });

    window.history.pushState(null, 'Marketplace', `/marketplace?${str}`);
    const response = await axios.get(`${ApiServer}/api/v1/car/query?${str}&limit=${page * 20}&offset=0`);
    const carsArray = response.data.cars;
    const carsGroup = [];

    for (let i = 0; i < carsArray.length; i += 1) {
      const car = carsArray[i];
      const images = [];
      const imagesObjs = car.car_information.images;

      for (let j = 0; j < imagesObjs.length; j += 1) {
        const url = imagesObjs[j].f3;
        if (url === null) {
          images.push('/not-an-image.jk');
        } else {
          images[imagesObjs[j].f4] = `${url}?width=354&height=200&position=${imagesObjs[j].f4}`;
        }
      }

      const carObject = {
        wholePrice: car.sale_information.whole_price,
        crUrl: car.car_information.cr_url,
        year: car.car_information.year,
        make: car.car_information.car_maker,
        model: car.car_information.car_model,
        trimLevel: car.car_information.trim,
        odometer: `${car.car_information.odometer} mi`,
        fuelType: car.car_information.car_fuel,
        engine: car.car_information.engine,
        displacement: car.car_information.displacement,
        transmission: car.car_information.transmission ? 'Automatic' : 'Manual',
        interiorColor: car.car_information.color_name_interior,
        exteriorColor: car.car_information.color_name_exterior,
        vin: car.car_information.vin,
        cr: car.car_information.cr,
        bodyStyle: car.car_information.car_body_style ? car.car_information.car_body_style : 'Not available',
        doors: car.car_information.doors ? car.car_information.doors : 'Not available',
        vehicleType: car.car_information.car_type_code ? car.car_information.car_type_code : 'Not available',
        price: car,
        saleDate: Date.parse(car.sale_information.auction_start_date),
        images,
        title: () => `${car.year} ${car.make} ${car.model} ${car.trimLevel}`,
      };

      carsGroup.push(
        <CarCard key={carObject.vim} car={carObject} requestFuntion={this.requestPrice} />,
      );
    }

    this.setState({
      cars: carsGroup,
      page: page + 1,
      availableArguments: response.data.available_arguments,
      loaded: true,
      carsSectionHeight: this.carsSection.current.offsetHeight,
      size: response.data.size,
    }, () => {
      if (this.state.size !== size) {
        this.carsSection.current.scrollTop = 0;
      }
    });
  }

  handleReceived(message) {
    const { cars } = this.state;
    const response = JSON.parse(message);
    const carElements = [];
    for (let j = 0; j < cars.length; j += 1) {
      const car = cars[j].props.car;
      if (car.vin === response.vin) {
        car.wholePrice = response.mmr;
      }
      carElements.push(<CarCard key={car.vim} car={car} requestFunction={this.requestPrice} />);
    }
    this.setState({ cars: carElements, loaded: true });
  }

  async requestPrice(vin) {
    await axios.patch(`${ApiServer}/api/v1/car/price-request`, { vin });
  }

  render() {
    const {
      loaded, cars, carsSectionHeight,
    } = this.state;

    const { cookies } = this.props;
    this.cable = ActionCable.createConsumer(`${ApiServer}/cable?token=${cookies.get('token')}`);

    return (
      <div>
        <ActionCableProvider cable={this.cable}>
          <ActionCableConsumer
            channel="PriceQueryChannel"
            onReceived={this.handleReceived}
          />
          <MarketPlaceContainer>
            <SidePanel>
              {loaded ? (
                <FilterPanel
                  getCars={this.getCars}
                  availableArguments={this.state.availableArguments}
                  params={this.params}
                />
              ) : <div />}
            </SidePanel>
            <CarSection ref={this.carsSection}>
              <div style={{ overflow: 'auto', position: 'relative' }}>
                <SortBar header={this.params.q} />
                <hr />
                <InfiniteScroll
                  dataLength={cars.length}
                  next={this.getCars}
                  hasMore
                  loader={<h4>Loading...</h4>}
                  height={carsSectionHeight - 80}
                  endMessage={(
                    <p style={{ textAlign: 'center' }}>
                      <b>Yay! You have seen it all</b>
                    </p>
                  )}
                >
                  {cars}
                </InfiniteScroll>
              </div>
            </CarSection>
          </MarketPlaceContainer>
        </ActionCableProvider>
      </div>
    );
  }
}

export default MarketPlacePage;
