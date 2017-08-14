# react-multiselect-dropdown

A client-side React component that presents the user with a list of items that maybe a group and select one or more of them using a DropDown.
support searchInput that filter options,selectAllCheckBox that select all options ,clear button that clear all selected options

## Features
Support for asynchronous search；


## Install
**Node**

```
npm install react-multiselect-dropdown
```

```javascript
import MultiSelect from 'react-multiselect-dropdown'
```
## API

### Required props

Minimal usage:

```js
let dataSource = [
  {id: 1, name: 'Item1'},
  {
    id: 2, 
    name: 'Item2',
    children:[
      {id: 2.1, name: 'Item2.1'},
      {id: 2.2, name: 'Item2.2'}
    ]
  }
]

let dataSourceConfig = {
  label: 'id', 
  text: 'name'
}

<MultiSelect
  dataSource={dataSource}
  dataSourceConfig={dataSourceConfig}
  initValue={[1,2]}
  onChange={this.onChange}
/>
```

`dataSource` - list of objects data for the multi-select. By default, these should have ``id`` and ``name`` properties, but this is configurable via props `dataSourceConfig`.

`onChange(value)` - callback which will be called with selected option objects each time the selection is added to or clear all selected options or select all opitons.

`initValue` - init options checked

### Optional props
`dataSourceConfig` - object that config dataSource object's property

`showTextNumber` - control button text default 1 that show selected text if selected number less than showTextNumber;

`hasSelectAll` - not support full selection if value is false

`hasSearch` - not support selector's filter if value is false

`buttonText` - support button placeholder

### Default props

```js
{
    dataSource: [],
    dataSourceConfig: {label: 'id', text: 'name'},
    showTextNumber: 1,
    buttonText: "选项",
    hasSelectAll: true,
    hasSearch: false
}
```

## Example

Example which implements display of selected items and de-selection.

```js
import React from "react";
import ReactDOM from "react-dom";
import "./css/multiSelector.css";
import MultiSelect from "./lib";
ReactDOM.render(<MultiSelect dataSource={[{id: 1, name: "test1"}, {id: 2, name: "test2"}]}/>, document.getElementById('root'));

```