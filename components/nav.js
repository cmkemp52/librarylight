import React, { Component } from "react";
import Link from "next/link";
import cookies from "next-cookies";
import Router from "next/router";

class Nav extends Component {
  logout(e) {
    e.preventDefault();
    document.cookie = `account=deleted;expires=Thu, 01 Jan 1970 00:00:01 GMT `;
    document.cookie = `token=deleted; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    Router.push("/login");
  }
  render() {
    return (
      <nav>
        <p>library light</p>
        {!this.props.account ? (
          <>
            <Link href="/sign-up">
              <a>Sign up</a>
            </Link>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </>
        ) : (
          <>
            <Link href="/library">
              <a>Library</a>
            </Link>
            <button onClick={this.logout}>Log out</button>
          </>
        )}
        <style jsx>{`
          nav {
            border-bottom: solid black 1px;
            display: flex;
          }
          a {
            padding: 10px;
          }
        `}</style>
      </nav>
    );
  }
}

export default Nav;
