import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { FilterableJobList } from "../components/FilterableJobList";
import { Layout } from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <FilterableJobList />
    </Layout>
  );
}

export default Home
