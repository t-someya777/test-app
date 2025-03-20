import { useState, useEffect } from "react" 
  
  export default function useGetData(fetchUrl, page) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const url = fetchUrl

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(url)

          if(!response.ok) {
            const massage = 'データが見つかりません'
            console.log(massage)
            throw new Error(massage)
          } 

          const data = await response.json()
          const posts = page === 'top' ? data.posts : data.post
          // const posts = data.object
          return posts
        } catch (error) {
          console.error('エラーが発生しました。', error.message)
          return null
        }
      }
        fetchData().then(posts => {
          setData(posts) 
          setLoading(true)
        })
    }, [])

    return {
      data,
      loading,
    }
  }
