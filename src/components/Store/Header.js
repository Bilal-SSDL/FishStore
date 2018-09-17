import React from 'react';
import PropTypes from "prop-types";

// stateless component
const Header= ({tagline}) =>  (
        <header className='top'>

             <h1>
                 Catch
                 <span className='ofthe'>
                 <span className='of'>Of</span>
                 <span className='the'>The</span>
                 </span>
                 Day
             </h1>
             <h3 className='tagline'>
             {/* <span> Fresh SEAFOOD MARKET </span> */}
             <span> {tagline} </span>
             </h3>   
            </header>
    );

    Header.propTypes = {
        tagline: PropTypes.string.isRequired
    }





// class Header extends React.Component{

//     render() {
//         return (
//             <header className='top'>

//              <h1>
//                  Catch
//                  <span className='ofthe'>
//                  <span className='of'>Of</span>
//                  <span className='the'>The</span>
//                  </span>
//                  Day
//              </h1>
//              <h3 className='tagline'>
//              {/* <span> Fresh SEAFOOD MARKET </span> */}
//              <span> {this.props.tagline} </span>
//              </h3>   
//             </header>
//         )
//     }
// }

export default Header;