import React from 'react';
import './styles.css';
import StatHolder from './Components/StatHolder/StatHolder';
import styled from 'styled-components';

const ContainerFinancial = styled.div`
 
`;

const FinancialHolder= styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  justify-items: center;
  align-content: center;
  align-content: center;
  flex-wrap: wrap;
  margin-top: 3%;
  margin-bottom: 2%;
`;

class FinancialSide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {

  }

  render() {
    return (
      <ContainerFinancial>
        <FinancialHolder>
          <StatHolder value={21} title="AVERAGE DAYS ON MARKET" logo="fas fa-calendar" />
          <StatHolder value="$81 853" title="INVESTMENT" logo="fas fa-calculator" />
          <StatHolder value="$118 238" title="TOTAL SALES" logo="fas fa-dollar-sign" />
          <StatHolder title="GROSS PROFIT" value="$36 385" logo="fas fa-chart-pie" />
          <StatHolder title="GROSS PROFIT MARGIN" logo="fas fa-percent" value="%44.45" />
          <StatHolder title="AVERAGE PROFIT" logo="fas fa-dollar-sign" value="$809" />
        </FinancialHolder>

        <button
          type="button"
          style={{
            backgroundColor: '#ffffff',
            color: '#000000',
            borderRadius: '5px',
            padding: '10px 15px',
            cursor: 'pointer',
            fontSize: '12px',
            margin: '30px',
            float: 'right',
            zIndex: '1',
          }}
          onClick={this.onOpenModal}
        >
          <i style={{ fontSize: '12px', color: '#000000' }} className="fas fa-file-download" />
          {' '}
          [PDF] View Yearly Report
        </button>

        <div style={{
          width: '100%', overflowX: 'auto', display: 'flex', justifyContent: 'center', justifyItems: 'center', alignContent: 'center', alignItems: 'center',
        }}
        >
          <table style={{ width: '90%' }}>
            <thead>
              <tr style={{ borderBottom: '#DEDEDE 1px solid', borderTop: '#DEDEDE 1px solid' }}>
                <th style={{ padding: '10px' }}>Date</th>
                <th style={{ padding: '10px' }}>Model</th>
                <th style={{ padding: '10px' }}>Basic Price</th>
                <th style={{ padding: '10px' }}>Winner Bid</th>
                <th style={{ padding: '10px' }}>???</th>
              </tr>
            </thead>
          </table>
        </div>
      </ContainerFinancial>
    );
  }
}

export default FinancialSide;
