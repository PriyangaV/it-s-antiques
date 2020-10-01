import React, { useState, useContext } from 'react';
import { UserContext } from '../context/user';

// strapi function
import loginUser from '../strapi/loginUser';
import registerUser from '../strapi/registerUser';

// handle user
import { useHistory } from 'react-router-dom';

const Login = () => {
  const { userLogin, alert, showAlert } = useContext(UserContext);
  const history = useHistory();
  // setup user context

  // state values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('default');
  const [isMember, setIsMember] = useState(true);

  let isEmpty = !email || !password || !username || alert.show;

  const toggleMember = () => {
    setIsMember((prevMember) => {
      let isMember = !prevMember;
      isMember ? setUsername('default') : setUsername('');
      return isMember;
    });
  };

  const handleSubmit = async (e) => {
    // alert
    showAlert({
      msg: 'accessing user data. please wait...',
    });
    e.preventDefault();
    let response;
    if (isMember) {
      response = await loginUser({ email, password });
    } else {
      response = await registerUser({ email, password, username });
    }
    if (response) {
      const {
        data: {
          jwt: token,
          user: { username },
        },
      } = response;

      const newUser = { token, username };
      userLogin(newUser);

      // alert
      showAlert({
        msg: `you are logged in: ${username}. shop away my friend`,
      });
      // navigate page
      history.push('/products');
    } else {
      // alert
      showAlert({
        msg: 'there was an error. please try again...',
        type: 'danger',
      });
    }
  };

  return (
    <section className="section form">
      <h2 className="section-title">{isMember ? 'sign in' : 'register'}</h2>
      <form className="login-form">
        {/* single input email */}
        <div className="form-control">
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* end of single input email */}
        {/* single input password */}
        <div className="form-control">
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* end of single input password */}
        {/* single input username */}
        {!isMember && (
          <div className="form-control">
            <label htmlFor="username">username</label>
            <input
              type="username"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}
        {/* end of single input username */}
        {/* submit button and error message */}
        {!isEmpty && (
          <button
            type="submit"
            className="btn btn-block btn-primary"
            onClick={handleSubmit}
          >
            submit
          </button>
        )}
        {/* register link */}
        <p className="register-link">
          {isMember ? 'need to register' : 'already a member'}
          <button type="button" onClick={toggleMember}>
            click here
          </button>
        </p>
      </form>
    </section>
  );
};

export default Login;
