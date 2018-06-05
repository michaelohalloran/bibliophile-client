import React from 'react';
// import React, { Component } from 'react';
// import axios from 'axios';
import {loginUser} from '../../actions/authActions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';


const LoginForm = ({dispatch}) => {

  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={event=> {
            event.preventDefault();
            const userData = {
            email: event.target.email.value.trim(),
            password: event.target.password.value.trim()
            }
            dispatch(loginUser(userData));
        }}>

            <input 
                type="text" 
                name="email" 
                placeholder="Email"
            />
            <br />
            <input 
                type="password" 
                name="password" 
                placeholder="Password"
            />
            <br/>
            <button>Login</button>
        </form>
    </div>
  )
}


// class LoginForm extends Component {

//     constructor() {
//         super();
//         this.state = {
//             email: '',
//             password: ''
//         }
//         this.handleLogin = this.handleLogin.bind(this);
//     }

//     onChange(e) {
//         e.preventDefault();
//         this.setState({
//             ...state,
//             email: , 
//             password
//         });
//     }

//     handleLogin = (e)=> {
//         e.preventDefault();
//         let email = e.target.email.value.trim();
//         let password = e.target.password.value.trim();
//         // console.log(e.target.email.value);

//         const userData = {email, password};
//         this.props.loginUser(userData);
//         //clear inputs
//         e.target.email.value = '';
//         e.target.password.value = '';
//     };

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleLogin}>
//             <input 
//                 type="text" 
//                 name="email" 
//                 placeholder="Email"
//                 // value={this.onChange}
//             />
//             <br />
//             <input 
//                 type="password" 
//                 name="password" 
//                 placeholder="Password"
//                 // value={this.onChange}
//             />
//             <br/>
//             <button>Login</button>
//         </form>
//       </div>
//     )
//   }
// }

// const mapStateToProps = state=> {
//     auth: state.auth
// }
// export default connect(mapStateToProps, {loginUser})(LoginForm);
export default connect()(withRouter(LoginForm));
