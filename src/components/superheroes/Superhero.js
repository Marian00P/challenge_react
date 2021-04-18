import React, { useState } from 'react'
import '../../styles/Superhero.sass'

export function Superhero(props) {

  var powerstats = Object.keys(props.powerstats)

  return(
    <div class="superhero">
      <h3>{props.hero_name}</h3>
      <div class='hero-image'>
        <img src={props.img["url"]}></img>
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
        <button class="button is-danger is-small">Details</button>
      </div>
    </div>
  )
  
}

/*{
          props.powerstats.map(
            (powerstat) => {
              <li>
                <p>{powerstat}: {powerstat.value}</p>
              </li>
            }
          )
        } */