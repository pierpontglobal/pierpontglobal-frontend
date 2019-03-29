import React from 'react';
import axios from 'axios';
import { ActionCableProvider, ActionCableConsumer } from 'react-actioncable-provider';
import ActionCable from 'actioncable';
import InfiniteScroll from 'react-infinite-scroll-component';
import FilterPanel from '../../FilterPanel/FilterPanel';
import SortBar from '../../SortBar/SortBar';
import CarCard from '../../CarCard/CarCard';
import { ApiServer } from '../../../Defaults';
import './styles.css';

const qs = require('query-string');

class MarketPlacePage extends React.Component {
  constructor(props) {
    super(props);

    this.cable = null;

    this.params = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    const { cookies } = this.props;

    this.state = {
      cars: [],
      availableArguments: [],
      loaded: false,
      page: this.params.page ? this.params.page : 0,
      total: 1,
      token: cookies.get('token'),
    };

    this.getCars = this.getCars.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.requestPrice = this.requestPrice.bind(this);
    this.handleReceived = this.handleReceived.bind(this);
  }

  componentDidMount() {
    this.getCars();
  }

  onPageChange(e, i) {
    const page = (i.activePage - 1);
    this.setState({ page }, () => {
      this.getCars();
    });
  }

  async getCars() {
    try {
      let str = '';

      this.params = qs.parse(window.location.search, { ignoreQueryPrefix: true });
      for (const key in this.params) {
        if (this.params[key] !== '' && key !== 'page') {
          str += `&${key}=${encodeURIComponent(this.params[key])}`;
        }
      }

      const { page, total } = this.state;
      const offset = page * 20;

      window.history.pushState(null, 'Marketplace', `/marketplace?page=${page}${str}`);

      const carsGroup = [];
      const response = await axios.get(`${ApiServer}/api/v1/car/query?limit=20&${str}&offset=${offset}`);
      const carsArray = response.data.cars;

      const newTotal = Math.ceil(parseFloat(response.data.size / 20));
      if (total !== newTotal) {
        this.setState({
          availableArguments: response.data.available_arguments,
          total: newTotal,
          page: 0,
        });
      } else {
        this.setState({
          availableArguments: response.data.available_arguments,
          total: newTotal,
        });
      }

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
      this.setState({ cars: carsGroup, loaded: true });
      this.forceUpdate();
    } catch (error) {
      console.log(error.response);
    }
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
      carElements.push(<CarCard key={car.vim} car={car} requestFuntion={this.requestPrice} />);
    }
    this.setState({ cars: carElements, loaded: true });
  }

  async requestPrice(vin) {
    await axios.patch(`${ApiServer}/api/v1/car/price-request`, { vin });
  }

  render() {
    const {
      loaded, page, total, cars,
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
          <div
            style={{
              height: '100%',
              position: 'fixed',
              margin: '0 auto',
              right: '0',
              left: '0',
            }}
            className="d-flex justify-content-center"
          >
            <div
              className="ml-auto d-none d-lg-flex mr-3 w-100"
              style={{ maxWidth: '260px' }}
            >
              { loaded ? (
                <FilterPanel
                  getCars={this.getCars}
                  availableArguments={this.state.availableArguments}
                  params={this.params}
                />
              ) : <div />}
            </div>
            <div
              className="mr-auto ml-md-auto ml-lg-0 w-100"
              style={{
                maxWidth: '810px',
                paddingBottom: '120px',
                paddingLeft: '10px',
                paddingRight: '10px',
              }}
            >
              <div style={{
                padding: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'center', justifyItems: 'center',
              }}
              >
                <SortBar header={this.params.q} />
              </div>
              <hr />
              <div style={{ overflow: 'auto', height: '100%' }}>
                <InfiniteScroll
                  dataLength={total} // This is important field to render the next data
                  next={this.getCars}
                  hasMore
                  loader={<h4>Loading...</h4>}
                  endMessage={(
                    <p style={{ textAlign: 'center' }}>
                      <b>Yay! You have seen it all</b>
                    </p>
)}
  // below props only if you need pull down functionality
                  refreshFunction={this.getCars}
                  pullDownToRefresh
                  pullDownToRefreshContent={
                    <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
  }
                  releaseToRefreshContent={
                    <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
  }
                >
                  {cars}
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </ActionCableProvider>
      </div>
    );
  }
}

export default MarketPlacePage;
