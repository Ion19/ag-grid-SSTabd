import React, { Component } from 'react';

class NumericCellEditor extends Component {
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
    console.log(this.props)
  }
  
  render () {
    return <input
      ref="input"
      type="number"
      value={this.value}
      onChange={this.onChange}
    //   style={{width: "100%"}}
    />;
  }
}

export default NumericCellEditor; 