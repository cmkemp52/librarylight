import React, { Component } from "react";
import axios from "axios";
import Head from "next/head";
import Layout from "../components/layout";
import cookies from "next-cookies";
import Book from "../components/book";

class Library extends Component {
  state = {
    ownedList: [],
    entry: ""
  };
  static async getInitialProps(ctx) {
    return {
      account: cookies(ctx).account || "",
      token: cookies(ctx).token || ""
    };
  }
  componentDidMount() {
    this.getLibrary();
  }
  getLibrary = async () => {
    const account = this.props.account;
    const token = this.props.token;
    const response = await axios.post(
      `http://api.librarylight.com/library/owned/retreive`,
      { account, token }
    );
    this.setState({ ownedList: response.data });
  };
  entryChange = event => {
    this.setState({ entry: event.target.value });
  };
  addBook = async e => {
    e.preventDefault();
    await axios.post(`http://api.librarylight.com/library/owned/add`, {
      account: this.props.account,
      token: this.props.token,
      isbn: this.state.entry
    });
    this.setState({ entry: "" });
    this.getLibrary();
  };
  deleteBook = async ibsn => {
    console.log("here's ibsn: ", ibsn);
    const resp = await axios.post(
      `http://api.librarylight.com/library/owned/remove`,
      {
        account: this.props.account,
        token: this.props.token,
        isbns: [ibsn]
      }
    );
    console.log(resp);
    this.getLibrary();
  };
  render() {
    const books = this.state.ownedList;
    return (
      <Layout account={this.props.account}>
        <Head>
          <title>library</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {this.props.token ? (
          <>
            <h2>Welcome to the library of {this.props.account}</h2>
            <form onSubmit={this.addBook}>
              <label>
                Add book
                <input
                  type="text"
                  value={this.state.entry}
                  onChange={this.entryChange}
                  name="isbn"
                />
                <button type="submit">Add</button>
              </label>
            </form>
            <div id="#bookwrapper">
              {books.map(book => (
                <Book
                  key={book.isbn}
                  book={book}
                  deleteBook={this.deleteBook}
                />
              ))}
            </div>
            <p>end of page</p>
          </>
        ) : (
          <p>please log in to see library</p>
        )}
        <style jsx>{`
          #bookwrapper {
            background: red;
            display: flex;
            flex-direction: column-reverse;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Library;
