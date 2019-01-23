import React from 'react';
import Item from './Item/Item';
// import PriceItem from './PriceItem/PriceItem';
import OptionBtn from './OptionBtn/OptionBtn';

const style = {
  backgroundColor: '#FAFAFA',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.18)',
  marginTop: '-15px',
};

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
      };
    }

    this.searchWithParams = this.searchWithParams.bind(this);
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
      case 'year':
        if (add) {
          searchables.year.push(key);
        } else {
          searchables.year.splice(year.indexOf(key), 1);
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
    for (const key in searchables) {
      if (str != '') {
        str += '&';
      }

      str += `${key}=${encodeURIComponent(searchables[key])}`;
    }

    window.location.href = `?${str}`;
  }

  render() {
    const {
      availableArguments, maker, model, trim, year, color, engine,
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
        <Item name="Year">
          <OptionBtn
            selected={year}
            values={yearArray}
            origin="year"
            onChange={this.searchWithParams}
          />
        </Item>
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

        {/*
        <Item name="Interior">
          {' '}
          <h3>Hi there</h3>
          {' '}
        </Item>
        <PriceItem />
        */}
      </div>
    );
  }
}

export default FilterPanel;
