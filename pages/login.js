import React, { Component } from "react";
import axios from "axios";
import Head from "next/head";
import Layout from "../components/layout";
import cookies from "next-cookies";
import Router from "next/router";

class Login extends Component {
  state = {
    password: "",
    email: ""
  };
  static async getInitialProps(ctx) {
    return {
      account: cookies(ctx).account || "",
      token: cookies(ctx).token || ""
    };
  }

  emailChange = event => {
    this.setState({ email: event.target.value });
  };
  passwordChange = event => {
    this.setState({ password: event.target.value });
  };
  loginSend = async () => {
    event.preventDefault();
    const response = await axios.post(
      `http://api.librarylight.com/users/login`,
      {
        password: this.state.password,
        email: this.state.email
      }
    );
    if (!response.data.browser_token) {
      alert("Wrong email address or password");
    } else {
      document.cookie = `account=${response.data.account_name}; `;
      document.cookie = `token=${response.data.browser_token}; `;
      alert("Successfully logged in");
      Router.push("/library");
    }
  };
  render() {
    return (
      <Layout>
        <Head>
          <title>login</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <p>please log in below</p>
        <form onSubmit={this.loginSend}>
          <label>
            Email Address
            <input
              type="email"
              value={this.state.email}
              onChange={this.emailChange}
              name="email"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={this.state.password}
              onChange={this.passwordChange}
              name="password"
            />
          </label>
          <button type="submit">login</button>
        </form>
      </Layout>
    );
  }
}

export default Login;
