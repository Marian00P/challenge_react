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
      this.findHandle = this.findHandle.bind(this)
      this.handleModal = this.handleModal.bind(this)
    }

  handleModal() {
    var modal = document.getElementById("search_hero")
    if (modal.getAttribute("class")==='modal') {
      modal.setAttribute("class", "modal is-active")
    } else {
      modal.setAttribute("class", "modal")
    }
  }

  findHandle(){
      this.setState({heroes: [Hero_encountered]})
      this.findHero(this.state.hero_name)
  }

  findHero(name) {
    this.setState({handleErrors: ''})

    fetch(`https://www.superheroapi.com/api.php/3973112209448483/search/${name}`,{
          headers: {
          "Content-Type": "application/json"
          },
          method: "GET"
      }).then(async response => {
              
          // token is an object {access_token, type}
          const data = await response.json();
          if (data.response === 'success'){
            data.results.map(
              hero => {
                this.setState({heroes_data: this.state.heroes.push(hero)})
              }
            )
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
                      }}/>
                  </div>
                </div>
                  {
                    (this.state.handleErrors !== '') ?
                        <p class='help is-danger'>{this.state.handleErrors}</p>
                    :
                    <></>
                  }
                  <div class="field">
                  {
                    this.state.heroes.filter(value => value.id !== "-1").map(
                      hero => (
                          // console.log(hero.image)
                        <div class="superhero is-desk">
                          <h2>{hero.name}</h2>
                          <img width={100} height={100} src={hero.image.url}/>
                          <input class='button is-success' value="Add to team"/>
                        </div>
                      )
                    )
                  }
                  </div>
              </section>
              <footer class="modal-card-foot">
                <button class="button is-success" onClick={this.findHandle}>Search</button>
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