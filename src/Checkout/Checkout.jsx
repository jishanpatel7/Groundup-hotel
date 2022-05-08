import React from 'react'
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import StarIcon from "@material-ui/icons/Star";
import  Data  from '../Data/Data';
import Payment from './Payment';
const Checkout = () => {

    const carts = Data.Hotels;
    const total = carts.reduce((total, cart) => {
        return total + cart.price;
    },0)
    //console.log(total);
  
  return (
    <>
       {
              carts.map((cart) => {
                    return (
                        <div className='searchResult' key={cart.id}>
                        <img src={cart.img} alt="" />
                        <FavoriteBorderIcon className="searchResult__heart" />
            
                        <div className='searchResult__info'>
                            <div className="searchResult__infoTop">
                                <p>{cart.location}</p>
                                <h3>{cart.title}</h3>
                                <p>_____</p>
                                <p>{cart.description}</p>
                            </div>
            
                            <div className="searchResult__infoBottom">
                                <div className="searchResult__stars">
                                    <StarIcon className="searchResult__star" />
                                    <p>
                                        <strong>{cart.star}</strong>
                                    </p>
                                </div>
                                <div className='searchResults__price'>
                                    <h2>${cart.price}</h2>
                                    <p>per night</p>
                                    <p>${total}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
              })
       }
       <Payment />
    </>
  )
}

export default Checkout