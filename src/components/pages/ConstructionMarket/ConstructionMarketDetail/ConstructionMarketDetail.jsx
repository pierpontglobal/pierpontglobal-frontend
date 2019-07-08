import React from 'react';
import styled from 'styled-components';
import { AppNavHeight } from '../../../../constants/ApplicationSettings';
import { CircularProgress, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import BackIconMui from '@material-ui/icons/KeyboardArrowLeft';
import ImageGallery from 'react-image-gallery';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LocationIconMui from '@material-ui/icons/LocationOn';
import TagIconMui from '@material-ui/icons/MergeType';
import PrintIconMui from '@material-ui/icons/Print';
import EmailIconMui from '@material-ui/icons/Email';
import numeral from 'numeral';
import CheckIconMui from '@material-ui/icons/CheckCircleOutline';
import axios from 'axios';
import { ApiServer } from '../../../../Defaults';

const Wrapper = styled.div`
  width: 85%;
  display: grid;
  margin: 0 auto;
  margin-top: 36px;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  position: relative;
  grid-template-areas: 
    "carousel details sidebar"
    "related related sidebar";
  grid-column-gap: 32px;

  @media only screen and (max-width: 490px) {
    width: 100%;
    grid-template-columns: auto;
    grid-template-rows: 2fr 1fr 1fr auto;
    grid-row-gap: 16px;
    grid-template-areas: 
    "carousel"
    "details"
    "sidebar"
    "related";
  }
`;

const CarouselBox = styled.div`
  grid-area: carousel;
  width: 90%;
  height: 90%;
  margin: 0 auto;
  @media only screen and (max-width: 490px) {
    width: 100%;
    height: 100%;
  }
`;

const VehicleDetailBox = styled.div`
  grid-area: details;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InfoSidebar = styled.div`
  grid-area: sidebar;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  border-radius: 5px;
  border: 1px solid #dde0e2;
  padding: 16px;
`;

const RelatedVehicles = styled.div`
  grid-area: related;
  width: 100%;
  height: 100%;
  display: flex;
  max-width: 100%;
  overflow: auto;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: ${props => `calc(100vh - ${AppNavHeight}px)`};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  width: 100%;
  padding: 16px;
  & > span {
    font-size: 1.32rem;
    font-weight: 600;
  }
`;

const Location = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
const LocationIcon = styled.div`
  & > svg {
    color: #32619a;
  }
`;
const LocationText = styled.div`
  & > span {
    font-weight: 200;
    font-size: 1.08rem;
  }
`;

const Price = styled.div`
  width: 100%;
  padding: 12px;
  & > span {
    font-size: 1.18rem;
    font-weight: 200;
  }
`;

const Tags = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px;
`;
const Tag = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
const TagIcon = styled.div`
  & > svg {
    color: #32619a;
  }
`;
const TagText = styled.div`
  & > span {
    font-weight: 200;
    font-size: 1.08rem;
  }
`;

const ActionIcons = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 12px;
`;
const ActionIcon = styled.div`
  padding: 0px 8px;
  & > svg {
    color: rgb(0, 0, 0, 0.7);
  }
`;

const DetailTabs = styled.div`
  width: 100%;

`;

const TabContainer = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const SidebarTitle = styled.div`
  width: 100%;
  padding: 24px;
  text-align: center;
  & > span {
    font-weight: 600;
    font-size: 1.16rem;
  }
`;
const ClientInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const ClientName = styled.div`
  width: 100%;
  padding: 16px;
  text-align: center;
  & > span {
    font-size: 1.12rem;
    font-weight: 200;
  }
`;
const RequestWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const RequestBtn = styled.button`
  padding: 16px;
  background: transparent;
  border: solid 1px #32619a;
  border-radius: 2px;
  margin-bottom: 12px;
  font-size: 1.09rem;
  color: #32619a;
  cursor: pointer;
`;
const CheckIcon = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 18px;
  & > svg {
    color: #20c967;
  }
`;
const ClientPhone = styled.div`
  padding: 8px;
  width: 100%;
  text-align: center;
  & > span {
    color: darkblue;
  }
`;
const ClientEmail = styled.div`
  padding: 8px;
  width: 100%;
  text-align: center;
  & > span {
    color: darkblue;
  }
`;

const TabContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const TabcontentLabel = styled.div`
  margin-right: 8px;
  padding: 4px;
  & > span {
    font-weight: 600;
  }
`;

const BackWrapper = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: flex-start;
`;
const BackIcon = styled.div`
  & > svg {
    color: rgb(0, 0, 0, 0.6);
    transition: all 0.2s;
    cursor: pointer;
    font-size: 2.12rem;
  }
  & > svg:hover {
    color: rgb(0, 0, 0, 0.9);
  }
`;

class ConstructionMarketDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicle: undefined,
      detailTabValue: 0,
      requestingVehicle: false,
      requested: false,
      requestSuccess: false,
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
    axios.get(`${ApiServer}/api/v2/heavy_vehicles/single?vehicle_id=${vehicleId}`).then(data => {
      const vehicle = data.data.vehicle;
      this.setState({
        vehicle: {
          title: vehicle.title,
          serial: '1000036401',
          location: vehicle.location,
          type: 'Other Equipment',
          category: 'Other Equipment',
          subCategory: '750-1115 Sweeper/Scrubber Ride On',
          description: 'Sweeper/Scrubber Ride On',
          equipmentId: vehicle.equipment_id,
          price: vehicle.price,
          mainImage: vehicle.main_image
        }
      })
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

  handleTabsChange = (e, newValue) => {
    this.setState({
      detailTabValue: newValue
    })
  }

  requestVehicle = () => {
    this.setState({
      requestingVehicle: true,
    }, () => {
      setTimeout(()=>{
        this.setState({
          requestingVehicle: false,
          requestSuccess: true,
          requested: true
        })
      },3000);
    })
  }

  render() {
    const { vehicle, client, detailTabValue, requestingVehicle, requestSuccess, requested} = this.state;
    const { user } = this.props;
    if (!!user.email && !this.clientDefined) {
      this.defineClient();
    }
    const images = [
      {
        original: !!vehicle ? vehicle.mainImage : '',
        thumbnail: !!vehicle ? vehicle.mainImage : '',
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/2/',
        thumbnail: 'http://lorempixel.com/250/150/nature/2/'
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/3/',
        thumbnail: 'http://lorempixel.com/250/150/nature/3/'
      }
    ]
    return(
      <>
        {
          vehicle === undefined ? <LoadingWrapper><CircularProgress /></LoadingWrapper> : (
            <Wrapper>
              <CarouselBox>
                <BackWrapper>
                  <BackIcon onClick={() => this.goBack()}>
                    <BackIconMui /> Go back
                  </BackIcon>
                </BackWrapper>
                <ImageGallery items={images} />
              </CarouselBox>
              <VehicleDetailBox>
                <Title>
                  <span>
                    { vehicle.title }
                  </span>
                </Title>
                <Location>
                  <LocationIcon>
                    <LocationIconMui />
                  </LocationIcon>
                  <LocationText>
                    <span>
                      { vehicle.location }
                    </span>
                  </LocationText>
                </Location>
                <Price>
                  <span>
                    { `US$ ${numeral(vehicle.price).format("0,0")}` }
                  </span>
                </Price>
                <Tags>
                  <Tag>
                    <TagIcon>
                      <TagIconMui />
                    </TagIcon>
                    <TagText>
                      <span>
                        Low interest financing
                      </span>
                    </TagText>
                  </Tag>
                  <Tag>
                    <TagIcon>
                      <TagIconMui />
                    </TagIcon>
                    <TagText>
                      <span>
                        Special dial
                      </span>
                    </TagText>
                  </Tag>
                </Tags>
                <ActionIcons>
                  <ActionIcon>
                    <EmailIconMui />
                  </ActionIcon>
                  <ActionIcon>
                    <PrintIconMui />
                  </ActionIcon>
                </ActionIcons>
                <DetailTabs>
                  <Tabs
                    value={detailTabValue}
                    onChange={this.handleTabsChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                  >
                    <Tab id="details" label="Details" />
                    <Tab id="description" label="Description" />
                  </Tabs>
                  { detailTabValue === 0 && <TabContainer>
                    <TabContent>
                      <TabcontentLabel>
                        <span>Serial</span>
                      </TabcontentLabel>
                      <div>
                        <span>
                          { vehicle.serial }
                        </span>
                      </div>
                    </TabContent>
                    <TabContent>
                      <TabcontentLabel>
                        <span>Equipment id</span>
                      </TabcontentLabel>
                      <div>
                        <span>
                          { vehicle.equipmentId }
                        </span>
                      </div>
                    </TabContent>
                    <TabContent>
                      <TabcontentLabel>
                        <span>Sub category</span>
                      </TabcontentLabel>
                      <div>
                        <span>
                          { vehicle.subCategory }
                        </span>
                      </div>
                    </TabContent>
                  </TabContainer> }
                  { detailTabValue === 1 && <TabContainer>
                    <TabContent>
                      <TabcontentLabel>
                        <span>Description</span>
                      </TabcontentLabel>
                      <div>
                        <span>
                          { vehicle.description }
                        </span>
                      </div>
                    </TabContent>
                    <TabContent>
                      <TabcontentLabel>
                        <span>Equipment type</span>
                      </TabcontentLabel>
                      <div>
                        <span>
                          { vehicle.type }
                        </span>
                      </div>
                    </TabContent>
                    <TabContent>
                      <TabcontentLabel>
                        <span>Category</span>
                      </TabcontentLabel>
                      <div>
                        <span>
                          { vehicle.category }
                        </span>
                      </div>
                    </TabContent>
                  </TabContainer> }
                </DetailTabs>
              </VehicleDetailBox>
              <InfoSidebar>
                <SidebarTitle>
                  <span>
                    Equipment Sales Rep
                  </span>
                </SidebarTitle>
                {
                  !!client ? (
                    <ClientInfo>
                      <ClientName>
                        <span>
                          { client.name }
                        </span>
                      </ClientName>
                      <RequestWrapper>
                        {
                          requestingVehicle ? <CircularProgress /> : requested ? (
                            requestSuccess ? <CheckIcon><CheckIconMui /> Vehicle requested</CheckIcon> : 'failere in requesitng...'
                          ) : ( <RequestBtn onClick={() => this.requestVehicle()}>
                                Request Info
                              </RequestBtn>)
                        }
                      </RequestWrapper>
                     
                      <ClientPhone>
                        { client.phone }
                      </ClientPhone>
                      <ClientEmail>
                        { client.email }
                      </ClientEmail>
                    </ClientInfo>
                  ) :  null
                }
                <hr />

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
