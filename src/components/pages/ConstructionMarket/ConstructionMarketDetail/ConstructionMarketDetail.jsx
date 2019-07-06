import React from 'react';
import styled from 'styled-components';
import { AppNavHeight } from '../../../../constants/ApplicationSettings';
import { CircularProgress, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import BackIconMui from '@material-ui/icons/KeyboardArrowLeft';

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto;
  position: relative;
  grid-template-areas: 
    "carousel details sidebar"
    "related related sidebar";
`;

const CarouselBox = styled.div`
  grid-area: carousel;
  width: 100%;
  height: 100%;
`;

const VehicleDetailBox = styled.div`
  grid-area: details;
  width: 100%;
  height: 100%;
`;

const InfoSidebar = styled.div`
  grid-area: sidebar;
  width: 100%;
  height: 100%;
`;

const RelatedVehicles = styled.div`
  grid-area: related;
  width: 100%;
  height: 100%;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  padding: 24px;
`;

class ConstructionMarketDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicle: undefined,
      client: {
        ...this.props.user,
        company: '',
        comments: '',
      },
    }
    this.clientDefined = false;
  }

  componentWillMount = () => {
    // Get vehicle
    const { vehicleId } = this.props;
    this.setState({
      vehicle: {
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
    })
  }

  handleChange = (e) => {
    this.setState({
      client: {
        ...this.state.client,
        [e.target.id]: e.target.value
      }
    })
  }

  sendForm = () => {
    console.log('Vehicle request >>>>>', this.state);
  }

  defineClient = () => {
    this.clientDefined = true;
    const { user } = this.props;
    this.setState({
      client: {
        ...user
      }
    })
  }

  goBack = () => {
    this.props.history.goBack();
  }

  render() {
    const { vehicle, client} = this.state;
    const { user } = this.props;
    if (!!user.email && !this.clientDefined) {
      this.defineClient();
    }
    return(
      <>
        {
          vehicle === undefined ? <LoadingWrapper><CircularProgress /></LoadingWrapper> : (
            <Wrapper>
              <CarouselBox>

              </CarouselBox>
              <VehicleDetailBox>

              </VehicleDetailBox>
              <InfoSidebar>

              </InfoSidebar>
              <RelatedVehicles>

              </RelatedVehicles>
            </Wrapper>
          )
        }
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user
});
export default connect(mapStateToProps, null)(ConstructionMarketDetail);
