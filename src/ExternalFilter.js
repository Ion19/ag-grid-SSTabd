import React, { Component } from 'react';

export class ExternalFilter extends Component {
    
    componentDidMount(){
        console.log(this.props)
    }

    state={
        filterValue:"", 
        filterKey:""

    }

    handleChange=(e)=>{
       
        this.setState({
            [e.target.name]:e.target.value
        },()=>{console.log(this.state.filterValue)})
        

        
    }

    handleSubmitFilter=()=>{
        this.props.submitFilter(this.state.filterKey, this.state.filterValue)
    }



    render() {

    
        return (
            <div>
                <input 
                type="text"
                name="filterValue"
                onChange={this.handleChange}
                value={this.state.filterValue}
                />
                <select 
                name="filterKey"
                onChange={this.handleChange}
                 >
                    <option value="athelete">athelete</option>
                    <option value="id">id</option>
                    <option value="country">country</option>
                    <option value="year">year</option>
                    <option value="age">age</option>

                </select>

                <button onClick={()=>this.handleSubmitFilter()} >filter</button>

               
            </div>
        )
    }
}

export default ExternalFilter;
