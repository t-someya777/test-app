import { useParams } from "react-router-dom"
import { posts } from "../../data/posts"
import { handleAt } from "../../functions/handleDate"

export default function Post() {

  const { id } = useParams()
  const post = posts.find(post => post.id === Number(id))

  if (!post) return <div>記事が見つかりませんでした</div>

  return (
    <div className='max-w-3xl mx-auto px-8 pt-10'>
      <div>
        <img src={post.thumbnailUrl} alt="" />
      </div>
      <div className="flex items-center justify-between pt-6 px-3">
        <time className="text-gray-500 text-sm" datetime={post.createdAt.split('T')[0]}>{handleAt(post.createdAt)}</time>
        <div>
          {post.categories.map(category => (
            <span className="ml-1 p-2 border rounded text-blue-600 text-sm" key={category}>{category}</span>
          ))}
        </div>
      </div>
      <h1 className="pt-8 text-3xl">{post.title}</h1>
      <p className="pt-8" dangerouslySetInnerHTML={{__html: post.content}} />
    </div>
  )
}