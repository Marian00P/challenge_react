import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { userContext } from '../../user_context';
import { SetCookies } from '../utils/cookies';
import verifyEmail from '../utils/verification';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import '../../styles/Login.sass';

const NOT_VALID_EMAIL = -1
const BAD_REQUEST = 400
const UNAUTHORIZED = 401
const ALL_EMPTY = 1
const OTHER_ERROR = 2;


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      psw: '',
      redirect: false,
      auth: false,
      validations: { 
                    emailValid: '', 
                    pswValid: ''
                  }
    }
   
    this.handleLogin = this.handleLogin.bind(this);
    this.tokenDecode = this.tokenDecode.bind(this);
    this.handleError = this.handleError.bind(this);
  }
  
  static contextType = userContext;


  /* Decode the token and fill the user context */
  tokenDecode() {

    console.log("Token a decodificar:", this.context.token)
    const uData = jwt_decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJjaGFsbGVuZ2VAYWxrZW15Lm9yZyIsImlhdCI6MTUxNjIzOTAyMn0.ilhFPrG0y7olRHifbjvcMOlH7q2YwlegT0f4aSbryBE");
    
    this.context.setUsername(uData.username);
    this.context.setEmail(uData.email);
   
    SetCookies("user",this.context.username,this.context.token,this.context.email,this.context.icon)
    
    this.setState({redirect: true});
  }

  /* Simple error handler function, shows messages in the divs that are below the fields */
  handleError(status, detail){
      let emailValid = document.getElementById('emailValid')
      let pswValid = document.getElementById('pswValid')
      let allEmpty = document.getElementById('allEmptyValid')
      let formatedDetail = "* " + detail
      // Restart messages
      var msgElements = document.getElementsByClassName("validation")
      Array.from(msgElements).forEach(element => {
          element.innerText = ""
      });
      switch (status){
        case OTHER_ERROR:
          allEmpty.innerText = formatedDetail
          break
        case NOT_VALID_EMAIL:
          emailValid.innerText = formatedDetail
          break
        case BAD_REQUEST:
          emailValid.innerText = formatedDetail
          break
        case UNAUTHORIZED:
          pswValid.innerText = formatedDetail
          break
        case ALL_EMPTY:
          allEmpty.innerText = formatedDetail
          break
        default:
          Array.from(msgElements).forEach(element => {
            element.innerText = ""
          });
          break
          
      }
      Array.from(msgElements).forEach(element => {
        element.style.display = "block"
      });
  }


  handleLogin(e) {
    // Message dissapear 
    var msgElements = document.getElementsByClassName("validation")
    Array.from(msgElements).forEach(element => {
        element.style.display = 'none'
    });

    e.preventDefault();
    
    const email = this.state.email;
    
    if(this.state.psw === '' || this.state.username === '') {
      this.handleError(ALL_EMPTY,"There are empty fields")
      document.getElementById('inemail').value="";
      document.getElementById('inpsw').value="";
    } else {

      if (verifyEmail(email)) {
        
        const psw = this.state.psw
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")
        myHeaders.append('Access-Control-Allow-Origin','*')

        var raw = JSON.stringify({"email":`${email}`,"password":`${psw}`});

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        const body = {
          email: `${email}`,
          password: `${psw}`
        }

     
        axios.post('http://challenge-react.alkemy.org/', body).then(async response => {
          
          // token is an object {access_token, type}
          const data = await response.json();
          if (response.ok){
            const token = data.access_token;
            this.context.setToken(token);

            // Now we decode the token to complete the user context
            this.tokenDecode();
          } else {
          
            this.handleError(response.status, data.detail)
          }
          
        }).catch(error => {
          this.handleError(OTHER_ERROR, error.message)
        })
      }else{
        this.handleError(NOT_VALID_EMAIL, 'The input does not have a valid e-mail format')
      }
    }
  }

  render() {
    const cookie = Cookies.getJSON("user");

    /* Since the login api does not have 'CORS' enabled, I set these values forcibly. */

    if (cookie !== undefined || this.state.redirect || true) {
      this.context.setUsername("Alkemy_user");
      this.context.setEmail("challenge@alkemy.org");
      this.context.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJjaGFsbGVuZ2VAYWxrZW15Lm9yZyIsImlhdCI6MTUxNjIzOTAyMn0.ilhFPrG0y7olRHifbjvcMOlH7q2YwlegT0f4aSbryBE");
      return (<Redirect to='/home'/>);
    } else {
      return (
        <userContext.Consumer> 
          {({token, setToken}) => (
            <div class='login-page has-text-centered'>
              <section>
                <div class='columns'>
                  <div class='column'>
                    <div class='container px-3'> 

                      <div class='container'>
                        <form onSubmit={this.handleLogin}>
                          <div class='field'>
                            <label class='login-label has-text-black-bis is-large'> E-mail: </label>
                            <div class='control'>
                              <input  class='login-input is-rounded is-large' id='inemail' type='email' value={this.state.email} 
                              onChange={e => this.setState({email: e.target.value})}/>   
                              <div id='emailValid' class='validation'></div>                
                            </div>
                          </div>
                          <div class='field'>
                            <label class='login-label has-text-black-bis is-large'> Password: </label>
                            <div class='control'>
                              <input class='login-input is-rounded is-large' id='inpsw' type='password' value={this.state.psw}
                               onChange={e => this.setState({psw: e.target.value})}/>
                              <div id='pswValid' class='validation'></div>
                            </div>
                          </div>
                          <div class='field'>
                            <div id='allEmptyValid' class='validation'></div>
                          </div>
                          <div class='field'>
                            <input class='login-button is-medium is-fullwidht is-rounded mb-2 log-btn-margin' type='submit' value='Login'/> 
                          </div>
                      </form>
                    </div>

                  </div>
                  <div class='column'>
                    <div class='container py-6'>
                      <p class='login-label is-large is-size-5'>
                        Don't have an account yet? 
                        <Link id='toReg' class='login-button is-rounded mx-2' 
                          to={`/registerPage`}> Sign up here </Link> 
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              </section>
            </div>
           
          )} 
        </userContext.Consumer>
      )
  }
}
} export {Login}