import Layout from '../../components/layout'
import {getAllPostsId, getPostData} from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export default function post({postData}){
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingX1}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                     <Date dateString={postData.date}/> 
                </div>
            </article>
           
            <div dangerouslySetInnerHTML={{__html:postData.contentHtml}}/>       
        </Layout>)
}

export async function getStaticPaths(){
    const paths=getAllPostsId();
    return{
        paths,
        fallback:false
    }
}

export async function getStaticProps({params}){
    const postData= await getPostData(params.id);

    return{
        props:{
            postData
        }
    }
}

