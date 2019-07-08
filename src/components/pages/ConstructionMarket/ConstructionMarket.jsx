import React from 'react';
import styled from 'styled-components';
import { AppNavHeight } from '../../../constants/ApplicationSettings';
import { CircularProgress } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';
import ConstructionFilter from './ConstructionFilter/ConstructionFilter';
import VehicleCard from './VehicleCard/VehicleCard';
import { withRouter } from 'react-router-dom';
import ConstructionMarketDetail from './ConstructionMarketDetail/ConstructionMarketDetail';
import ApplicationRoutes from '../../../constants/Routes';

const Wrapper = styled.div`
  width: 100%;
  height: ${props => `calc(100vh - ${AppNavHeight}px)`};
  display: grid;
  grid-template-rows: 60px auto;
  grid-template-columns: 300px auto;
  grid-template-areas:
  "sidebar mainTitle"
  "sidebar main";
  margin-top: 24px;

  @media only screen and (max-width: 480px) {
    grid-template-columns: auto;
    grid-auto-rows: 1fr auto;
    grid-template-areas:
    "searchMobile"
    "main";
  }
`;

const SearchBarMobile = styled.div`
  grid-area: searchMobile;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (min-width: 481px) {
    display: none;
  }
`;

const Sidebar = styled.div`
  grid-area: sidebar;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: auto;
  @media only screen and (max-width: 480px) {
    display: none;
  }
`;

const MainContent = styled.div`
  grid-area: main;
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: auto;
`;

const MainTitle = styled.div`
  grid-area: mainTitle;
  width: 100%;
  height: 100%;
  padding: 16px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  & > span { 
    font-size: 1.72rem;
    font-weight: 400;
  }
`;

const VehiclesWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  overflow: auto;
  max-height: 100%;

`;

const FilterList = styled.div`
  width: 100%;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  padding-right: 16px;
`;

const SidebarTitle = styled.div`
  padding: 16px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    font-size: 1.24rem;
    font-weight: 600;
  }
