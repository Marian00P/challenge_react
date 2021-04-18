import React from "react";
import { Redirect } from 'react-router-dom';
import logo from '../../logo.png'
import '../../styles/Home.sass'
import Cookies from 'js-cookie';
import { SuperheroesList } from "../superheroes/SuperheroesList";

class Home extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      loged: true,
    }

    this.logout = this.logout.bind(this);
    
  }

  logout() {
    Cookies.remove("user");
    this.setState({loged:false});
  }
  
  render() {
    const cookie = Cookies.getJSON("user");
    console.log(cookie)
    if (cookie === undefined) {
      return (<Redirect to='/'/>);
    } else {
      return(
        <div class='container-home'>
          <nav class="navbar is-transparent black" >
            <div class="navbar-brand" >
              <a class="navbar-item">
                <img src={logo} alt="Superhero: the new app to create a superheroes" width="30" height="35" />
              </a>
              <div class="navbar-burger" data-target="navbarExampleTransparentExample">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <div id="navbarExampleTransparentExample" class="navbar-menu" $>
              <div class="navbar-start">
                <div class="navbar-item has-dropdown is-hoverable">
                  <div class="navbar-dropdown is-boxed">
                  </div>
                </div>
              </div>

              <div class="navbar-end">
                <div class="navbar-item">
                <a class="button is-danger color" onClick={this.logout}>
                  <strong>Logout</strong>
                </a>
                </div>
              </div>
            </div>
          </nav>
          <div class='container superheroes'>
            <SuperheroesList/>
          </div>
        </div>
      )
    }
  }

} 
export {Home};