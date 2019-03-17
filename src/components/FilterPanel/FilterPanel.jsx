import React from 'react';
import posed from 'react-pose';
import PropTypes from 'prop-types';
import Item from './Item/Item';
import OptionBtn from './OptionBtn/OptionBtn';
import RangeSelector from './RangeSelector/RangeSelector';

const style = {
  backgroundColor: '#FAFAFA',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.18)',
  marginTop: '-15px',
};

const ExpandableDiv = posed.div({
  retracted: {
    height: '58px',
  },
  expanded: {
    height: '200px',
  },
});

const RotatableIcon = posed.i({
  retracted: {
    rotate: 0,
  },
  expanded: {
    rotate: 180,
  },
});

class FilterPanel extends React.Component {
  constructor(props) {
    super(props);
    const {
      availableArguments,
      params,
    } = props;

    this.state = {};

    if (params) {
      this.state = {
        availableArguments,
        q: params.q ? params.q : '',
        maker: params.maker ? params.maker.split(',') : [],
        model: params.model ? params.model.split(',') : [],
        trim: params.trim ? params.trim.split(',') : [],
        year: params.year ? params.year.split(',') : [],
        color: params.color ? params.color.split(',') : [],
        engine: params.engine ? params.engine.split(',') : [],
        yearTogle: false,
      };
    }

    this.searchWithParams = this.searchWithParams.bind(this);
    this.onBoundChanged = this.onBoundChanged.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.availableArguments !== this.state.availableArguments) {
      this.setState({ availableArguments: nextProps.availableArguments });
    }
  }

  onBoundChanged(min, max) {
    const years = [];
    for (let i = min; i < max; i += 1) {
      years.push(this.state.availableArguments.year.buckets[i].key);
    }
    this.setState({
      year: years,
    }, () => {
      this.searchWithParams(null, true, null);
    });
  }


  searchWithParams(origin, add, key) {
    const {
      q, maker, model, trim, year, color, engine,
    } = this.state;

    const searchables = {
      q,
      maker,
      model,
      trim,
      year,
      color,
      engine,
    };

    switch (origin) {
      case 'maker':
        if (add) {
          searchables.maker.push(key);
        } else {
          searchables.maker.splice(maker.indexOf(key), 1);
        }
        break;
      case 'model':
        if (add) {
          searchables.model.push(key);
        } else {
          searchables.model.splice(model.indexOf(key), 1);
        }
        break;
      case 'trim':
        if (add) {
          searchables.trim.push(key);
        } else {
          searchables.trim.splice(trim.indexOf(key), 1);
        }
        break;
      case 'color':
        if (add) {
          searchables.color.push(key);
        } else {
          searchables.color.splice(color.indexOf(key), 1);
        }
        break;
      case 'engine':
        if (add) {
          searchables.engine.push(key);
        } else {
          searchables.engine.splice(engine.indexOf(key), 1);
        }
        break;
      default:
        break;
    }

    let str = '';
    Object.keys(searchables).forEach((searchable) => {
      if (str !== '') {
        str += '&';
      }
      str += `${searchable}=${encodeURIComponent(searchables[searchable])}`;
    });

    window.history.pushState(null, 'Marketplace', `?${str}`);
    this.props.getCars();
  }

  render() {
    const {
      availableArguments, maker, model, trim, year, color, engine, yearTogle,
    } = this.state;
    let makersArray = [];
    let modelsArray = [];
    let trimArray = [];
    let yearArray = [];
    let colorArray = [];
    let engineArray = [];

    if (availableArguments) {
      const makersObject = availableArguments.maker_name;
      const modelsObject = availableArguments.model_name;
      const trimObject = availableArguments.trim;
      const yearObject = availableArguments.year;
      const colorObject = availableArguments.color;
      const engineObject = availableArguments.engine;

      makersArray = makersObject ? makersObject.buckets : [];
      modelsArray = modelsObject ? modelsObject.buckets : [];
      trimArray = trimObject ? trimObject.buckets : [];
      yearArray = yearObject ? yearObject.buckets : [];
      colorArray = colorObject ? colorObject.buckets : [];
      engineArray = engineObject ? engineObject.buckets : [];
    }

    return (
      <div
        className="w-100"
        style={style}
      >
        <Item name="Maker">
          <OptionBtn
            selected={maker}
            values={makersArray}
            origin="maker"
            onChange={this.searchWithParams}
          />
        </Item>
        <Item name="Model">
          <OptionBtn
            selected={model}
            values={modelsArray}
            origin="model"
            onChange={this.searchWithParams}
          />
        </Item>
        <Item name="Trim">
          <OptionBtn
            selected={trim}
            values={trimArray}
            origin="trim"
            onChange={this.searchWithParams}
          />
        </Item>
        <ExpandableDiv style={{ overflow: 'hidden' }} pose={yearTogle ? 'expanded' : 'retracted'} className="border-bottom">
          <div
            className="d-flex mb-0 p-3 justify-content-between"
            onClick={() => { this.setState({ yearTogle: !yearTogle }); }}
          >
            <div
              className="mb-0"
              style={{
                display: 'flex',
                fontSize: '16px',
                alignContent: 'center',
                alignItems: 'center',
                fontWeight: '600',
              }}
            >
              <span>Year</span>
            </div>
            <RotatableIcon pose={yearTogle ? 'expanded' : 'retracted'} style={{ color: 'rgb(58, 62, 67)' }} className="fas fa-angle-down" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <RangeSelector
              items={yearArray}
              selectedYears={year}
              onBoundChanged={this.onBoundChanged}
            />
          </div>
        </ExpandableDiv>
        <Item name="Color">
          <OptionBtn
            selected={color}
            values={colorArray}
            origin="color"
            onChange={this.searchWithParams}
          />
        </Item>
        <Item name="Engine">
          <OptionBtn
            selected={engine}
            values={engineArray}
            origin="engine"
            onChange={this.searchWithParams}
          />
        </Item>
      </div>
    );
  }
}

FilterPanel.propTypes = {
  getCars: PropTypes.func,
  availableArguments: PropTypes.object,
  params: PropTypes.object,
};

FilterPanel.defaultProps = {
  getCars: () => {},
  availableArguments: {},
  params: {},
};

export default FilterPanel;
