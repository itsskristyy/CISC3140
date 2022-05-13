import "../nav.css"
import React from "react"
import { Link } from 'react-router-dom'
import car from "../images/beetle_car.png";


export default function Navbar() {
    return (

            <nav>
            <img src={car} alt="car" className="homeImg"/>
                <Link to="/" style = {styles.nav}>Home</Link>
                <Link to="/cars/" style = {styles.nav}>Cars</Link>
                <Link to="/cars/update/owner" style = {styles.nav}>Update Info</Link>
                <Link to = "/cars/new/" style = {styles.nav} > Add </Link>
                <Link to = "/cars/new" style = {styles.nav} > New </Link>
            </nav>

    )
}

const styles = {
  nav:{
    fontFamily:"sans-serif",
    color: 'black',
    fontSize: "17px",
    padding: "10px",
    display: "inline-block",
    margin: "10px",







  }

}
