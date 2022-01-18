import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed'
import styles from '../styles/Home.module.css'
import { getProviders, getSession, useSession } from "next-auth/react";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Twitter</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex max-w-[1500px] mx-auto">
        {/* sidebar */}
        <Sidebar />

        {/* feed */}
        <Feed />
        {/* widgets */}

        {/* modal */}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  )
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  )

  const providers = await getProviders()
  const session = await getSession(context)

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session
    }
  }
  
}
