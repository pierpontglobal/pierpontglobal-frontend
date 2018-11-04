import React from 'react';
import FilterPanel from '../../FilterPanel/FilterPanel';
import SortBar from '../../SortBar/SortBar';
import CarCard from '../../CarCard/CarCard';
import UnderLine from '../../Underline/Underline';
import AppNav from '../../AppNav/AppNav';

function MarketPlacePage({result}) {
    return (
        <div>
            <AppNav />
            <div className="d-flex justify-content-center">
                <div 
                    className="ml-auto d-none d-lg-flex mr-3 w-100"
                    style={{maxWidth: '260px'}}
                >
                    <FilterPanel />
                </div>
                <div 
                    className="mr-auto ml-md-auto ml-lg-0 w-100"
                    style={{maxWidth: '810px'}}
                >
                    <UnderLine>
                        <SortBar header={result.title} />
                    </UnderLine>
                    {result.cars.map(
                        (car, i) => <CarCard key={i} car={car} />)}
                        
                </div>
            </div>
        </div>
    );
}

export default MarketPlacePage;