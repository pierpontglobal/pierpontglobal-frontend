import React from 'react';
import AppNav from '../../AppNav/AppNav';
import CarDetailCard from '../../CarDetailCard/CarDetailCard';
import CarDetailTable from '../../CarDetailTable/CarDetailTable';
import BidPanel from '../../BidPanel/BidPanel';
import LocationBar from '../../LocationBar/LocationBar';
import CarBottomNav from '../../CarBottomNav/CarBottomNav';
import CarCarousel from '../../CarCarousel/CarCarousel';
import UserBidCard from '../../UserBidCard/UserBidCard';

function CarBidPage({ car, currentBid, userBid }) {
  return (
    <div>
      <AppNav />
      <div className="d-flex justify-content-center">
        <div className="d-flex flex-column mr-3">
          <CarDetailCard car={car} />
          <CarDetailTable car={car} />
        </div>
        <div
          className="d-flex flex-column"
          style={{ width: '720px' }}
        >
          {userBid !== undefined
            ? <UserBidCard bid={userBid} />
            : <BidPanel currentBid={currentBid} />}
          <LocationBar
            currentLocation="Florida, USA"
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
}

export default CarBidPage;
