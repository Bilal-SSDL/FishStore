import React, {Fragment} from 'react';
import PropTypes from "prop-types";
import {Component} from 'react';
import { getFunName } from "../../helpers";



class StorePicker extends Component{

static propTypes = {
    history: PropTypes.object
};


    // constructor() {
    //     super();
    //     this.goToStore = this.goToStore.bind(this);

    // }
    

    myInput = React.createRef();


    // handleClick() {
    //     alert("Click Me !!!!!")
    // }
    goToStore = (event) => {
        //1.stop the form from submitting
        event.preventDefault();
        console.log("Going to Store");
        //2. get the text from input
        const storeName = this.myInput.defaultValue;
        console.log(storeName);

        //3. change the page to /store/whatever-they-entered

        this.props.history.push(`/store/${storeName}`);
    
    }

    render(){
       return (
        <Fragment>
            <form action="" className="store-selector" onSubmit={this.goToStore}>
            <h2>Pleae enter a Store</h2>
            {/* <button onClick={this.handleClick}>Click Me! </button> */}
            <input type="text" ref={this.myInput} required placeholder="Store Name" defaultValue={getFunName()} />
            <button type='submit'>Visit Store </button>
            </form>
        </Fragment>
       );
    } 
    }
    export default StorePicker;