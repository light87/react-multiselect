import React from "react";
import ReactDOM from "react-dom";
import "./css/multiSelector.css";
import MultiSelect from './src/MultiSelect';

const dataSourceWithChildren = [{id: 1, name: "test1"}, {
  id: 2,
  name: "test2",
  children: [
    {
      id: 2.1,
      name: "test2.1",
    },
    {
      id: 2.2,
      name: "test2.2",
    },
    {
      id: 2.3,
      name: "test2.3",
    },
    {
      id: 2.4,
      name: "test2.4",
    }
  ]
}];

const dataSourceWithoutChildren = [
  {id: 1, name: "test1"},
  {
    id: 2,
    name: "test2",
  }, {
    id: 3,
    name: "test3",
  }, {
    id: 4,
    name: "test4",
  }];

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: dataSourceWithChildren,
      dataSourceConfig: {label: 'id', text: 'name'},
      showTextNumber: 1,
      buttonText: "option",
      hasSelectAll: true,
      hasSearch: false,
      selectedValue: [1, 2.1],
      withChildren: true,
      changeDataSource:false
    };
  }

  onChangeButtonText = (event) => {
    this.setState({
      buttonText: event.target.value,
    });
  };

  onChangeShowNumber = (event) => {
    console.log(event.target.value);
    this.setState({
      showTextNumber: event.target.value,
    });
  };

  onChangeHasSearch = (configBool) => {
    this.setState({hasSearch: configBool});
  };

  onChangeHasAllSelect = (configBool) => {
    this.setState({hasSelectAll: configBool});
  };

  onChangeSelected = (selectedValue) => {
    this.setState({selectedValue});
  };

  onChangeDataSource = (configBool) => {
    let sourceData = dataSourceWithChildren;
    let initData = [1,2.1];
    if (!configBool) {
      sourceData = dataSourceWithoutChildren;
      initData = [1,2];
    }
    this.setState({
      dataSource: sourceData,
      withChildren: configBool,
      selectedValue: initData,
      changeDataSource:true
    });
    setTimeout(() => {
      this.setState({
        changeDataSource: false
      });
    }, 50);
  };


  render() {
    const {dataSource,changeDataSource, selectedValue, withChildren, showTextNumber, buttonText, hasSelectAll, hasSearch} = this.state;
    console.log('change',changeDataSource);
    return (
      <article>
        <header>
          <h1>React-multiselector</h1>
        </header>

        <div style={{height:30}}>
          {!changeDataSource&&
          <MultiSelect initValue={selectedValue} dataSource={dataSource}
                       showTextNumber={showTextNumber}
                       buttonText={buttonText} hasSelectAll={hasSelectAll}
                       hasSearch={hasSearch} onChange={this.onChangeSelected}/>
          }

        </div>
        <table>
          <tr>
            <td>dataSource</td>
            <td>
              <input type="radio"
                     onChange={this.onChangeDataSource.bind(this, true)}
                     id="dataSourceWithChildren" name="dataSource"
                     checked={withChildren}/>
              <label htmlFor="dataSourceWithChildren">withChildren</label>
              <input type="radio"
                     onChange={this.onChangeDataSource.bind(this, false)}
                     id="dataSourceWithoutChildren" name="dataSource"
                     checked={!withChildren}/>
              <label htmlFor="dataSourceWithoutChildren">withoutChildren</label>
            </td>
          </tr>
          <tr>
            <td>buttonText</td>
            <td>
              <input type="text" onChange={this.onChangeButtonText}
                     value={buttonText}/>
            </td>
          </tr>
          <tr>
            <td>hasSelectAll</td>
            <td>
              <input type="radio"
                     onChange={this.onChangeHasAllSelect.bind(this, true)}
                     id="hasSelectAll" name="selectAll" checked={hasSelectAll}/>
              <label htmlFor="hasSelectAll">addSelectAllButton</label>
              <input type="radio"
                     onChange={this.onChangeHasAllSelect.bind(this, false)}
                     id="noSelectAll" name="selectAll" checked={!hasSelectAll}/>
              <label htmlFor="noSelectAll">cancelSelectAllButton</label>
            </td>
          </tr>
          <tr>
            <td>hasSearch</td>
            <td>
              <input type="radio"
                     onChange={this.onChangeHasSearch.bind(this, true)}
                     id="hasSearch" name="search" checked={hasSearch}/>
              <label htmlFor="hasSearch">addSearch</label>
              <input type="radio"
                     onChange={this.onChangeHasSearch.bind(this, false)}
                     id="noSearch" name="search" checked={!hasSearch}/>
              <label htmlFor="noSearch">cancelSearch</label>
            </td>
          </tr>
          <tr>
            <td>showTextNumber</td>
            <td>
              <input type="number" onChange={this.onChangeShowNumber}
                     value={showTextNumber}/>
            </td>
          </tr>
          <tr>
            <td>selectedResult</td>
            <td>{selectedValue.length > 0 ? selectedValue.toString() : '未选择'}</td>
          </tr>
        </table>
      </article>
    );
  }
}

ReactDOM.render(<Root/>
  , document.getElementById('root'));