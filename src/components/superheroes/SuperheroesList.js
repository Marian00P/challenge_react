import { render } from '@testing-library/react'
import React, { Component, useContext, useEffect } from 'react'
import '../../styles/Superhero.sass'
import { userContext } from '../../user_context'
import { Superhero } from './Superhero'
import Hero from '../utils/hero_data_type'
import { SuperheroFinder } from './SuperheroFinder'

class SuperheroesList extends Component {

  static contextType = userContext;

  constructor(props) {
    super(props);

    this.state = {
      heroes_list: [Hero],
    }
    this.get_hero_data = this.get_hero_data.bind(this)
  }

  componentDidMount(){
    this.context.team_members.map(
      hero => {
        this.get_hero_data(hero)
      })
  }

  get_hero_data(id) {
    fetch(`https://www.superheroapi.com/api.php/3973112209448483/${id}`,{
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET"
    }).then(async response => {
          
      // token is an object {access_token, type}
      const data = await response.json();
      if (response.ok){
        
        this.setState({hero_data: this.state.heroes_list.push(data)})
      } else {
        console.log(response.status, data.detail)
      }
      
    }).catch(error => {
      console.log(error)
    })
  }


  render() {

    return(
      <>
      <div class='container h-l'>
        <ul class='heroes-list block'>
          { 
            this.state.heroes_list.filter(value => value.id !== "-1").map(
              hero => (
                <li class='hero-container'>
                  <Superhero
                    hero_name={hero.name}
                    img={hero.image}
                    powerstats={hero.powerstats}
                  />
                </li>
              )
            )
          }
        </ul>
      </div>
      </>
    )
  }
  
} export {SuperheroesList}

/*
this.state.heroes_list.map(
            hero => (
              <li class='hero-container'>
                <Superhero
                  hero_name={hero.name}
                  img={hero.image}
                  powerstats={hero.powerstats}
                />
              </li>
            )
          ) */