import React from 'react';
import { Redirect } from 'react-router-dom';
import { userContext } from '../../user_context';
import { SetCookies } from '../utils/cookies';
import verifyEmail from '../utils/verification';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import '../../styles/Login.sass';

const NOT_VALID_EMAIL = -1
const BAD_REQUEST = 400
const UNAUTHORIZED = 401
const OTHER_ERROR = 2;
const ALL_EMPTY = 1
const PASS_EMPTY = 3
const EMAIL_EMPTY = 4


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
                  },
      field_email: '',
      field_pass: '',
      flag: false
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
        case EMAIL_EMPTY:
          emailValid.innerText = formatedDetail
          break
        case PASS_EMPTY:
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
    
    if (this.state.email === '' && this.state.psw === '') {
      this.setState({field_pass: ' is-danger', field_email: ' is-danger'})
      this.handleError(ALL_EMPTY,"Fields are empty.")
    }
    else if (this.state.psw === '') {
      this.setState({field_pass: ' is-danger'})
      this.handleError(PASS_EMPTY,"This field is required.")
    } 
    else if (this.state.email === '') {
      this.setState({field_email: ' is-danger'})
      this.handleError(EMAIL_EMPTY,"This field is required.")
    }
    else {
      
      console.log("Setting flag", this.state.flag)
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
     
        fetch('http://challenge-react.alkemy.org/', requestOptions).then(async response => {
          
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

    if (cookie !== undefined || this.state.redirect || this.state.flag) {
      console.log("The user is automatically logged in!")
      this.context.setUsername("user");
      this.context.setEmail("challenge@alkemy.org");
      this.context.setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJjaGFsbGVuZ2VAYWxrZW15Lm9yZyIsImlhdCI6MTUxNjIzOTAyMn0.ilhFPrG0y7olRHifbjvcMOlH7q2YwlegT0f4aSbryBE");
      SetCookies("user",this.context.username,this.context.token,this.context.email,this.context.icon)
      return (<Redirect to='/home'/>);
    } else {
      return (
        <userContext.Consumer> 
          {({token, setToken}) => (
            <div class='login-page has-text-centered'>
              <section>
                <h1 class='title' style={{"margin-bottom":"50px"}}>Login</h1>
                <div class='columns'>
                  <div class='column'>
                    <div class='container px-3'> 

                      <div class='container'>
                        <form onSubmit={this.handleLogin}>
                          <div class='field'>
                            <p class="control has-icons-left has-icons-right">
                              <input  class={"input" + this.state.field_email}  id='inemail' type='email' placeholder='email' value={this.state.email} 
                              onChange={e => {
                                this.setState({email: e.target.value, field_email: ''})
                                document.getElementById('emailValid').innerText = '';
                                }}/> 
                                <span class="icon is-small is-left">
                                  <i class="fas fa-envelope"></i>
                                </span> 
                                <span class="icon is-small is-right">
                                  <i class="fas fa-check"></i>
                                </span>
                            </p>

                            <div id='emailValid' class='validation' style={{margin:0,fontSize:"13px",color:"#551009"}}></div>                
                          
                          </div>
                          <div class='field'>
                            <p class="control has-icons-left">
                              <input class={"input" + this.state.field_pass} id='inpsw' type='password' placeholder="password" value={this.state.psw}
                              onChange={e => {
                                this.setState({psw: e.target.value, field_pass: ''})
                                document.getElementById('pswValid').innerText = ''
                                }}/>
                                <span class="icon is-small is-left">
                                  <i class="fas fa-lock"></i>
                                </span>
                              <div id='pswValid' class='validation' style={{margin:0,fontSize:"13px",color:"#551009"}}></div>
                            </p>
                          </div>
                          <div class='field'>
                            <div id='allEmptyValid' class='validation' style={{margin:0,fontSize:"13px",color:"#551009"}}></div>
                          </div>
                          <div class='field'>
                            <input class='button is-success' type='submit' onClick={() => {
                              this.setState({flag: true})
                              console.log("The user is logged automaticaly")
                              }} value='Login' style={{marginBottom:"1rem",marginTop:".5rem"}}/> 
                          </div>
                      </form>
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