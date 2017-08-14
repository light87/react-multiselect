import React from "react";

export default class DropDown extends React.Component {
  static defaultProps = {
    top: 50,
    left: 50
  };
  static propTypes = {
    top: React.PropTypes.number,
    left: React.PropTypes.number,
    content: React.PropTypes.element,
    rootStyle: React.PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {top, content, left, rootStyle} = this.props;
    return (
      <div className="rm-dropdown"
           style={Object.assign({}, {
             top: top,
             left: left,
           }, rootStyle)}>
        <div className="">
          <div className="detail-panel">
            <div className="panel-package">
              <div className="package-status">
                <div className="status-box" id="status_list">
                  {content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}