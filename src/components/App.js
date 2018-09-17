import React from "react";
import PropTypes from "prop-types";
import Header from "./Store/Header";
import Order from "./Order/Order";
import Inventory from "./Inventory/Inventory";
import samplefishes from "../sample-fishes";
import Fish from "./Store/Fish";
import base from "../base";




class App extends React.Component{

static propTypes = {
    match: PropTypes.object
};

    state = {
        fishes: {},
        order:{}
};
addFish = fish =>{
    // how to update state
    // 1. take a copy of existing state
    const fishes= {...this.state.fishes};
    // 2. add new new fish to that fishes variable
    fishes[`fish${Date.now()}`] =fish;
    // 3. Set the new fishes object into state
    this.setState(
        {   
            fishes: fishes
        }
    );
};

updateFish = (key, updatedFish) => {

    // 1. take the copy of the current state
    const fishes = {...this.state.fishes};
    // update that state
    fishes[key]= updatedFish;
    // set that to state
    this.setState({fishes});
}

deleteFish = (key) => {
    //take the copy of stat
    const {fishes}=this.state;
   const newFishes = Object.values(fishes);
// Remove and update the state
//fishes[key] = null;
debugger;
const filteredFish=newFishes.filter((fish) => {
    return fish.name !== key
})

//3. update the state
 this.setState({fishes:filteredFish});  
}

addToOrder = (key) => {

// 1. take a copy of state
const order = {...this.state.order}
// 2. Either add to the order, or update the number in our order
order[key] = order[key] + 1 || 1 ;
// 3.call set state to update our state object
this.setState({ order });
};

deleteOrder = key => {
     debugger;
      //take the copy of order
      const OrderFish= {...this.state.order};
      //remove or update the order
       delete OrderFish[key];
      // set the state
      this.setState({ order:OrderFish });
  }
  // These method are called in the following order when an instance of a component is being created and inserted into the DOM
componentDidMount() {
    // console.log("Mounted!!!!!!!");
    const {params} = this.props.match;
    // first reinstate our local storage
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef){
        console.log(JSON.parse(localStorageRef));
        this.setState({order: JSON.parse(localStorageRef)})
    }
    console.log(localStorageRef);
    this.ref = base.syncState(`${params.storeId}/fishes`, {
        context: this,
        state: 'fishes'
    });

}

componentDidUpdate() {
    const {params} = this.props.match;
    console.log(this.state.order);
    localStorage.setItem(params.storeId, JSON.stringify( this.state.order))
    console.log("Updated!")
}
// This method is called when a component is being removed from the DOM
componentWillUnmount() {
      console.log("UNMounted!!!!!!!");
      base.removeBinding(this.ref);
}

loadSampleFishes = () =>{
    this.setState({fishes:samplefishes}); 
}
    render() {
        
        return (
        <div className="catch-of-the-day">
            <div className="menu">
                <Header tagline="Sea Foods" age={500} cool={true} />  
                
                <ul className="fishes">
                    {Object.keys(this.state.fishes).map(key => (
                       
                        // <p key={key}>{key}</p>
                        <Fish key={key}
                             index={key}
                             details={this.state.fishes[key]}
                             addToOrder={this.addToOrder} />
                    ))
        }
                </ul>  
            </div>           
            <Order fishes={this.state.fishes} order={this.state.order}   deleteOrder={this.deleteOrder} />    
            <Inventory addFish={this.addFish}
                       loadSampleFishes={this.loadSampleFishes}
                       updateFish={this.updateFish}
                       deleteFish={this.deleteFish}
                       fishes={this.state.fishes}
                       storeId= {this.props.match.params.storeId}
            />
        </div>
        )
    }

}
export default App;



// const App = () => {

// <div className="catch-of-the-day">
//             <div className="menu">
//                 <Header tagline="Sea Foods" age={500} cool={true} />    
               
//             </div>
            
//             <Order />    
//             <Inventory />
//         </div>

// }