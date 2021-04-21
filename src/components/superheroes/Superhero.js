import React from 'react'
import '../../styles/Superhero.css'

export function Superhero(props) {

  var powerstats = Object.keys(props.powerstats)

  return(
    <div class="superhero">
      <h3>{props.hero_name}</h3>
      <div class='container-image'>
        <img class="hero-image" src={props.img["url"]} alt={"Superhero " + props.hero_name} style={{width:"168px",height:"224px"}}/>
      </div>
      <ul class='hero-powerstats'>
      {
        powerstats.map(p => 
          <li>{p.charAt(0).toUpperCase() + p.slice(1)}: {props.powerstats[p]}</li>
        )
      }
      </ul>
      <div class="buttons">
        <button class="button is-danger is-small">Delete</button>
        <button class="button is-success is-small">Details</button>
      </div>
    </div>
  )
  
}