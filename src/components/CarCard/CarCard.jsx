import React from 'react';
import SlideShow from './../SlideShow/SlideShow';
import Detail from './Detail/Detail';
import AutoCheckBtn from './../AutoCheckBtn/AutoCheckBtn';
import ConditionBtn from './../ConditionBtn/ConditionBtn';
import TimeTag from './TimeTag/TimeTag';
import PriceTag from './PriceTag/PriceTag';
import Container from '../styles/Container/Container';

function CarCard({car}) {
    const { 
        vin,
        odometer,
        engine,
        transmission,
        images
    } = car;
    return (
        <Container 
            className="d-flex flex-row mb-3 pr-3 pl-2 pl-md-0"
            backgroundColor="#fafafa"
            maxHeight="120px"
            boxShadow="0 1px 2px 0 rgba(0, 0, 0, 0.18)"
        >
            <Container 
                className="d-flex mr-md-3 w-auto"
                maxWidth="212px"
            >
                <SlideShow images={images}/>
            </Container>
            <Container className="py-1 py-3 pb-3 ml-auto ml-md-0 mr-md-5 w-auto">
                <Detail
                    name="VIN"
                    value={vin}
                    className="mb-md-0 w-100" 
                />
                <Detail
                    name="Odometer"
                    value={odometer}
                    className="mb-md-0"
                />
                <Detail
                    name="Engine"
                    value={engine}
                    className="mb-md-0"
                />
                <Detail 
                    name="Transmission"
                    value={transmission}
                    className="mb-md-3"
                />
            </Container>
            <Container 
                className="d-none d-md-block py-3 w-100"
                maxWidth="96px"
            >
                <ConditionBtn 
                        score="4.3"
                        className="w-100 mb-2" 
                />
                <AutoCheckBtn className="w-100 py-1 mt-1" />
            </Container>
            <Container className="py-1 py-3 w-auto ml-md-auto">
                <TimeTag 
                    time="5 days left" 
                    className="mb-2 text-right"
                />
                <PriceTag 
                    price="21 975"
                    className="text-right mb-0" 
                />
            </Container>
        </Container>
    );
}

export default CarCard;