`;

class ConstructionMarket extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      totalVehicles: 600,
      vehicles: [
        {
          title: '2010 Advance Captor 4800',
          serial: '1000036401',
          location: 'CHICAGO, IL',
          type: 'Other Equipment',
          category: 'Other Equipment',
          subCategory: '750-1115 Sweeper/Scrubber Ride On',
          description: 'Sweeper/Scrubber Ride On',
          equipmentId: '1143538',
          mainImage: 'https://images.rouseservices.com/ImageProcessor/get/getimage.aspx?type=ItemDetailBig&guid=cee289fe-9893-5758-1e8f-156ba5e400ba'
        },
        {
          title: '2010 Advance Captor 4800',
          serial: '1000036401',
          location: 'CHICAGO, IL',
          type: 'Other Equipment',
          category: 'Other Equipment',
          subCategory: '750-1115 Sweeper/Scrubber Ride On',
          description: 'Sweeper/Scrubber Ride On',
          equipmentId: '1143538',mainImage: 'https://images.rouseservices.com/ImageProcessor/get/getimage.aspx?type=ItemDetailBig&guid=cee289fe-9893-5758-1e8f-156ba5e400ba'
        },
        {
          title: '2010 Advance Captor 4800',
          serial: '1000036401',
          location: 'CHICAGO, IL',
          type: 'Other Equipment',
          category: 'Other Equipment',
          subCategory: '750-1115 Sweeper/Scrubber Ride On',
          description: 'Sweeper/Scrubber Ride On',
          equipmentId: '1143538',mainImage: 'https://images.rouseservices.com/ImageProcessor/get/getimage.aspx?type=ItemDetailBig&guid=cee289fe-9893-5758-1e8f-156ba5e400ba'
        },
        {
          title: '2010 Advance Captor 4800',
          serial: '1000036401',
          location: 'CHICAGO, IL',
          type: 'Other Equipment',
          category: 'Other Equipment',
          subCategory: '750-1115 Sweeper/Scrubber Ride On',
          description: 'Sweeper/Scrubber Ride On',
          equipmentId: '1143538',
          mainImage: 'https://images.rouseservices.com/ImageProcessor/get/getimage.aspx?type=ItemDetailBig&guid=cee289fe-9893-5758-1e8f-156ba5e400ba'
        },
        {
          title: '2010 Advance Captor 4800',
          serial: '1000036401',
          location: 'CHICAGO, IL',
          type: 'Other Equipment',
          category: 'Other Equipment',
          subCategory: '750-1115 Sweeper/Scrubber Ride On',
          description: 'Sweeper/Scrubber Ride On',
          equipmentId: '1143538',
          mainImage: 'https://images.rouseservices.com/ImageProcessor/get/getimage.aspx?type=ItemDetailBig&guid=cee289fe-9893-5758-1e8f-156ba5e400ba'
        },
        {
          title: '2010 Advance Captor 4800',
          serial: '1000036401',
          location: 'CHICAGO, IL',
          type: 'Other Equipment',
          category: 'Other Equipment',
          subCategory: '750-1115 Sweeper/Scrubber Ride On',
          description: 'Sweeper/Scrubber Ride On',
          equipmentId: '1143538',
          mainImage: 'https://images.rouseservices.com/ImageProcessor/get/getimage.aspx?type=ItemDetailBig&guid=cee289fe-9893-5758-1e8f-156ba5e400ba'
        },
        {
          title: '2010 Advance Captor 4800',
          serial: '1000036401',
          location: 'CHICAGO, IL',
          type: 'Other Equipment',
          category: 'Other Equipment',
          subCategory: '750-1115 Sweeper/Scrubber Ride On',
          description: 'Sweeper/Scrubber Ride On',
          equipmentId: '1143538',
          mainImage: 'https://images.rouseservices.com/ImageProcessor/get/getimage.aspx?type=ItemDetailBig&guid=cee289fe-9893-5758-1e8f-156ba5e400ba'
        },
        {
          title: '2010 Advance Captor 4800',
          serial: '1000036401',
          location: 'CHICAGO, IL',
          type: 'Other Equipment',
          category: 'Other Equipment',
          subCategory: '750-1115 Sweeper/Scrubber Ride On',
          description: 'Sweeper/Scrubber Ride On',
          equipmentId: '1143538',
          mainImage: 'https://images.rouseservices.com/ImageProcessor/get/getimage.aspx?type=ItemDetailBig&guid=cee289fe-9893-5758-1e8f-156ba5e400ba'
        },
        {
          title: '2010 Advance Captor 4800',
          serial: '1000036401',
          location: 'CHICAGO, IL',
          type: 'Other Equipment',
          category: 'Other Equipment',
          subCategory: '750-1115 Sweeper/Scrubber Ride On',
          description: 'Sweeper/Scrubber Ride On',
          equipmentId: '1143538',
          mainImage: 'https://images.rouseservices.com/ImageProcessor/get/getimage.aspx?type=ItemDetailBig&guid=cee289fe-9893-5758-1e8f-156ba5e400ba'
        },
        {
          title: '2010 Advance Captor 4800',
          serial: '1000036401',
          location: 'CHICAGO, IL',
          type: 'Other Equipment',
          category: 'Other Equipment',
          subCategory: '750-1115 Sweeper/Scrubber Ride On',
          description: 'Sweeper/Scrubber Ride On',
          equipmentId: '1143538',
          mainImage: 'https://images.rouseservices.com/ImageProcessor/get/getimage.aspx?type=ItemDetailBig&guid=cee289fe-9893-5758-1e8f-156ba5e400ba'
        }
      ],
      categoryOptions: [
        { name: 'moccino', value: 1 },
        { name: 'very heavy', value: 2 },
        { name: 'house destruction', value: 3 },
        { name: 'argument error', value: 4 },
      ]
    }
  }

  componentWillMount = () => {
    this.shouldRenderDetail(window.location.search);
  }

  componentWillReceiveProps = (newProps) => {
    this.shouldRenderDetail(newProps.location.search);
  }

  shouldRenderDetail = (search) => {
    const urlParams = new URLSearchParams(search);
    this.vehicleId = urlParams.get('vehicleId');
  }

  getVehicles = () => {
    this.setState({
      vehicles: [...this.state.vehicles, ...this.state.vehicles]
    })
  }

  handleFilterChange = (change) => {
    console.log(change);
  }

  handleClick = (vehicleId) => {
    this.props.history.push(`${ApplicationRoutes.constructionPage}?vehicleId=${vehicleId}`);
  }

  render() {
    const { vehicles, isLoading, categoryOptions, totalVehicles } = this.state;
    if (!!this.vehicleId) {
      return (
        <ConstructionMarketDetail history={this.props.history} vehicleId={this.vehicleId} />
      );
    }
    return(
      <Wrapper>
        <Sidebar>
          <SidebarTitle>
            <span>Apply Filters</span>
          </SidebarTitle>
          <FilterList>
            <ConstructionFilter name="type" displayName="Type" type="select" options={categoryOptions} handleChange={this.handleFilterChange} />
            <ConstructionFilter name="category" displayName="Category" type="select" options={categoryOptions} handleChange={this.handleFilterChange} />
            <ConstructionFilter name="subcategory" displayName="Subcategory" type="select" options={categoryOptions} handleChange={this.handleFilterChange} />
          </FilterList>
        </Sidebar>
        <SearchBarMobile>
          Search mobile...
        </SearchBarMobile>
        <MainTitle>
          <span>Construction vehicles</span>
        </MainTitle>
        <MainContent ref={(ref) => this.scrollParentRef = ref}>
            {
              isLoading ? 'Loading...' : (
                <InfiniteScroll
                  style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}
                  pageStart={0}
                  loadMore={this.getVehicles}
                  hasMore={totalVehicles > vehicles.length}
                  useWindow={false}
                  getScrollParent={() => this.scrollParentRef}
                  threshold={100}
                  loader={
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
                  }
                >
                    {
                      vehicles.map(vehicle => (
                        <VehicleCard handleClick={this.handleClick} vehicle={vehicle} />
                      ))
                    }
                </InfiniteScroll>
              )
            }
        </MainContent>
      </Wrapper>
    );
  }
}

export default withRouter(ConstructionMarket);