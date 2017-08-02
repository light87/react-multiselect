# react-multiselect

A client-side React component that presents the user with a list of items and select one or more of them using a DropDown.

## Features
Support for synchronous search；
Supports asynchronous search function

## Install
**Node**

```
npm install react-multiselect
```

```javascript
import MultiSelect from 'react-multiselect'
// or
const MultiSelect = require('react-multiselect')
```
## API

### Required props

Minimal usage:

```js
let dataSource = [
  {value: 1, text: 'Item One'},
  {value: 2, text: 'Item Two'}
]

let dataSourceConfig = {
  value: 'value', 
  text: 'text'
}

<MultiSelect
  dataSource={dataSource}
  dataSourceConfig={dataSourceConfig}
  onChange={this.onChange}
/>
```

`dataSource` - list of objects data for the multi-select. By default, these should have ``id`` and ``name`` properties, but this is configurable via props `dataSourceConfig`.

`onChange(value)` - callback which will be called with selected option objects each time the selection is added to.

### Optional props

`showNumber` - callback which will be called with selected option objects each time the selection is added to.

`hasAllCheckBox` - not support full selection if value is false


### Default props

```js
{
  dataSource: [],
  dataSourceConfig: {value: 'id', text: 'name'},
  showNumber: 1,
  buttonText: "选项",
  hasAllCheckBox: true
}
```

## Example

Example which implements display of selected items and de-selection.

```js
import React from "react";
import ReactDOM from "react-dom";
import "./css/multiSelector.css";
import MultiSelector from "./src/MultiSelect";
ReactDOM.render(<MultiSelector dataSource={[{id: 1, name: "test1"}, {id: 2, name: "test2"}]}/>, document.getElementById('root'));

```