import Head from 'next/head';
import React from 'react';
import { CompletedChallenges } from '../components/CompletedChallenge';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>
        
        <ExperienceBar />

        <section>
          <div>
            <Profile />
            <CompletedChallenges />
          </div>
          <div>
          </div>
        </section>
      </div>
    </>
  )
}
