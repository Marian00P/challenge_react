import React from 'react'
import Hero, { Hero_encountered } from '../utils/hero_data_type';
import { Superhero } from './Superhero';

class SuperheroFinder extends React.Component {

  constructor(props) {
      super(props);
  
      this.state = {
        heroes: [Hero_encountered],
        handleErrors: '',
        hero_name: '',
        find_hero: ''
      }
      this.findHero = this.findHero.bind(this)
      this.handleModal = this.handleModal.bind(this)
    }

  handleModal() {
    var modal = document.getElementById("search_hero")
    console.log(modal)
    if (modal.getAttribute("class")==='modal') {
      modal.setAttribute("class", "modal is-active")
    } else {
      console.log("Open modal")
      modal.setAttribute("class", "modal")
    }
  }

  findHero(name) {
    fetch(`https://www.superheroapi.com/api.php/3973112209448483/search/${name}`,{
          headers: {
          "Content-Type": "application/json"
          },
          method: "GET"
      }).then(async response => {
              
          // token is an object {access_token, type}
          const data = await response.json();
          console.log(data)
          if (data.response === 'success'){
            var heroes_encountered = []
            data.results.map(
              hero => {
                console.log("Insertando ",hero)
                this.setState({heroes_data: this.state.heroes.push(hero)})
              }
            )
            console.log(this.state.heroes)
          } else {
            const error = `Superhero ${this.state.find_hero} does not exist :(`
            this.setState({handleErrors: error})
          }
          
      }).catch(error => {
        console.log(error)
      })
  }

  render() {
    return(
      <>
        <div class='container-modal'>
          <div class="modal" id="search_hero">
            <div class="modal-background"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">Find your SuperHero</p>
                <button class="delete" aria-label="close" onClick={this.handleModal}></button>
              </header>
              <section class="modal-card-body">
              <div class="field">
                <label class="label">Name of the superhero</label>
                <div class="control">
                  <input class="input" type="text" placeholder="e.g. Batman" onChange={e => {
                    this.setState({handleErrors: ''})
                    this.setState({hero_name: e.target.value})
                    console.log(this.state.hero_name)
                    }}/>
                </div>
              </div>
                {
                  (this.state.handleErrors !== '') ?
                      <p class='help is-danger'>{this.state.handleErrors}</p>
                  :
                  <></>
                }
                <ul>
                  {
                    this.state.heroes.map(
                      hero => {
                        <li class='hero-container'>
                          <Superhero
                            hero_name={hero.name}
                            img={hero.image}
                            powerstats={hero.powerstats}
                          />
                        </li>
                      }
                    )
                  }
                </ul>
              </section>
              <footer class="modal-card-foot">
                <button class="button is-success" onClick={() => {
                  this.setState({find_hero: this.state.hero_name})
                  this.findHero(this.state.find_hero)
                  }}>Search</button>
              </footer>
            </div>
          </div>
        </div>
        <div class="container results-finder">
      </div>
    </>
    )
  }
} export {SuperheroFinder}