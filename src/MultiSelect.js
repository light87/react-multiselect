"use strict";

import React from "react";
import {
  getAllNoChildrenNodes,
  findNode,
  getPositionLeft,
  getPositionTop
} from "./common";
import * as _ from "lodash";

export default class MultiSelect extends React.Component {
  static defaultProps = {
    dataSource: [],
    dataSourceConfig: {label: 'id', text: 'name'},
    showTextNumber: 1,
    buttonText: "选项",
    hasSelectAll: true,
    hasSearch: false,
  };
  static propTypes = {
    dataSource: React.PropTypes.array,
    dataSourceConfig: React.PropTypes.object,
    initValue: React.PropTypes.array,
    onChange: React.PropTypes.func,
    buttonText: React.PropTypes.string,
    showTextNumber: React.PropTypes.number,
    hasSelectAll: React.PropTypes.bool,
    hasSearch: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);
    const {initValue} = this.props;
    let initSelected = initValue || [];
    this.state = {
      top: 0,
      left: 0,
      selectedValue: initSelected,
      toggleDown: false,
      searchText: '',
      allChecked: false
    };
    this.toggleUp = this.toggleUp.bind(this);
    this.toggleDown = this.toggleDown.bind(this);
    this.stopPropagation = this.stopPropagation.bind(this);
    this.onChangeOption = this.onChangeOption.bind(this);
    this.inputDebounce = _.debounce((event) => {
    }, 1000);
    this.onChangeSearchText = this.onChangeSearchText.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.toggleUp, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.toggleUp, false);
  }

  toggleDown = (event) => {
    const {toggleDown} = this.state;
    let top = getPositionTop(event.currentTarget);
    event.currentTarget.offsetHeight && ( top += event.currentTarget.offsetHeight);
    let left = getPositionLeft(event.currentTarget);
    let clientWidth = document.body.clientWidth;
    if (left > clientWidth / 2) {
      left = clientWidth - left;
    }
    this.stopPropagation(event);
    this.setState({toggleDown: !toggleDown, top, left});
  };

  toggleUp = () => {
    this.setState({toggleDown: false});
  };

  stopPropagation = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };

  getSelectLis = () => {
    const {dataSourceConfig, dataSource} = this.props;
    const {selectedValue, searchText} = this.state;
    const that = this;
    let liElements = [];
    if (this.checkConfigValid() && dataSource && dataSource instanceof Array) {
      const {label, text} = dataSourceConfig;
      for (let i = 0; i < dataSource.length; i++) {
        let obj = dataSource[i];
        if (!obj || !obj[label]) {
          continue;
        }
        let li = this.generateLiElement.call(that, obj, label, text, selectedValue, searchText);
        li && liElements.push(li);
      }
    }
    return liElements;
  };
  checkConfigValid = () => {
    let validConfig = false;
    const {dataSourceConfig} = this.props;
    if (dataSourceConfig && dataSourceConfig instanceof Object) {
      const {label} = dataSourceConfig;
      if (label !== undefined && label !== null && (typeof label === 'number' || typeof label === 'string')) {
        validConfig = true;
      }
    }
    return validConfig;
  };

  generateLiElement = (node, label, text, selectedValue, searchText) => {
    const that = this;
    let element = null;
    if (node.children && node.children.length > 0) {
      let lis = [];
      let length = node.children.length;
      for (let i = 0; i < length; i++) {
        let li = this.generateLiElement.call(that, node.children[i], label, text, selectedValue, searchText);
        li && lis.push(li);
      }
      let optionChecked = that.checkOptionsAllChecked(selectedValue, node.children);
      if (lis.length > 0) {
        element = (
          <li>
            <div>
              <input type="checkbox" id={node[label]} checked={optionChecked}
                     data-key={node[label]}
                     onChange={that.onChangeOption}/><label
              htmlFor={node[label]}>{node[text]}</label>
              <ul>
                {lis}
              </ul>
            </div>
          </li>
        );
      }
    } else if (node && node[label] && that.filter(searchText, node[text])) {
      let optionChecked = that.checkOptionsAllChecked(selectedValue, Array.of(node));
      element = (
        <li><input type="checkbox" id={node[label]} checked={optionChecked}
                   data-key={node[label]}
                   onChange={that.onChangeOption}/><label
          htmlFor={node[label]}>{node[text]}</label></li>);
    }
    return element;
  };

  onChangeOption = (event) => {
    let optionChecked = event.target.checked;
    const {selectedValue} = this.state;
    const {dataSourceConfig, dataSource,onChange} = this.props;
    if (this.checkConfigValid()) {
      const {label} = dataSourceConfig;
      let result = [...selectedValue];
      let checkedLabel = event.target.getAttribute('data-key');
      let checkedNode = findNode(
        dataSource, checkedLabel, label
      );
      let checkedChildrenNodes = getAllNoChildrenNodes(Array.of(checkedNode));
      let checkedIds = _.chain(checkedChildrenNodes).filter((child) => {
        return child.hasOwnProperty(label);
      }).map(label).value();
      if (optionChecked) {
        result = _.union(result, checkedIds);
      } else {
        result = _.difference(result, checkedIds);
      }
      this.setState({
        selectedValue: result,
        allChecked: this.checkOptionsAllChecked(result, dataSource)
      },onChange&&onChange(result));
    }
  };

  checkOptionsAllChecked = (selectedValue, dataSource) => {
    let allSelected = false;
    const {dataSourceConfig} = this.props;
    if (this.checkConfigValid()) {
      const {label} = dataSourceConfig;
      let allNodes = getAllNoChildrenNodes(dataSource);
      let allNodeLabels = _.chain(allNodes).filter((node) => {
        return node.hasOwnProperty(dataSourceConfig.label);
      }).map(label).value();
      let result = _.union(selectedValue, allNodeLabels);
      if (selectedValue.length === result.length) {
        allSelected = true;
      }
    }
    return allSelected;
  };
  onChangeAllOption = (event) => {
    let optionChecked = event.target.checked;
    const {dataSourceConfig, dataSource,onChange} = this.props;
    if (this.checkConfigValid()) {
      const {label} = dataSourceConfig;
      let result = [];
      let checkedChildrenNodes = getAllNoChildrenNodes(dataSource);
      let checkedIds = _.chain(checkedChildrenNodes).filter((child) => {
        return child.hasOwnProperty(label);
      }).map(label).value();
      if (optionChecked) {
        result = _.union(result, checkedIds);
      }
      this.setState({
        selectedValue: result,
        allChecked: this.checkOptionsAllChecked(result, dataSource)
      },onChange&&onChange(result));
    }
  };

  onClickClearOptions = (event) => {
    this.stopPropagation(event);
    const {dataSource,onChange} = this.props;
    this.setState({
      selectedValue: [],
      allChecked: this.checkOptionsAllChecked([], dataSource)
    },onChange&&onChange([]));
  };
  onChangeSearchText = (event) => {
    this.setState({searchText: event.target.value});
  };
  filter = (searchText, text) => {
    return searchText === '' || text.indexOf(searchText) !== -1;
  };
  getShowLabelText = () => {
    const {buttonText, showTextNumber, dataSource, dataSourceConfig} = this.props;
    const {selectedValue, allChecked} = this.state;
    let labelText = buttonText || '选项';
    let showNumber = showTextNumber || 1;
    if (allChecked) {
      labelText += ' 已全选';
    } else if (showNumber && selectedValue.length > 0 && selectedValue.length > showNumber) {
      labelText += ` ${selectedValue.length}个`;
    } else if (showNumber && selectedValue.length > 0 && selectedValue.length <= showNumber) {
      const {label, text} = dataSourceConfig;
      let allOptionNodes = getAllNoChildrenNodes(dataSource);
      let selectedText = allOptionNodes.reduce((root, node) => {
        if (selectedValue.findIndex((checkedValue) => {
            return node[label] && (checkedValue.toString() === node[label].toString());
          }) !== -1) {
          root.push(node[text]);
        }
        return root;
      }, []);
      labelText += ` ${selectedText.toString()}`;
    }
    return labelText;
  };

  render() {
    const {hasSelectAll, hasSearch} = this.props;
    const {toggleDown, selectedValue, top, left, searchText, allChecked} = this.state;
    return (
      <div className="criteria-extended">
        <div className="criteria-list">
          <button type="button"
                  className="criteria-selector aui-button aui-button-subtle drop-arrow"
                  style={{
                    backgroundColor: 'rgba(212, 212, 212, 0.5)', color: '#333',
                    borderColor: '#adadad'
                  }} onClick={this.toggleDown}>
            <div className="criteria-wrap">
              <div className="searcherValue">
                <span className="fieldValue">
                  {this.getShowLabelText()}
                </span>
              </div>
            </div>
          </button>
          <a href="javascript:void(0)" className="remove-select"
             title="remove selected value" tabIndex="-1"
             style={{display: 'inline'}} onClick={this.onClickClearOptions}
          />
          <div className={`rm-dropdown-menu ${toggleDown ? 'open' : ''}`}
               style={Object.assign({}, {
                 top: top,
               })} onClick={this.stopPropagation}>
            <div className="dropdown-content">
              <div className={`search-operation ${hasSearch ? 'open' : ''}`}>
                <input type="text"
                       id="searchText"
                       value={searchText}
                       onChange={this.onChangeSearchText}
                />
              </div>
              <div
                className={`allCheck-operation ${hasSelectAll ? 'open' : ''}`}>
                <input type="checkbox"
                       id="allCheckBox"
                       checked={allChecked}
                       onChange={this.onChangeAllOption}
                />
                <label
                  htmlFor={`allCheckBox`}>全选</label>
              </div>
            </div>
            <ul className="dropdown-operation">
              {this.getSelectLis()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}