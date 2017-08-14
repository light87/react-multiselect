"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _common = require("./common");

var _lodash = require("lodash");

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiSelect = function (_React$Component) {
  _inherits(MultiSelect, _React$Component);

  function MultiSelect(props) {
    _classCallCheck(this, MultiSelect);

    var _this = _possibleConstructorReturn(this, (MultiSelect.__proto__ || Object.getPrototypeOf(MultiSelect)).call(this, props));

    _this.toggleDown = function (event) {
      var toggleDown = _this.state.toggleDown;

      var top = (0, _common.getPositionTop)(event.currentTarget);
      event.currentTarget.offsetHeight && (top += event.currentTarget.offsetHeight);
      var left = (0, _common.getPositionLeft)(event.currentTarget);
      var clientWidth = document.body.clientWidth;
      if (left > clientWidth / 2) {
        left = clientWidth - left;
      }
      _this.stopPropagation(event);
      _this.setState({ toggleDown: !toggleDown, top: top, left: left });
    };

    _this.toggleUp = function () {
      _this.setState({ toggleDown: false });
    };

    _this.stopPropagation = function (event) {
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
    };

    _this.getSelectLis = function () {
      var _this$props = _this.props,
          dataSourceConfig = _this$props.dataSourceConfig,
          dataSource = _this$props.dataSource;
      var _this$state = _this.state,
          selectedValue = _this$state.selectedValue,
          searchText = _this$state.searchText;

      var that = _this;
      var liElements = [];
      if (_this.checkConfigValid() && dataSource && dataSource instanceof Array) {
        var label = dataSourceConfig.label,
            text = dataSourceConfig.text;

        for (var i = 0; i < dataSource.length; i++) {
          var obj = dataSource[i];
          if (!obj || !obj[label]) {
            continue;
          }
          var li = _this.generateLiElement.call(that, obj, label, text, selectedValue, searchText);
          li && liElements.push(li);
        }
      }
      return liElements;
    };

    _this.checkConfigValid = function () {
      var validConfig = false;
      var dataSourceConfig = _this.props.dataSourceConfig;

      if (dataSourceConfig && dataSourceConfig instanceof Object) {
        var label = dataSourceConfig.label;

        if (label !== undefined && label !== null && (typeof label === 'number' || typeof label === 'string')) {
          validConfig = true;
        }
      }
      return validConfig;
    };

    _this.generateLiElement = function (node, label, text, selectedValue, searchText) {
      var that = _this;
      var element = null;
      if (node.children && node.children.length > 0) {
        var lis = [];
        var length = node.children.length;
        for (var i = 0; i < length; i++) {
          var li = _this.generateLiElement.call(that, node.children[i], label, text, selectedValue, searchText);
          li && lis.push(li);
        }
        var optionChecked = that.checkOptionsAllChecked(selectedValue, node.children);
        if (lis.length > 0) {
          element = _react2.default.createElement(
            "li",
            null,
            _react2.default.createElement(
              "div",
              null,
              _react2.default.createElement("input", { type: "checkbox", id: node[label], checked: optionChecked,
                "data-key": node[label],
                onChange: that.onChangeOption }),
              _react2.default.createElement(
                "label",
                {
                  htmlFor: node[label] },
                node[text]
              ),
              _react2.default.createElement(
                "ul",
                null,
                lis
              )
            )
          );
        }
      } else if (node && node[label] && that.filter(searchText, node[text])) {
        var _optionChecked = that.checkOptionsAllChecked(selectedValue, Array.of(node));
        element = _react2.default.createElement(
          "li",
          null,
          _react2.default.createElement("input", { type: "checkbox", id: node[label], checked: _optionChecked,
            "data-key": node[label],
            onChange: that.onChangeOption }),
          _react2.default.createElement(
            "label",
            {
              htmlFor: node[label] },
            node[text]
          )
        );
      }
      return element;
    };

    _this.onChangeOption = function (event) {
      var optionChecked = event.target.checked;
      var selectedValue = _this.state.selectedValue;
      var _this$props2 = _this.props,
          dataSourceConfig = _this$props2.dataSourceConfig,
          dataSource = _this$props2.dataSource,
          onChange = _this$props2.onChange;

      if (_this.checkConfigValid()) {
        var label = dataSourceConfig.label;

        var result = [].concat(_toConsumableArray(selectedValue));
        var checkedLabel = event.target.getAttribute('data-key');
        var checkedNode = (0, _common.findNode)(dataSource, checkedLabel, label);
        var checkedChildrenNodes = (0, _common.getAllNoChildrenNodes)(Array.of(checkedNode));
        var checkedIds = _.chain(checkedChildrenNodes).filter(function (child) {
          return child.hasOwnProperty(label);
        }).map(label).value();
        if (optionChecked) {
          result = _.union(result, checkedIds);
        } else {
          result = _.difference(result, checkedIds);
        }
        _this.setState({
          selectedValue: result,
          allChecked: _this.checkOptionsAllChecked(result, dataSource)
        }, onChange && onChange(result));
      }
    };

    _this.checkOptionsAllChecked = function (selectedValue, dataSource) {
      var allSelected = false;
      var dataSourceConfig = _this.props.dataSourceConfig;

      if (_this.checkConfigValid()) {
        var label = dataSourceConfig.label;

        var allNodes = (0, _common.getAllNoChildrenNodes)(dataSource);
        var allNodeLabels = _.chain(allNodes).filter(function (node) {
          return node.hasOwnProperty(dataSourceConfig.label);
        }).map(label).value();
        var result = _.union(selectedValue, allNodeLabels);
        if (selectedValue.length === result.length) {
          allSelected = true;
        }
      }
      return allSelected;
    };

    _this.onChangeAllOption = function (event) {
      var optionChecked = event.target.checked;
      var _this$props3 = _this.props,
          dataSourceConfig = _this$props3.dataSourceConfig,
          dataSource = _this$props3.dataSource,
          onChange = _this$props3.onChange;

      if (_this.checkConfigValid()) {
        var label = dataSourceConfig.label;

        var result = [];
        var checkedChildrenNodes = (0, _common.getAllNoChildrenNodes)(dataSource);
        var checkedIds = _.chain(checkedChildrenNodes).filter(function (child) {
          return child.hasOwnProperty(label);
        }).map(label).value();
        if (optionChecked) {
          result = _.union(result, checkedIds);
        }
        _this.setState({
          selectedValue: result,
          allChecked: _this.checkOptionsAllChecked(result, dataSource)
        }, onChange && onChange(result));
      }
    };

    _this.onClickClearOptions = function (event) {
      _this.stopPropagation(event);
      var _this$props4 = _this.props,
          dataSource = _this$props4.dataSource,
          onChange = _this$props4.onChange;

      _this.setState({
        selectedValue: [],
        allChecked: _this.checkOptionsAllChecked([], dataSource)
      }, onChange && onChange([]));
    };

    _this.onChangeSearchText = function (event) {
      _this.setState({ searchText: event.target.value });
    };

    _this.filter = function (searchText, text) {
      return searchText === '' || text.indexOf(searchText) !== -1;
    };

    _this.getShowLabelText = function () {
      var _this$props5 = _this.props,
          buttonText = _this$props5.buttonText,
          showTextNumber = _this$props5.showTextNumber,
          dataSource = _this$props5.dataSource,
          dataSourceConfig = _this$props5.dataSourceConfig;
      var _this$state2 = _this.state,
          selectedValue = _this$state2.selectedValue,
          allChecked = _this$state2.allChecked;

      var labelText = buttonText || '选项';
      var showNumber = showTextNumber || 1;
      if (allChecked) {
        labelText += ' 已全选';
      } else if (showNumber && selectedValue.length > 0 && selectedValue.length > showNumber) {
        labelText += " " + selectedValue.length + "\u4E2A";
      } else if (showNumber && selectedValue.length > 0 && selectedValue.length <= showNumber) {
        var label = dataSourceConfig.label,
            text = dataSourceConfig.text;

        var allOptionNodes = (0, _common.getAllNoChildrenNodes)(dataSource);
        var selectedText = allOptionNodes.reduce(function (root, node) {
          if (selectedValue.findIndex(function (checkedValue) {
            return node[label] && checkedValue.toString() === node[label].toString();
          }) !== -1) {
            root.push(node[text]);
          }
          return root;
        }, []);
        labelText += " " + selectedText.toString();
      }
      return labelText;
    };

    var initValue = _this.props.initValue;

    var initSelected = initValue || [];
    _this.state = {
      top: 0,
      left: 0,
      selectedValue: initSelected,
      toggleDown: false,
      searchText: '',
      allChecked: false
    };
    _this.toggleUp = _this.toggleUp.bind(_this);
    _this.toggleDown = _this.toggleDown.bind(_this);
    _this.stopPropagation = _this.stopPropagation.bind(_this);
    _this.onChangeOption = _this.onChangeOption.bind(_this);
    _this.inputDebounce = _.debounce(function (event) {}, 1000);
    _this.onChangeSearchText = _this.onChangeSearchText.bind(_this);
    return _this;
  }

  _createClass(MultiSelect, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('click', this.toggleUp, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.toggleUp, false);
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          hasSelectAll = _props.hasSelectAll,
          hasSearch = _props.hasSearch;
      var _state = this.state,
          toggleDown = _state.toggleDown,
          selectedValue = _state.selectedValue,
          top = _state.top,
          left = _state.left,
          searchText = _state.searchText,
          allChecked = _state.allChecked;

      return _react2.default.createElement(
        "div",
        { className: "criteria-extended" },
        _react2.default.createElement(
          "div",
          { className: "criteria-list" },
          _react2.default.createElement(
            "button",
            { type: "button",
              className: "criteria-selector aui-button aui-button-subtle drop-arrow",
              style: {
                backgroundColor: 'rgba(212, 212, 212, 0.5)', color: '#333',
                borderColor: '#adadad'
              }, onClick: this.toggleDown },
            _react2.default.createElement(
              "div",
              { className: "criteria-wrap" },
              _react2.default.createElement(
                "div",
                { className: "searcherValue" },
                _react2.default.createElement(
                  "span",
                  { className: "fieldValue" },
                  this.getShowLabelText()
                )
              )
            )
          ),
          _react2.default.createElement("a", { href: "javascript:void(0)", className: "remove-select",
            title: "remove selected value", tabIndex: "-1",
            style: { display: 'inline' }, onClick: this.onClickClearOptions
          }),
          _react2.default.createElement(
            "div",
            { className: "rm-dropdown-menu " + (toggleDown ? 'open' : ''),
              style: Object.assign({}, {
                top: top
              }), onClick: this.stopPropagation },
            _react2.default.createElement(
              "div",
              { className: "dropdown-content" },
              _react2.default.createElement(
                "div",
                { className: "search-operation " + (hasSearch ? 'open' : '') },
                _react2.default.createElement("input", { type: "text",
                  id: "searchText",
                  value: searchText,
                  onChange: this.onChangeSearchText
                })
              ),
              _react2.default.createElement(
                "div",
                {
                  className: "allCheck-operation " + (hasSelectAll ? 'open' : '') },
                _react2.default.createElement("input", { type: "checkbox",
                  id: "allCheckBox",
                  checked: allChecked,
                  onChange: this.onChangeAllOption
                }),
                _react2.default.createElement(
                  "label",
                  {
                    htmlFor: "allCheckBox" },
                  "\u5168\u9009"
                )
              )
            ),
            _react2.default.createElement(
              "ul",
              { className: "dropdown-operation" },
              this.getSelectLis()
            )
          )
        )
      );
    }
  }]);

  return MultiSelect;
}(_react2.default.Component);

MultiSelect.defaultProps = {
  dataSource: [],
  dataSourceConfig: { label: 'id', text: 'name' },
  showTextNumber: 1,
  buttonText: "选项",
  hasSelectAll: true,
  hasSearch: false
};
MultiSelect.propTypes = {
  dataSource: _react2.default.PropTypes.array,
  dataSourceConfig: _react2.default.PropTypes.object,
  initValue: _react2.default.PropTypes.array,
  onChange: _react2.default.PropTypes.func,
  buttonText: _react2.default.PropTypes.string,
  showTextNumber: _react2.default.PropTypes.number,
  hasSelectAll: _react2.default.PropTypes.bool,
  hasSearch: _react2.default.PropTypes.bool
};
exports.default = MultiSelect;