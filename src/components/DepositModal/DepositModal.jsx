import React from 'react';
import Modal from './../Modal/Modal';
import Information from './../BidModal/Information/Information';
import Container from '../styles/Container/Container';
import Btn from '../Btn/Btn';

function DepositModal({show, status, onSearch, onAddDeposit}) {
    return (
        <Modal
            title="Out of deposit" 
            show={show}
        >
            <div className="pt-2">
                <Information
                    label="Deficient amount"
                    text={status.deficientAmount}
                    fontSize="16px"
                    fontWeight={600}
                    lineHeight={1.31}
                    className="mb-0 pb-2 border-bottom"
                />
                <Information
                    label="Necessary amount"
                    text={status.necessaryAmount}
                    fontSize="14px"
                    fontWeight="normal"
                    lineHeight={2}
                    className="mb-0 pt-2"
                />
                <Information
                    label="Available amount"
                    text={status.availableAmount}
                    fontSize="14px"
                    fontWeight="normal"
                    lineHeight={2}
                    className="mb-0"
                />
            </div>
            <div 
                className="d-flex flex-row justify-content-center"
                style={{height: '60px'}}
            >
                <Btn 
                    className="mr-3 w-100"
                    maxWidth="152px"
                    color="#3a7abf"
                    hoverColor="#4c87cc"
                    onClick={onSearch}
                >
                    KEEP&nbsp;SEARCHING
                </Btn>
                <Btn
                    className="w-100" 
                    maxWidth="152px"
                    color="#0bb761"
                    hoverColor="#23d17a"
                    onClick={onAddDeposit}
                >
                    ADD DEPOSIT
                </Btn>
            </div>
        </Modal>
    );
}

export default DepositModal;