import React from 'react';
import axios from 'axios';
import AppNav from '../../AppNav/AppNav';
import FilterPanel from '../../FilterPanel/FilterPanel';
import SortBar from '../../SortBar/SortBar';
import CarCard from '../../CarCard/CarCard';
import UnderLine from '../../Underline/Underline';
import { ApiServer } from '../../../Defaults';
import defaultImage from './not_available.jpg';

const qs = require('query-string');

class MarketPlacePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cars: [], availableArguments: [] };

    this.getCars = this.getCars.bind(this);
    this.params = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
  }

  componentDidMount() {
    this.getCars();
  }

  async getCars() {
    try {
      const carsGroup = [];
      const response = await axios.get(`${ApiServer}/api/v1/car/query?limit=10&q=${this.params.q || '*'}`);
      const carsArray = response.data.cars;
      this.setState({
        availableArguments: response.data.available_arguments,
      });

      for (let i = 0; i < carsArray.length; i += 1) {
        const car = carsArray[i];
        let images = [];
        const imagesObjs = car.car_information.images;

        for (let j = 0; j < imagesObjs.length; j += 1) {
          const url = imagesObjs[j].f3;
          if (url === null) {
            images.push(defaultImage);
          } else {
            images.push(`${url}?width=354&height=200`);
          }
        }

        images = images.reverse();

        carsGroup.push({
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
        });
      }
      this.setState({ cars: carsGroup });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <AppNav location={this.props.location} cookies={this.props.cookies} />
        <div className="d-flex justify-content-center">
          <div
            className="ml-auto d-none d-lg-flex mr-3 w-100"
            style={{ maxWidth: '260px' }}
          >
            <FilterPanel availableArguments={this.state.availableArguments} />
          </div>
          <div
            className="mr-auto ml-md-auto ml-lg-0 w-100"
            style={{ maxWidth: '810px', paddingBottom: '60px' }}
          >
            <UnderLine>
              <SortBar header={this.params.q} />
            </UnderLine>
            {
              this.state.cars.map(
                car => <CarCard key={car.vim} car={car} />,
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default MarketPlacePage;
