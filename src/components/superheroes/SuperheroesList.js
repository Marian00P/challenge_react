import React, { useContext, useEffect } from 'react'
import '../../styles/Superhero.sass'
import { userContext } from '../../user_context'
import { Superhero } from './Superhero'

export function SuperheroesList(props) {

  const context = useContext(userContext)

  var heroes_list =  [{
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
      },"image":{"url":"https:\/\/www.superherodb.com\/pictures2\/portraits\/10\/100\/10405.jpg"}
    },
    {"response":"success","id":"16","name":"Alex Woolsly","powerstats":{"intelligence":"null","strength":"37","speed":"null","durability":"null","power":"null","combat":"null"},"biography":{"full-name":"Alex Woolsly","alter-egos":"No alter egos found.","aliases":["-"],"place-of-birth":"-","first-appearance":"Heroes S02E16 - Building 26","publisher":"NBC - Heroes","alignment":"good"},"appearance":{"gender":"Male","race":"null","height":["-","0 cm"],"weight":["- lb","0 kg"],"eye-color":"-","hair-color":"-"},"work":{"occupation":"Employee at Sam's Comics","base":"Costa Verde, CA"},"connections":{"group-affiliation":"-","relatives":"Mr. Woolsly, Mrs. Woolsly, sister"},"image":{"url":"https:\/\/www.superherodb.com\/pictures2\/portraits\/10\/100\/1309.jpg"}}
    ]

  var members_id = []

  useEffect(() => {
    heroes_list.map(
      (hero) => {
        members_id.push(hero.id)
      }
    )
  },  [context])

  return(
    <ul class='heroes-list'>
      {
        heroes_list.map(
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
  )
  
}