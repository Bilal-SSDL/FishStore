import React from "react";
import PropTypes from "prop-types";

class AddFishForm extends React.Component{

    static propTypes = {
        addFish: PropTypes.func
    };

    nameRef =React.createRef();
    priceRef =React.createRef();
    statusRef =React.createRef();
    descRef =React.createRef();
    imageRef =React.createRef();




    createFish = (event) => {
        // 1. Stop the form from Submitting
        event.preventDefault();
        //console.log(this.statusRef.value.value);

         const fish = {
             name: this.nameRef.value.value,
             price: parseFloat(this.priceRef.value.value),
             status: this.statusRef.value.value,
             desc: this.descRef.value.value,
             image: this.imageRef.value.value,
         }
         this.props.addFish(fish);
         // refresh the form
         event.currentTarget.reset();
    };



    render() {

    return (
            <form className="fish-edit" onSubmit={this.createFish}>
            <input name="name" ref={this.nameRef} type="text" placeholders="Name"  />
            <input name="price" ref={this.priceRef} type="text" placeholders="Price" />
            <select name="status" ref={this.statusRef}>
            <option value="available" >Fresh!</option>
            <option value="unavailable">SoldOut!</option>
            </select>
            <textarea name="desc" ref={this.descRef} type="text" placeholders="Desc" />
            <input name="image" ref={this.imageRef} type="text" placeholders="Image" />
            <button type="submit">+ Add Fish</button>
            </form>

        

    );

  }

}
export default AddFishForm;