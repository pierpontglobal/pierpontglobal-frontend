import React from 'react';
import axios from 'axios';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { connect } from 'react-redux';

import USER_ACTIONS from '../../../modules/user/action';
import MARKET_ACTIONS from '../../../modules/market/actions';
import SETTINGS_ACTIONS from '../../../modules/settings/actions';
import CarCard from './CarCard/CarCard';
import { ApiServer } from '../../../Defaults';
import { MarketPlaceLayout, FilterLayout, CarsHolder } from './MarketPlacePage.styles';
import { FilterMultiple } from './FilterBox/FilterBox'
import windowSize from 'react-window-size';

import SearchBox from './SearchBox/SearchBox';

async function requestPrice(vin) {
  await axios.patch(`${ApiServer}/api/v1/car/price-request`, { vin });
}

class MarketPlacePage extends React.Component {
  constructor(props) {
    super(props);

    this.cable = null;

    this.state = {
      hide: true,
      q: '',
      cars: [],
      availableArguments: {},
      loaded: false,
      page: 1,
      carsSectionHeight: window.innerHeight,
      size: 0,
      openModalFilter: false,
      showOtherOptionsInModalFilter: false,
      otherFiltersOptions: null,
    };

    this.getCars = this.getCars.bind(this);
    this.handleReceived = this.handleReceived.bind(this);

    this.carsSection = React.createRef();
  }

  componentWillMount = () => {
    this.shouldUseNewDesing();
  }

  componentDidMount() {
    this.props.onRef(this);
    this.getCars();
    window.addEventListener('load', () => {
      if (this.props.windowWidth > 768) {
        this.setState({ hide: false })
      }
    });
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  shouldUseNewDesing = () => {
    const { cookies, changeMarketDesign } = this.props;
    const itShould = cookies.get('switch_marketplace', { path: '/' });
    if (!!itShould && itShould === "on") {
      changeMarketDesign('new');
    } else {
      changeMarketDesign('old');
    }
  }

  handleBookmark = (carVin, bookmarked) => {
    const { addSavedCar, removeSavedCar } = this.props;
    if (bookmarked) {
      removeSavedCar(carVin).then(data => {
        this.toggleBookmarkedCar(carVin);
      });
    } else {
      addSavedCar(carVin).then(data => {
        this.toggleBookmarkedCar(carVin);
      });
    }
  }

  toggleBookmarkedCar = (carVin) => {
    this.getCars();
    let cars = [...this.state.cars];
    console.log(cars, carVin);
    cars.forEach(car => {
      if (car.props.car.vin === carVin) {
        car.props.car.bookmarked = !car.props.car.bookmarked
      }
    });
    this.setState({
      cars
    });
  }

  isCarAlreadySaved = (car, bookmarkedCars) => {
    let result = false;
    if (!!bookmarkedCars) {
      bookmarkedCars.forEach(bookmarkedCar => {
        if (car.car_information.vin === bookmarkedCar.vin) {
          result = true;
          return;
        };
      });
    }
    return result;
  }

  async getCars() {
    const { fetch, savedCars, useNewDesign } = this.props;
    const { page, size } = this.state;

    let str = '';

    Object.keys(this.state).forEach((key) => {
      if ((this.state[key] !== '' && this.state[key] !== null) && key !== '') {
        str += `&${key}=${encodeURIComponent(this.state[key])}`;
      }
    });
    str = str.substr(1, str.length);

    const response = await fetch(ApiServer, str, page, 20);
    const carsArray = !!response ? response.cars : [];
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
          images[imagesObjs[j].f4] = `${url}?width=400&height=400&position=${imagesObjs[j].f4}`;
        }
      }

