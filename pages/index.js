import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link"
import { Button } from 'antd';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Game card market place</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Link href="/login">
          <a>
              <Button type="primary" block>Sign in</Button>
          </a>
        </Link>
        or
        <Link href="/register">
          <a>
              <Button type="primary" block>Register</Button>
          </a>
        </Link>

      </main>

    </div>
  )
}
