import React from "react";
import { Link, Redirect } from 'react-router-dom';
import { userContext } from '../../user_context';
import { SetCookies } from '../utils/cookies';
import Cookies from 'js-cookie';

class Home extends React.Component {

  render() {
    return(
      <div>
        Basis
      </div>
    )
  }

} 
export {Home};