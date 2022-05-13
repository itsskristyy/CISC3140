import React from "react";
import {Link} from "react-router-dom";

function Home() {
    return (
        <div>
            <h1 style = {styles.home}>  Welcome! </h1>
            <h2 style = {styles.home}> Click an Option Above To Get Started!</h2>

        </div>
    )
}

export default Home;

const styles= {
  home:{
    textAlign: 'center',
      fontSize: 28,
      padding: 50,
      top: 100, left: 100,
      right: 100,
      justifyContent: 'center',




}


}
