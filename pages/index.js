import React from "react";
import Head from "next/head";
import Layout from "../components/layout";

const Home = () => (
  <Layout>
    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <p>Welcome to Library Light!</p>
  </Layout>
);

export default Home;
