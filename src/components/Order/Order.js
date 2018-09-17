import React from 'react';
import PropTypes from 'prop-types';
import {formatPrice} from '../../helpers';
import {TransitionGroup, CSSTransition} from "react-transition-group";





class Order extends React.Component{

        static propTypes = {
            fishes: PropTypes.object,
            order: PropTypes.object,
            deleteOrder: PropTypes.func
        }

    renderOrder = key => {
       // debugger;
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvailable= fish && fish.status === "available";

        const transitionOptions = {

            classNames:"order" ,
            key: key,
            timeout: { enter: 500, exit: 500}
        };

        // make sure fish is loaded before we continue
        if(!fish) return null;
        if(!isAvailable){
            return (
            <CSSTransition {...transitionOptions} >
             <li  key={key}> Sorry {fish ? fish.name : "fish"} is no longer available </li>; 
             </CSSTransition> 
    );    
    }
        return (
        <CSSTransition {...transitionOptions}>
 <li key={key}>
            <span>
        <TransitionGroup component="span" className="count">
            <CSSTransition {...transitionOptions}>
        <span> {count} </span>
            </CSSTransition>
        </TransitionGroup>
        lbs {fish.name}
        {formatPrice(count * fish.price)}
        <button onClick={() => this.props.deleteOrder(key)}>Remove</button>
        </span>
        </li>

        </CSSTransition> 
        ); 
        
    };
    
    
    render() {
        const orderTds = Object.keys(this.props.order);
        const total = orderTds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if(isAvailable){
                return prevTotal + (count * fish.price);
            }
            return prevTotal
        },0);
        return (
            <div className="Order-wrap">
                <h2>Order</h2>
                <TransitionGroup component="ul" className="order">
                {orderTds.map(this.renderOrder)}
                
                </TransitionGroup>
               
            <div className="total">
            Total:
        <strong>{formatPrice(total)}</strong>

            </div>
            </div>
        )
    }
}

export default Order;