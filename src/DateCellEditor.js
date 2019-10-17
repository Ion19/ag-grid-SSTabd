import React, { Component } from 'react';

class DateCellEditor extends Component {
  state = {
      value:null
  }

  

  get value () {
    let {
      props,
      state: { value }
    } = this;
    if (value == null) {
      value = props.value;
    }
    return value;
  }
  getValue () {
    return this.state.value;
  }
 
  onChange = (event) => {
    this.setState({
      value: event.target.value
    });
    console.log(this.state.value)
  }
  
  render () {
    return <input type="date" 
      value={this.value}
      onChange={this.onChange}
    
    />;
  }
}

export default DateCellEditor; 