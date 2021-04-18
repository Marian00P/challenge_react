import React from 'react';
import { BrowserRouter as Router , Route } from 'react-router-dom';
import { Login } from './components/user/Login';
import { Home } from './components/user/Home';
import { userContext } from './user_context';

class App extends React.Component {

  static contextType = userContext

  setToken = token => {
     this.setState({token});
  }
  
  setUsername = username => {
    this.setState({username});
  }

  setEmail =  email => {
    this.setState({email});
  }

  state = {
    token: '',
    username: '',
    email: '',
    icon: {},
    setToken: this.setToken,
    setUsername: this.setUsername,
    setEmail: this.setEmail,
    setIcon: this.setIcon
  };

  render() {
    return (
      <Router>
        <userContext.Provider value={this.state}>
          <Route exact path='/' component={Login}/>
          <Route exact path='/home' component={Home}/>
        </userContext.Provider>
      </Router>
    );
  }
}
export default App;
