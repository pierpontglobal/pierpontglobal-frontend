import React from 'react';
import Modal from "../Modal/Modal";
import Information from './Information/Information';
import Container from '../styles/Container/Container';
import Btn from '../Btn/Btn';

function BidModal({ show, invoice }) {
  return (
      <Modal
          title="Thanks for your bid!"
          show={show}
        >
          <Information
              label="Estimated total:"
              text={invoice.estimatedTotal}
              fontSize="1em"
              fontWeight={600}
              lineHeight={2.29}
              className="mb-1"
            />
          <Information
              label="Unit cost"
              text={invoice.unitCost}
              fontSize="0.875em"
              fontWeight="normal"
              lineHeight={2.29}
              className="mb-0 pb-1 border-bottom"
            />
          <Information
              label="Taxes"
              text={invoice.taxes}
              fontSize="0.875em"
              fontWeight="normal"
              lineHeight={2}
              className="mb-0 mt-2"
            />
          <Information
              label="Shipping"
              text={invoice.shipping}
              fontSize="0.875em"
              fontWeight="normal"
              lineHeight={2}
              className="mb-0"
            />
          <Information
              label="Fee"
              text={invoice.fee}
              fontSize="0.875em"
              fontWeight="normal"
              lineHeight={2}
              className="mb-0"
            />
          <Information
              label="Processing"
              text={invoice.proccessing}
              fontSize="0.875em"
              fontWeight="normal"
              lineHeight={2}
              className="mb-0"
            />
          <Information
              label="Transport"
              text={invoice.shipping}
              fontSize="0.875em"
              fontWeight="normal"
              lineHeight={2}
              className="mb-0 pb-1 border-bottom"
            />
          <Information
              label="Required deposit"
              text={invoice.requiredDeposit}
              fontSize="0.875em"
              fontWeight={600}
              lineHeight={2.29}
              className="pt-1"
            />
          <Container
              className="d-flex flex-row justify-content-center"
              height="60px"
            >
              <Btn
                  className="flex-fill mr-3"
                  color="#3c79c0"
                  hoverColor="#4c87cc"
                >
                    CHANGE BID
                </Btn>
              <Btn
                  className="flex-fill px-3"
                  color="#0bb761"
                  hoverColor="#23d17a"
                >
                    CONFIRM
                </Btn>
            </Container>
        </Modal>
  );
}

export default BidModal;
