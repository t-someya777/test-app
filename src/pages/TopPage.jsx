import React from 'react';
import { posts } from "../data/posts"


const handleAt = createdAt => {
  const date = new Date(createdAt)
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  }
}

export default function TopPage() {
  return (
    <>
      <div className='max-w-3xl mx-auto px-8 mt-10'>
        {posts.map(post => (
          <div key={post.id} className='mt-10 p-4 border border-gray-300 border-solid'>
            <div className="flex items-center justify-between">
              <time datetime={post.createdAt.split('T')[0]} className="text-gray-500 text-sm">
                {handleAt(post.createdAt).year}/
                {handleAt(post.createdAt).month}/
                {handleAt(post.createdAt).day}
              </time>
              <p>
                {post.categories.map(category => <span className="ml-1 p-1 text-sm text-blue-600 border border-solid border-blue-600 rounded">{category}</span>)}
              </p>
            </div>
            <h2 className='text-2xl mt-6 font-medium'>{post.title}</h2>
            <p className='line-clamp-2 mt-6'>
              {post.content.split('<br/>').map((content, index) => (
                <React.Fragment key={index}>
                {content}
                <br />
                </React.Fragment>
              ))}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}