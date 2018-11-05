import React from 'react';
import Btn from '../Btn/Btn';
import Container from '../styles/Container/Container';
import Text from '../styles/Text/Text';

function BidCard({auctionDate, bid, orderNumber, carTitle}) {
    return (
        <Container 
            className="d-flex flex-row justify-content-between px-3 mb-3"
            minHeight="70px"
            backgroundColor="#fafafa"
            boxShadow="0 1px 2px 0 rgba(0, 0, 0, 0.18)"
            overflow="auto"
        >
            <div className="pt-md-3 pt-1">
                <Text
                    opacity={0.87}
                    fontSize="1em"
                    fontWeight={600}
                    lineHeight={1.25}
                    className="mb-0"
                >
                    {carTitle}
                </Text>
                <Text
                    opacity={0.54}
                    fontSize="0.75em"
                    lineHeight={1.67}
                    className="mb-0" 
                >
                    {`Order Number: ${orderNumber}`}
                </Text>
            </div>
            <div className="d-flex flex-fill justify-content-end">
                <div className="d-flex flex-column pr-3">
                    <Text
                        opacity={0.54}
                        size="0.75em"
                        lineHeight={1.67}
                        className="mb-0 text-right" 
                    >
                        Auction goes on
                    </Text>
                    <Text
                        fontSize="1em"
                        lineHeight={1.31}
                        weight={300}
                        className="mb-1 text-right" 
                    >
                        {auctionDate}
                    </Text>
                     <Text
                        fontSize="0.75em"
                        lineHeight={1.67}
                        className="mb-0 text-right" 
                    >
                        Your bid:
                        <span style={{color: '#0bb761'}}> ${bid}</span>
                    </Text>
                </div>
                <Btn
                    className="my-1 flex-fill" 
                    maxWidth="163px"
                    color="#3c79c0"
                    hoverColor="#4c87cc"
                >
                    VIEW LOT
                </Btn>
            </div>
        </Container>
    );
}

export default BidCard;