import React from 'react';
import axios from 'axios';
import { ActionCableProvider } from 'react-actioncable-provider';
import ActionCable from 'actioncable';
import AppNav from '../../AppNav/AppNav';
import CarDetailCard from '../../CarDetailCard/CarDetailCard';
import CarDetailTable from '../../CarDetailTable/CarDetailTable';
import BidPanel from '../../BidPanel/BidPanel';
import LocationBar from '../../LocationBar/LocationBar';
import CarBottomNav from '../../CarBottomNav/CarBottomNav';
import CarCarousel from '../../CarCarousel/CarCarousel';
import UserBidCard from '../../UserBidCard/UserBidCard';
import { ApiServer } from '../../../Defaults';

const qs = require('query-string');

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

class CarBidPage extends React.Component {
  constructor(props) {
    super(props);

    this.cable = null;

    const {
      userBid,
      cookies,
    } = this.props;

    this.state = {
      car: {
        images: [],
        title: () => '',
      },
      userBid,
      cookies,
    };

    this.getCarInfo = this.getCarInfo.bind(this);
    this.getBids = this.getBids.bind(this);
    this.updateUserBidCallback = this.updateUserBidCallback.bind(this);
  }

  componentDidMount() {
    const parameters = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    this.getCarInfo(parameters.vin);
  }

  async getBids(carId) {
    const response = (await axios.get(`${ApiServer}/api/v1/car/bid?car_id=${carId}`)).data;
    console.log(response);
    this.setState({
      userBid: parseFloat(response.amount),
    });
  }

  async getCarInfo(vin) {
    const response = await axios.get(`${ApiServer}/api/v1/car?vin=${vin}`);
    const carInfo = response.data.car_information;
    const saleInfo = response.data.sale_information;

    this.getBids(carInfo.id);
    this.setState({
      car: {
        id: carInfo.id,
        year: carInfo.year,
        maker: carInfo.car_maker,
        model: carInfo.car_model,
        title: `${carInfo.year ? carInfo.year : 'x'}
        ${carInfo.car_maker ? carInfo.car_maker : ''}
        ${carInfo.car_model ? carInfo.car_model : ''}
        ${carInfo.trim ? carInfo.trim : ''}`,
        saleDate: `${new Date(saleInfo.auction_start_date).toLocaleString()}`,
        vin: carInfo.vin,
        trim: carInfo.trim,
        odometer: `${carInfo.odometer} ${carInfo.odometer_unit}`,
        engine: carInfo.engine,
        transmission: carInfo.transmission ? 'Automatic' : 'Manual',
        fuelType: carInfo.car_fuel,
        doors: carInfo.doors,
        exteriorColor: carInfo.color_name_exterior,
        interiorColor: carInfo.color_name_interior,
        score: carInfo.cr,
        carBodyStyle: carInfo.car_body_style,
        carType: carInfo.car_type_code,
        vehicleType: carInfo.car_vehicle_type,
        displacement: carInfo.displacement,
        images: carInfo.images.reverse().map(image => (image.f3)),
        location: saleInfo.action_location,
        wholePrice: saleInfo.whole_price,
      },
    });
  }

  updateUserBidCallback(userBid) {
    this.setState({
      userBid,
    });
  }

  render() {
    const {
      userBid,
      cookies,
    } = this.state;

    const { car } = this.state;
    this.cable = ActionCable.createConsumer(`${ApiServer}/cable?token=${cookies.get('token')}`);

    return (
      <div>
        <ActionCableProvider cable={this.cable}>
          <AppNav cookies={cookies} />
          <div style={{ marginTop: '-15px' }} className="d-flex justify-content-center">
            <div style={{ width: '300px' }} className="d-flex flex-column mr-3">
              <CarDetailCard car={car} />
              <CarDetailTable car={car} />
            </div>
            <div
              className="d-flex flex-column"
              style={{ width: '720px' }}
            >
              {userBid !== undefined
                ? <UserBidCard bid={userBid} />
                : <BidPanel updateUserBidCallback={this.updateUserBidCallback} carId={car.id} vin={car.vin} saleDate={car.saleDate} wholePrice={car.wholePrice} />}
              <LocationBar
                currentLocation={car.location}
                transportPrice="277"
                to="to Port Miami, FL"
              />
              <CarCarousel images={car.images} />
            </div>
          </div>
          <CarBottomNav
            prev={car}
            next={car}
          />
        </ActionCableProvider>
      </div>
    );
  }
}

export default CarBidPage;
