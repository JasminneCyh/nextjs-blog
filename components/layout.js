import styles from './layout.module.css'
import Head from 'next/head'
import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'

const name='Jasmine'
export const siteTitle='Next.js Sample Website'

export default function Layout({children , home }){
    return(
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico"/>
                <meta
                    name="description"
                    content="Learn how to build a personal website using next.js"
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <header className={styles.header}>
                {
                    home?(
                        <>
                          <img
                            src="/images/flower.jpg"
                            alt={name}
                            className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
                          />  
                          <h1 className={utilStyles.heading2X1}>{name}</h1>
                        </>
                    ):(
                        <>
                            <Link href="/">
                                <a>
                                    <img
                                        src="/images/flower.jpg"
                                        className={`${styles.headerImage}${utilStyles.borderCircle}`}
                                        alt={name}
                                    />
                                </a>
                            </Link>
                            <h2>
                                <Link href="/">
                                    <a className={utilStyles.colorInherit}>{name}</a>
                                </Link>    
                            </h2>                           
                        </>
                    )
                }
            </header>
            <main>
                {children}
            </main>
            {
                !home&&(
                    <div className={styles.backToHome}>
                        <Link href="/">
                            <a>Back to home</a>
                        </Link>
                    </div>                  
                )
            }
        </div>
    )
} 