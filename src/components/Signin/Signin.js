import React from "react";
import "./Signin.css";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      isEmailValid: false,
      isPswdValid: false,
      hasAttemptedLogin: false
    };
  }

  onEmailChange = (event) => {
    console.log( event.target.value)
    this.setState({ signInEmail: event.target.value });
    if (!this.state.signInEmail) {
      this.setState({ isEmailValid: true });
    } else if (this.state.signInEmail === "") {
      this.setState({ isEmailValid: false });
    }
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
    if (!this.state.signInPassword) {
      this.setState({ isPswdValid: true });
    } else if (this.state.signInPassword === "") {
      this.setState({ isPswdValid: false });
    }
  };

  onsubmitSignIn = () => {
    console.log("signin");
    fetch("https://frozen-inlet-49147.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        } else {
          alert('Failed to login')
          this.setState({hasAttemptedLogin: true});
        }
        console.log(user);
      });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={this.onEmailChange}
                  className={
                    (!this.state.isEmailValid && this.state.hasAttemptedLogin)
                      ? "pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100  input-error"
                      : "pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  }
                  type="email"
                  name="email-address"
                  id="email-address"
                  required
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.onPasswordChange}
                  className={
                    (!this.state.isPswdValid && this.state.hasAttemptedLogin)
                      ? "b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 input-error"
                      : "b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 "
                  }
                  type="password"
                  name="password"
                  id="password"
                  required
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onsubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange("register")}
                className="f6 link dim black db pointer"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
