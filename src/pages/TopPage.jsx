import React from 'react';
import { Link } from 'react-router-dom';
import { handleAt } from '../functions/handleDate';
import useGetData  from '../hooks/useGetData';

export default function TopPage() {
  
  const url = 'https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts'
  const {data:posts, loading} = useGetData(url, 'top')

  if(!loading) {
    return <div>記事読み込み中...</div>
  } else if(posts.length === 0) {
    return <div>記事が見つかりません</div>
  }

  return (
    <>
      <div className='max-w-3xl mx-auto px-8 mt-10'>
        {posts.map(post => (
          <Link key={post.id} to={`/posts/${post.id}`} className='block mt-10 p-4 border border-gray-300 border-solid'>
            <div className="flex items-center justify-between">
              <time dateTime={post.createdAt.split('T')[0]} className="text-gray-500 text-sm">
                {handleAt(post.createdAt)}
              </time>
              <p>
                {post.categories.map(category => <span key={category} className="ml-1 p-1 text-sm text-blue-600 border border-solid border-blue-600 rounded">{category}</span>)}
              </p>
            </div>
            <h2 className='text-black text-2xl mt-6 font-medium'>{post.title}</h2>
            <p className='text-black line-clamp-2 mt-6' dangerouslySetInnerHTML={{ __html: post.content}} />
          </Link>
        ))}
      </div>
    </>
  )
}