import { useEffect, useState } from 'react'
import axios from 'axios'
import { backend_Url } from '../config'

interface Content {
  _id: string
  title: string
  link: string
  type: string
  tags: string[]
  userId: string
}

const useContent = () => {
  const [contents, setContents] = useState<Content[]>([])

  const refresh = async () => {
    const res = await axios.get(`${backend_Url}/api/v1/content`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })

    setContents(res.data.content)
  }

  useEffect(() => {
    refresh()
  }, [])

  return { contents, refresh }
}

export default useContent