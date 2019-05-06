import React from 'react';
import axios from 'axios';
import { ActionCableProvider, ActionCableConsumer } from 'react-actioncable-provider';
import ActionCable from 'actioncable';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import { CircularProgress } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import FilterPanel from '../../FilterPanel/FilterPanel';
import SortBar from '../../SortBar/SortBar';
import CarCard from '../../CarCard/CarCard';
import { ApiServer } from '../../../Defaults';
import './styles.css';
import PPGModal from '../../ppg-modal/PPGModal';

const qs = require('query-string');

const SidePanel = styled.div`
  max-width: 220px;
  width: 100%;
  display: flex;
  overflow: auto;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const CarSection = styled.div`
  height: calc(100%);
  padding-left: 10px;
  padding-right: 10px;
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
  overflow: hidden;
`;

const NotFoundWrapper = styled.div`
  width: 100%;
  padding: 24px;
  display: flex;
  justify-content: center;
`;

async function requestPrice(vin) {
  await axios.patch(`${ApiServer}/api/v1/car/price-request`, { vin });
}
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
      openModalFilter: false,
      showOtherOptionsInModalFilter: false,
      otherFiltersOptions: null,
    };

    this.getCars = this.getCars.bind(this);
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
          images[imagesObjs[j].f4] = `${url}?width=400&height=400&position=${imagesObjs[j].f4}`;
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
        <CarCard key={carObject.vin} car={carObject} requestFunction={requestPrice} />,
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

  onFilterChange = (/* params */) => {
    // TODO: Handle on filter change
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
    const response = JSON.parse(message);
    const carElements = [];
    for (let j = 0; j < cars.length; j += 1) {
      const { car } = cars[j].props;
      if (car.vin === response.vin) {
        car.wholePrice = response.mmr;
      }
      carElements.push(<CarCard key={car.vin} car={car} requestFunction={requestPrice} />);
    }
    this.setState({ cars: carElements, loaded: true });
  }

  render() {
    const {
      loaded,
      cars,
      carsSectionHeight,
      openModalFilter,
      showOtherOptionsInModalFilter,
      otherFiltersOptions,
    } = this.state;

    const { cookies } = this.props;
    this.cable = ActionCable.createConsumer(`${ApiServer}/cable?token=${cookies.get('token')}`);

    if (loaded && cars.length === 0) {
      // no cars found
      return (
        <NotFoundWrapper>
          <FormattedMessage id="marketplace.not-found" />
        </NotFoundWrapper>
      );
    }
    return (
      <div>
        <ActionCableProvider cable={this.cable}>
          <ActionCableConsumer
            channel="PriceQueryChannel"
            onReceived={this.handleReceived}
          />
          <MarketPlaceContainer>
            {
                loaded ? (
                  <SidePanel>
                    <MediaQuery minDeviceWidth={600}>
                      <FilterPanel
                        getCars={this.getCars}
                        availableArguments={this.state.availableArguments}
                        params={this.params}
                        onSeeAll={this.seeAllOptions}
                      />
                    </MediaQuery>
                  </SidePanel>
                ) : null
              }
            <CarSection ref={this.carsSection}>
              {
                  loaded ? (
                    <div style={{ overflow: 'hidden', position: 'relative' }}>
                      <SortBar header={this.params.q} filterPanelToggle={this.showFilterPanel} />
                      <hr />
                      <InfiniteScroll
                        dataLength={cars.length}
                        next={this.getCars}
                        hasMore
                        loader={(
                          <div style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            paddingTop: '10px',
                            height: '80px',
                            alignContent: 'center',
                          }}
                          >
                            <CircularProgress />
                          </div>
)}
                        height={carsSectionHeight - 80}
                        endMessage={(
                          <p style={{ textAlign: 'center' }}>
                            <b><FormattedMessage id="marketplace.end-message" /></b>
                          </p>
                        )}
                      >
                        {cars}
                      </InfiniteScroll>
                    </div>
                  ) : (
                    <div style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      paddingTop: '24px',
                      height: '80px',
                      alignContent: 'center',
                      marginTop: '8px',
                    }}
                    >
                      <CircularProgress />
                    </div>
                  )
                }
            </CarSection>
            <PPGModal
              setOpen={openModalFilter}
              handleClose={() => this.onCloseModal('openModalFilter')}
              width="80%"
              height="80%"
              setPadding={false}
              onBackAction={(otherFiltersOptions) ? this.quitOptionsFilters : undefined}
            >
              {/* Repeating this component here is not a performance issue. This child component,
                of the PPGModal is only rendered when the modal is open.  */}
              { !showOtherOptionsInModalFilter ? (
                <FilterPanel
                  getCars={this.getCars}
                  availableArguments={this.state.availableArguments}
                  params={this.params}
                  handleFilterChange={this.onFilterChange}
                  onSeeAll={this.seeAllOptions}
                />
              ) : (
                <div style={{ padding: '16px', height: '100%', overflowX: 'scroll' }}>
                  <input
                    className="border-0"
                    style={{
                      width: '300px',
                      padding: '10px',
                      marginBottom: '20px',
                      borderRadius: '5px',
                      boxShadow: '0rem 0rem 1rem rgba(0, 0, 0, 0.15)',
                    }}
                    placeholder="  Type search term"
                  />
                  {otherFiltersOptions}
                </div>
              )}
            </PPGModal>
          </MarketPlaceContainer>
        </ActionCableProvider>
      </div>
    );
  }
}

export default MarketPlacePage;
