import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const updateCatalog = async () => {
  const deployment = await fetch('https://api.vercel.com/v1/integrations/deploy/prj_sCH2rveCPFwEUAHm7VQYYasEVVhg/rfrEdSIhRf', {
    method: 'POST',
  })
  .then(res => res.json());

  console.log('deployment info : ', deployment);
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Nouveaux Jouets de Clichy
        </h1>

        <Link href='/products/bois'><a className={styles.catalog}>Les Jouets en bois</a></Link>

        {/* <button className={styles.deploy} onClick={updateCatalog}>Mise à jour catalogue</button> */}

        <Link href='/admin/newProduct'>
          <a className={styles.addProduct}>Ajouter Produit</a>
        </Link> 

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
