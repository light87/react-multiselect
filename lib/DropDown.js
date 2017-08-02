import React from "react";

export default class DropDown extends React.Component {
  static defaultProps = {
    top: 50,
    left: 50
  };
  static propTypes = {
    top: React.PropTypes.number,
    left: React.PropTypes.number,
    content: React.PropTypes.element
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {top, content, left} = this.props;
    return (
      <div style={{
        display: 'static',
        position: 'absolute',
        marginLeft: '-8px',
        top: top,
        left: left,
        zIndex: 1500,
        width: 'auto',
        lineHeight: 1.2,
        textAlign: 'left',
        color: '#5a4848',
        fontSize: 13,
        minWidth: '300px',
        border: '1px solid #00bcd4'
      }} className="show">
        <div>
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