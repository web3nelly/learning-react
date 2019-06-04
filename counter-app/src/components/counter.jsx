import React, { Component } from 'react';

class Counter extends Component {
  componentDidUpdate(prevProps, prevState) {
    console.log('prevProps', prevProps);
    console.log('prevState', prevState);

    if (prevProps.counter.vaule !== this.props.counter.value) {
      // Ajax call and get new data from the server
    }
  }

  componentWillUnmount() {
    // This is where we preform clean-up 
    console.log('Counter - Unmount');
  }

  render() {
    console.log('Counter - Rendered');

    return (
      <div className="row">
        <div className="col-sm-2">
          <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        </div>
        <div className="col">
          <button
            onClick={() => this.props.onIncrement(this.props.counter)}
            className="btn btn-secondary btn-sm">
            +
        </button>
          <button
            onClick={() => this.props.onDecrement(this.props.counter)}
            className="btn btn-sm m-2 btn-secondary"
            disabled={this.disabledDecrement()}
          >
            -
        </button>
          <button
            onClick={() => this.props.onDelete(this.props.counter.id)}
            className="btn btn-danger btn-sm">
            X
        </button>
        </div>
      </div >
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    return classes += this.props.counter.value === 0 ? "warning" : "primary";
  }

  disabledDecrement() {
    return this.props.counter.value > 0 ? '' : 'disable';
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? 'Zero' : value;
  }
}

export default Counter;