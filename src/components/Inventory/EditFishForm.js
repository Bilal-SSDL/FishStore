import React from 'react';
import PropTypes from "prop-types";


class EditFishForm extends React.Component {

    static propTypes = {
        updatedFish: PropTypes.func,
        deleteFish: PropTypes.func,
        fish: PropTypes.shape ({
            image:PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status:PropTypes.string,
            price:PropTypes.number       
        }),
        index: PropTypes.string
    }

   handleChange = event => {
       console.log(event.currentTarget.value);
       // update that fish
       // 1. take the copy of current fish
       const updatedFish= {
           ...this.props.fish,
           [event.currentTarget.name]: event.currentTarget.value
    };
    //    console.log(updatedFish);

    this.props.updateFish(this.props.index, updatedFish);

   }
      
    render() {
        const {fish} = this.props;
        return (
            <div className="fish-edit">
                <input type="text" name="name" onChange={this.handleChange} value={fish.name} />
                <input type="text" name="price" onChange={this.handleChange} value={fish.price} />
                <select name="status" onChange={this.handleChange} value={fish.status}>
                
                    <option value="available" >Fresh!</option>
                    <option value="unavailable">SoldOut!</option>

                </select>
                <textarea type="text" name="desc" onChange={this.handleChange} value={fish.desc} ></textarea>
                <input type="text" name="image" onChange={this.handleChange} value={fish.image} />

                <button onClick={ () => this.props.deleteFish(fish.name)}>Remove Fish</button>
            </div>
        )
        
    }
}

export default EditFishForm;