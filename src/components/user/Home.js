import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { userContext } from '../../user_context';
import { SetCookies } from '../utils/cookies';
import logo from '../../logo.png'
import '../../styles/Home.sass'
import Cookies from 'js-cookie';
import { Superhero } from "../superheroes/Superhero";

class Home extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      loged: true,
      hero_test: {
        "response":"success","id":"25","name":"Angel Dust",
        "powerstats":{
          "intelligence":"38",
          "strength":"55",
          "speed":"23",
          "durability":"42",
          "power":"17",
          "combat":"30"
        },
        "biography":{
          "full-name":"Christina",
          "alter-egos":"No alter egos found.",
          "aliases":["Angel","Dusty"],
          "place-of-birth":"-",
          "first-appearance":"Morlocks #1",
          "publisher":"Marvel Comics",
          "alignment":"good"},
          "appearance":{
            "gender":"Female",
            "race":"Mutant",
            "height":["5'5","165 cm"],"weight":["126 lb","57 kg"],
            "eye-color":"Yellow","hair-color":"Black"
          },
          "work":{
            "occupation":"-",
            "base":"Chicago, Illinois"
          },"connections":{
            "group-affiliation":"-",
            "relatives":"-"
          },"image":{"url":"https:\/\/www.superherodb.com\/pictures2\/portraits\/10\/100\/10405.jpg"}}
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
    if (cookie == undefined) {
      return (<Redirect to='/'/>);
    } else {
      return(
        <div class='container-home'>
          <nav class="navbar is-transparent black" >
            <div class="navbar-brand" >
              <a class="navbar-item" href="#">
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
            <ul>
              <li>
                <Superhero
                  hero_name={this.state.hero_test.name}
                  img={this.state.hero_test.image}
                  powerstats={this.state.hero_test.powerstats}
                />
              </li>
            </ul>
          </div>
        </div>
      )
    }
  }

} 
export {Home};