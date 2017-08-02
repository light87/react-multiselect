import React from "react";
import DropDown from "./DropDown";

Array.prototype.indexOf = function (val) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === val) return i;
  }
  return -1;
};
Array.prototype.remove = function (val) {
  let index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
export default class MultiSelect extends React.Component {
  static defaultProps = {
    dataSource: [],
    dataSourceConfig: {value: 'id', text: 'name'},
    showNumber: 1,
    buttonText: "选项",
    hasAllCheckBox: true
  };
  static propTypes = {
    dataSource: React.PropTypes.array,
    dataSourceConfig: React.PropTypes.object,
    initValue: React.PropTypes.array,
    onChange: React.PropTypes.func,
    showNumber: React.PropTypes.number,
    buttonText: React.PropTypes.string,
    hasAllCheckBox: React.PropTypes.bool
  };

  static getDropDownContent() {
    let liItems = [];
    let that = this;
    const {dataSourceConfig} = that.props;
    const {optionsData} = that.state;
    const initValue = that.state.selectedValue;
    if (optionsData instanceof Array && optionsData.length > 0 && dataSourceConfig) {
      const {value, text} = dataSourceConfig;
      if (value !== undefined && value !== null && text !== undefined && text !== null) {
        optionsData.forEach((sourceData, index) => {
          if (sourceData.hasOwnProperty(value) && sourceData.hasOwnProperty(text) && initValue instanceof Array) {
            let checked = initValue.findIndex((init) => {
              return init === sourceData[value];
            }) !== -1;
            liItems.push(
              <li key={index}>
                <input type="checkbox"
                       checked={checked}
                       id={`checkbox${sourceData[value]}`}
                       onChange={that.onChange.bind(that, sourceData[value])}/>
                <label
                  htmlFor={`checkbox${sourceData[value]}`}>{sourceData[text]}</label>
              </li>
            );
          }
        });
      }
    }
    return (
      <ul>
        {liItems}
      </ul>
    );
  }

  static getShowLabelText() {
    const that = this;
    const {dataSourceConfig, showNumber, buttonText} = that.props;
    const {optionsData} = that.state;
    let checkedArray = that.state.selectedValue;
    let numberLimit = 1;
    if (showNumber !== null && showNumber !== undefined && (typeof test === "number")) {
      numberLimit = showNumber;
    }
    let showLabelText = `请选择${buttonText || '...'}`;
    if (optionsData.length > 0 && checkedArray.length > 0 && checkedArray.length !== optionsData.length) {
      if (checkedArray.length > numberLimit) {
        showLabelText = `已选择${checkedArray.length}个${buttonText || '...'}`;
      } else if (checkedArray.length <= numberLimit && checkedArray.length !== optionsData.length) {
        const {value, text} = dataSourceConfig;
        if (value !== undefined && value !== null && text !== undefined && text !== null) {
          let checkedTexts = checkedArray.reduce((root, checkValue) => {
            let sourceData = optionsData.find((sourceData) => {
              return sourceData[value] === checkValue;
            });
            if (sourceData !== null && sourceData !== undefined) {
              root.push(sourceData[text]);
            }
            return root;
          }, []);
          showLabelText = checkedTexts.toString();
        }
      }
    } else if (optionsData && optionsData.length > 0 && checkedArray.length === optionsData.length) {
      showLabelText = `${buttonText}已全选`;
    }
    return showLabelText;
  }

  static getPositionTop(divElement) {
    let actualTop = 0;
    if (divElement) {
      actualTop = divElement.offsetTop || 0;
      let current = divElement.offsetParent;
      while (current !== null && current !== undefined) {
        actualTop += current.offsetTop;
        actualTop -= current.paddingTop;
        current = current.offsetParent;
      }
    }
    return actualTop;
  }

  static getPositionLeft(divElement) {
    let actualLeft = 0;
    if (divElement) {
      actualLeft = divElement.offsetLeft || 0;
      let current = divElement.offsetParent;
      while (current !== null && current !== undefined) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
      }
    }
    return actualLeft;
  }

  static dataSourceAdapter() {
    const that = this;
    const {dataSourceConfig, dataSource} = that.props;
    let data = [];
    if (dataSource instanceof Array && dataSourceConfig) {
      const {value} = dataSourceConfig;
      if (value !== undefined && value !== null) {
        for (let i = dataSource.length - 1; i >= 0; i--) {
          let obj = dataSource[i];
          if (obj.hasOwnProperty(value)) {
            data.push(obj);
          }
        }
      }
    }
    return data;
  }

  constructor(props) {
    super(props);
    const {initValue} = this.props;
    this.state = {
      top: 0,
      left: 0,
      selectedValue: initValue || [],
      toggleDown: false,
      optionsData: MultiSelect.dataSourceAdapter.call(this)
    };
    this.onChange = this.onChange.bind(this);
    this.toggleDown = this.toggleDown.bind(this);
    this.toggleUp = this.toggleUp.bind(this);
    this.clearValue = this.clearValue.bind(this);
    this.onChangeCheckAll = this.onChangeCheckAll.bind(this);
  }

  onChange = function (checkValue, event) {
    const {selectedValue} = this.state;
    let result = [...selectedValue];
    if (event.target.checked) {
      result = [...result, checkValue];
    } else {
      result.remove(checkValue);
    }
    this.setState({
      selectedValue: result
    }, this.props.onChange && this.props.onChange(result));
  };

  toggleUp = function () {
    this.setState({
      toggleDown: false,
    });
  };

  toggleDown = function (event) {
    let top = MultiSelect.getPositionTop(event.currentTarget);
    let left = MultiSelect.getPositionLeft(event.currentTarget);
    this.setState({
      toggleDown: true,
      top: top,
      left: left
    });
  };

  clearValue = function () {
    this.setState({
      selectedValue: []
    }, this.props.onChange && this.props.onChange([]));
  };
  onChangeCheckAll = function (event) {
    const {optionsData} = this.state;
    const {dataSourceConfig} = this.props;
    if (optionsData.length !== 0) {
      const {value} = dataSourceConfig;
      let allCheckValues = [];
      if (event.target.checked) {
        for (let i = optionsData.length - 1; i >= 0; i--) {
          let obj = optionsData[i];
          allCheckValues.push(obj[value]);
        }
      }
      this.setState({
        selectedValue: allCheckValues
      }, this.props.onChange && this.props.onChange(allCheckValues));
    }
  };

  render() {
    const {hasAllCheckBox} = this.props;
    const {toggleDown, optionsData, selectedValue,top,left} = this.state;
    let content = MultiSelect.getDropDownContent.call(this);
    return (
      <div className="criteria-extended">
        <div className="criteria-list" onMouseLeave={this.toggleUp}>
          <button type="button"
                  className="criteria-selector aui-button aui-button-subtle drop-arrow"
                  onClick={this.toggleDown} style={{
            backgroundColor: 'rgba(212, 212, 212, 0.5)', color: '#333',
            borderColor: '#adadad'
          }}>
            <div className="criteria-wrap">
              <div className="searcherValue">
                <span className="fieldValue">
                  {MultiSelect.getShowLabelText.call(this)}
                </span>
              </div>
            </div>
          </button>
          <a href="javascript:void(0)" className="remove-filter"
             title="Remove criterion" tabIndex="-1" style={{display: 'inline'}}
             onClick={this.clearValue}/>
          {toggleDown &&
          <DropDown top={top}
                    content={
                      <div>
                        {hasAllCheckBox && optionsData.length > 0 &&
                        <div>
                          <input type="checkbox"
                                 checked={selectedValue.length === optionsData.length}
                                 id="allCheckBox"
                                 onChange={this.onChangeCheckAll}/>
                          <label
                            htmlFor={`allCheckBox`}>全选</label>
                        </div>
                        }
                        {content}
                      </div>
                    }
                    left={left}/>
          }
        </div>
      </div>
    );
  }
}
