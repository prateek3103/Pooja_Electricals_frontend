import React from "react";
import "../../styles/footer.css"
import { Link } from "react-router-dom";
const Footer = () => {
  return ( 
    <div className="panel1"> 
        <ul>
           <p className="head">Online Shopping</p>
           <a>Batter</a>
           <a>Inverter</a>     
           <a>Solar Panel</a>
           <a>Stabilizer</a>
           <a>Trolly</a>
           <a>R.O.</a>
           <a>Gift Cards</a>
           <p className="head">Useful Links</p>
           <a>Blogs</a>
           <a>Carreers</a>
           <a>Site Map</a>
           <a>Corporate Information</a>
           <a>Whitehat</a>    
           <a>Cleartrip</a>
        </ul>
        <ul>
            <p className="head">Customers Policies</p>
            <a>Contact Us</a>
            <a>FAQ</a>
            <a>T&C</a>
            <a>Term Of Use</a>
            <a>Track Orders</a>
            <a>Shipping</a> 
            <a>Cancellation</a>
            <a>Returns</a>
            <a>Privacy policy</a>
            <a>Grievance Officer</a> 
        </ul>   
      <ul>   
        <p className="t">
          <img src="https://constant.myntassets.com/web/assets/img/6c3306ca-1efa-4a27-8769-3b69d16948741574602902452-original.png" style={{width: 48, height: 49}}  /> 100% <b>ORIGINAL</b > guarantee for all products
          </p>        
        <p className="t">
      <img src="https://assets.myntassets.com/assets/images/retaillabs/2023/5/22/becb1b16-86cc-4e78-bdc7-7801c17947831684737106127-Return-Window-image.png" style={{width: 48, height: 49}} />
Return within 14 days of receiving your order</p>     
      </ul>
      <ul>  
            <p className="head">Registered Address</p>
            <a>Shop No. 6,<br/>Ken Market, Bundu Katra,<br/>Gwalior Road,<br/>Agra - 282001, India</a>
            <a>Mobile No. :- <b>7453877316</b></a>
        </ul>

 
    </div>

    
  );
};

export default Footer;
 