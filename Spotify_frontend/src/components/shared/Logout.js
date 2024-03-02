// import React, { Component } from 'react';
// import { withCookies, Cookies } from 'react-cookie';
// import { instanceOf } from 'prop-types';


// class Logout extends Component {
//     static propTypes = {
//         cookies: instanceOf(Cookies).isRequired
//     };

//     logout = (e) => {
//         const { cookies } = this.props;
//         cookies.remove('token');
//         window.location.href = '/home';
//         // return false;
//     }
// }
// export default withCookies(Logout)