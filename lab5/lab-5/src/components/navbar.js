import "../nav.css"
import React from "react"
import { Link } from 'react-router-dom'
import car from "../images/beetle_car.png";

export default function Navbar() {
    return (
        <div className="container">
            <nav>
            <img src={car} alt="car" className="homeImg"/>
                <Link to="/" style = {styles.nav}>Home</Link>
                <Link to="/" style = {styles.nav}>Cars</Link>
                <Link to="/" style = {styles.nav}>Owners</Link>
                <Link to = "/" style = {styles.nav} > Extra </Link>
            </nav>
        </div>
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
