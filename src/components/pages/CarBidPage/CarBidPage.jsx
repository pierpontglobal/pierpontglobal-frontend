import React from 'react';
import axios from 'axios';
import { ActionCableProvider } from 'react-actioncable-provider';
import ActionCable from 'actioncable';
import CarDetailCard from '../../CarDetailCard/CarDetailCard';
import CarDetailTable from '../../CarDetailTable/CarDetailTable';
import BidPanel from '../../BidPanel/BidPanel';
import LocationBar from '../../LocationBar/LocationBar';
import CarBottomNav from '../../CarBottomNav/CarBottomNav';
import CarCarousel from '../../CarCarousel/CarCarousel';
import UserBidCard from '../../UserBidCard/UserBidCard';
import { ApiServer } from '../../../Defaults';
import TabsComponent from '../../Tabs/TabsComponent';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import Info from '@material-ui/icons/Info';

const qs = require('query-string');

const SideMenuWrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  margin: 0 15px;
  @media only screen and (max-width: 1224px){
    width: 100%;
  }
`;

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

    const firstTabContent = (
      <div>
        <div style={{ marginTop: '-15px' }} style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
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
      </div>
    );

    const secondTabContent = (
      <div style={{ width: '100%' }} className="d-flex flex-column mr-3">
        <CarDetailCard car={car} />
        <CarDetailTable car={car} />
      </div>
    );

    const tabOptions = [
      {
        label: 'Preview',
        item: firstTabContent,
        icon: <DirectionsCar />,
      },
      {
        label: 'Specifications',
        item: secondTabContent,
        icon: <Info />,
      },
    ];

    return (
      <div>
        <ActionCableProvider cable={this.cable}>
          <MediaQuery minDeviceWidth={1224}>
            <React.Fragment>
              <div style={{ marginTop: '-15px' }} className="d-flex justify-content-center">
                <SideMenuWrapper>
                  <CarDetailCard car={car} />
                  <CarDetailTable car={car} />
                </SideMenuWrapper>
                <div
                  style={{ display: 'flex', flexDirection: 'column' }}
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
            </React.Fragment>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={1224}>
            <TabsComponent options={tabOptions} />
          </MediaQuery>
        </ActionCableProvider>
      </div>
    );
  }
}

export default CarBidPage;
