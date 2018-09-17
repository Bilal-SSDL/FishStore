import React from 'react';
import PropTypes from "prop-types";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import firebase from 'firebase';
import base,{ firebaseApp } from "../../base";


class Inventory extends React.Component{

    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    }

    
     state=  {
         owner: null,
         uid: null
     };

    authHandler = async (authData) => {

        // 1. Look up the current store in the firebase database

        const store = await base.fetch(this.props.storeId, {context: this});
        console.log(store);

        //2. claim it if there is no owner
        if(!store.owner){
            // save it as our owner
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            })
        }

        //3. set the state of the inventory component to reflect the current user

            this.setState({
                uid: authData.user.uid,
                owner: store.owner || authData.user.uid
            })

       // console.log(authData);
    };
    
    authenticate  = (provider) => {
       // alert(provider);
       const authProvider = new firebase.auth[`${provider}AuthProvider`]();
       firebaseApp
       .auth()
       .signInWithPopup(authProvider)
       .then(this.authHandler);
    };

    logout = async () => {
        console.log('Logging Out');
        await firebase.auth().signOut();
        this.setState({uid: null});
    }
    render() {


        const {fishes} =this.props;

        const Logout = <button onClick={this.logout}>Logout Out! </button>
            //1. check if they are not logged in
        if(!this.state.uid){
            return <Login  authenticate={this.authenticate}/>
        }
    

        //2. check if they are the owner of the store

        if(this.state.uid !== this.state.owner)
        {
            return (
                <div>
                    <p>
                            Sorry you are not the owner of the Store.

                    </p>
                    {Logout}

                </div>

            )
        }
        // 3. they must be the owner, just render the inventory
        return (
            <div className='Inventory'>
            
            <h2> Inventory</h2>
            {Logout}
        {Object.keys(fishes).map(key => <EditFishForm key={key} index={key} fish={fishes[key]} updateFish={this.props.updateFish} deleteFish={this.props.deleteFish} />) }

                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        );
    }
}

export default Inventory;