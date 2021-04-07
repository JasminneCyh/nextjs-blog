import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postDirectory = path.join(process.cwd(),'posts');

export function getSortedPostsData(){
    const fileNames = fs.readdirSync(postDirectory);
    const allPostsData = fileNames.map(fileName=>{
        //获取文件名，用''代替'.md'
        const id = fileName.replace(/\.md$/,'');
        const fullPath = path.join(postDirectory,fileName);
        const fileContents = fs.readFileSync(fullPath,'utf-8');

        //用gray-matter解析the post metadata section
        const matterResult = matter(fileContents);
        return{
            id,
            ...matterResult.data
        }
    })

    return allPostsData.sort((a,b)=>{
        if(a.date<b.date){
            return 1;
        }else{
            return -1;
        }
    })
}

export function getAllPostsId(){
    const fileNames = fs.readdirSync(postDirectory);

    return fileNames.map(fileName=>{
        return {
            params:{
                id:fileName.replace(/\.md$/,'')
            }
        }
    })
}

export async function getPostData(id){
    const fullPath = path.join(postDirectory,`${id}.md`);
    const fileContents = fs.readFileSync(fullPath,'utf-8');

    const matterResult = matter(fileContents);

    const processedContent = await remark().use(html).process(matterResult.content);

    const contentHtml = processedContent.toString();

    return{
        id,
        contentHtml,
        ...matterResult.data
    }
}