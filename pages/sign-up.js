import React, { Component } from "react";
import axios from "axios";
import Head from "next/head";
import Layout from "../components/layout";
import Router from "next/router";

class signup extends Component {
  state = {
    account: "",
    password: "",
    email: ""
  };
  accountChange = event => {
    this.setState({ account: event.target.value });
  };
  emailChange = event => {
    this.setState({ email: event.target.value });
  };
  passwordChange = event => {
    this.setState({ password: event.target.value });
  };
  signupSend = async () => {
    event.preventDefault();
    const response = await axios.post(
      `http://api.librarylight.com/users/sign-up`,
      {
        account: this.state.account,
        password: this.state.password,
        email: this.state.email
      }
    );
    if (response.data === "success") {
      alert("Success! Please log in");
      Router.push("/login");
    } else {
      alert("Account name or email already in use");
    }
  };
  render() {
    return (
      <Layout>
        <Head>
          <title>signup</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <p>please sign up below</p>
        <form onSubmit={this.signupSend}>
          <label>
            Account Name
            <input
              type="text"
              value={this.state.account}
              onChange={this.accountChange}
              name="account"
            />
          </label>
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
          <button type="submit">Sign up</button>
        </form>
      </Layout>
    );
  }
}

export default signup;