      // Determine if the cars is already saved for the current user
      const bookmarked = this.isCarAlreadySaved(carsArray[i], savedCars);

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
        bookmarked: bookmarked,
        images,
        title: () => `${car.year} ${car.make} ${car.model} ${car.trimLevel}`,
      };
      carsGroup.push(carObject);
    }
    console.log(carsGroup);
    this.setState({ availableArguments: response.available_arguments, cars: carsGroup });
  }

  showFilterPanel = () => {
    this.setState({
      openModalFilter: true,
    });
  }

  onCloseModal = () => {
    this.setState({
      openModalFilter: false,
    });
  }

  seeAllOptions = (options) => {
    this.setState({
      showOtherOptionsInModalFilter: true,
      otherFiltersOptions: options,
    });
  }

  quitOptionsFilters = () => {
    this.setState({
      showOtherOptionsInModalFilter: false,
      otherFiltersOptions: null,
    });
  }

  handleReceived(message) {
    const { cars } = this.state;
    const { useNewDesign } = this.state;
    const response = JSON.parse(message);
    const carElements = [];
    for (let j = 0; j < cars.length; j += 1) {
      const { car } = cars[j].props;
      if (car.vin === response.vin) {
        car.wholePrice = response.mmr;
      }
      carElements.push(<CarCard useNewDesign={useNewDesign} handleBookmark={this.handleBookmark} key={car.vin} car={car} requestFunction={requestPrice} />);
    }
    this.setState({ cars: carElements, loaded: true });
  }

  render() {

    const { availableArguments, hide, cars } = this.state;

    const makerElements = tryGetArray(availableArguments, 'maker_name');
    const modelElements = tryGetArray(availableArguments, 'model_name');
    const trimElements = tryGetArray(availableArguments, 'trim');
    const yearElements = tryGetArray(availableArguments, 'year');
    const colorElements = tryGetArray(availableArguments, 'color');
    const engineElements = tryGetArray(availableArguments, 'engine');
    const transmisionElements = tryGetArray(availableArguments, 'transmission').map(
      (transmission) => transmission.element === 1 ? { element: 'Automatic', amount: transmission.amount } : { element: 'Manual', amount: transmission.amount }
    );
    const fuelElements = tryGetArray(availableArguments, 'fuel');
    const doorElements = tryGetArray(availableArguments, 'doors');
    const bodyElements = tryGetArray(availableArguments, 'body_type');

    return (
      <>
        <SearchBox toggleFilter={() => this.setState({ hide: !hide })} handelChange={(text) => { this.setState({ q: text }, () => this.getCars()); }} />
        <MarketPlaceLayout>
          <FilterLayout pose={hide ? 'hideF' : 'showF'}>
            <FilterMultiple onSelect={(selected) => { this.setState({ maker: selected }, () => this.getCars()); }} title={"Makers"} filterElements={makerElements} />
            <FilterMultiple onSelect={(selected) => { this.setState({ model: selected }, () => this.getCars()); }} title={"Models"} filterElements={modelElements} />
            <FilterMultiple onSelect={(selected) => { this.setState({ trim: selected }, () => this.getCars()); }} title={"Trims"} filterElements={trimElements} />
            <FilterMultiple onSelect={(selected) => { this.setState({ year: selected }, () => this.getCars()); }} title={"Years"} filterElements={yearElements} />
            <FilterMultiple onSelect={(selected) => { this.setState({ color: selected }, () => this.getCars()); }} title={"Colors"} filterElements={colorElements} />
            <FilterMultiple onSelect={(selected) => { this.setState({ engine: selected }, () => this.getCars()); }} title={"Engines"} filterElements={engineElements} />
            <FilterMultiple onSelect={(selected) => { this.setState({ transmission: selected.map((transmission) => (transmission === 'Automatic' ? 'automatic' : 'manual')) }, () => this.getCars()); }} title={"Transmissions"} filterElements={transmisionElements} />
            <FilterMultiple onSelect={(selected) => { this.setState({ fuel: selected }, () => this.getCars()); }} title={"Fuels"} filterElements={fuelElements} />
            <FilterMultiple onSelect={(selected) => { this.setState({ doors: selected }, () => this.getCars()); }} title={"Doors"} filterElements={doorElements} />
            <FilterMultiple onSelect={(selected) => { this.setState({ body_type: selected }, () => this.getCars()); }} title={"Car Types"} filterElements={bodyElements} />
          </FilterLayout>
          <CarsHolder>
            {cars.map((car) => <CarCard></CarCard>)}
          </CarsHolder>
          <ActionCableConsumer
            channel="PriceQueryChannel"
            onReceived={this.handleReceived}
          />
        </MarketPlaceLayout>
      </>
    );
  }
}

function tryGetArray(structure, target) {
  try {
    return structure[target].buckets.map((item) => ({ element: item.key, amount: item.doc_count }));
  } catch {
    return [];
  }
}

// Redux Config
const mapStateToProps = state => ({
  cars: state.marketReducer.cars,
  savedCars: state.userReducer.savedCars,
  useNewDesign: state.settingsReducer.useNewDesign,
});
const mapDispatchToProps = dispatch => ({
  fetch: (ApiServer, str, page, pageSize) => dispatch(MARKET_ACTIONS.fetchCars(ApiServer, str, page, pageSize)),
  fetchBookmarked: ApiServer => dispatch(MARKET_ACTIONS.fetchBookmarked(ApiServer)),
  add: car => dispatch(MARKET_ACTIONS.addCar(car)),
  remove: vin => dispatch(MARKET_ACTIONS.removeCar(vin)),
  update: car => dispatch(MARKET_ACTIONS.modifyCar(car)),
  addSavedCar: vin => dispatch(USER_ACTIONS.addSavedCar(vin)),
  removeSavedCar: vin => dispatch(USER_ACTIONS.removeSavedCar(vin)),
  changeMarketDesign: toChange => dispatch(SETTINGS_ACTIONS.changeMarketDesign(toChange))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(windowSize(MarketPlacePage));
