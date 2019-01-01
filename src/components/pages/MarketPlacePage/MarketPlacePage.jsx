import React from 'react';
import axios from 'axios';
import AppNav from '../../AppNav/AppNav';
import FilterPanel from '../../FilterPanel/FilterPanel';
import SortBar from '../../SortBar/SortBar';
import CarCard from '../../CarCard/CarCard';
import UnderLine from '../../Underline/Underline';
import { ApiServer } from '../../../Defaults';

class MarketPlacePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cars: [] };
  }

  componentDidMount() {
    this.getCars();
  }

  async getCars() {
    try {
      const response = await axios.get(`${ApiServer}/api/v1/car/query?limit=10`);
      const carsGroup = [];
      const carsArray = response.data.cars;
      console.log(carsArray);

      for (let i = 0; i < 10; i += 1) {
        const car = carsArray[i];
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
          bodyStyle: car.car_information.car_body_style ? car.car_information.car_body_style : 'Not available',
          doors: car.car_information.doors ? car.car_information.doors : 'Not available',
          vehicleType: car.car_information.car_type_code ? car.car_information.car_type_code : 'Not available',
          score: '2.0',
          price: '$ 21 975',
          saleDate: '01/ 20 / 2017 (Cutoff) 9:00 AM ET',
          images: [
            'https://static.cargurus.com/images/site/2015/05/29/11/43/2015_hyundai_santa_fe_2_0t_sport-pic-4662568588414365370-640x480.jpeg',
            'https://static.cargurus.com/images/site/2018/08/12/15/45/2015_hyundai_santa_fe_sport_2_4l_fwd-pic-1449050980195395017-640x480.jpeg',
            'https://static.cargurus.com/images/site/2015/03/17/18/44/2015_hyundai_santa_fe_sport-pic-3111940996015372984-640x480.jpeg',
          ],
          title: () => `${car.year} ${car.make} ${car.model} ${car.trimLevel}`,
        });
        console.log(car.car_information);
      }
      this.setState({ cars: carsGroup });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <AppNav />
        <div className="d-flex justify-content-center">
          <div
            className="ml-auto d-none d-lg-flex mr-3 w-100"
            style={{ maxWidth: '260px' }}
          >
            <FilterPanel />
          </div>
          <div
            className="mr-auto ml-md-auto ml-lg-0 w-100"
            style={{ maxWidth: '810px' }}
          >
            <UnderLine>
              <SortBar header="Tet" />
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
