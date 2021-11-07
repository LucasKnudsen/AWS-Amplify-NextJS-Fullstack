import { CircularProgress, Container, Grid } from '@mui/material'
import { API } from 'aws-amplify'
import { useEffect, useState } from 'react'
import { ListPostsQuery, Post } from '../API'
import PostPreview from '../components/PostPreview'

import { listPosts } from '../graphql/queries'

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const response = (await API.graphql({
        query: listPosts,
      })) as { data: ListPostsQuery; error: any[] }

      setPosts(response.data.listPosts.items)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <Container maxWidth='md'>
      {loading ? (
        <Grid
          container
          minHeight={250}
          alignItems='center'
          justifyContent='center'
        >
          <CircularProgress color='warning' />
        </Grid>
      ) : (
        <>
          {posts.map((post) => (
            <PostPreview key={post.id} post={post} />
          ))}
        </>
      )}
    </Container>
  )
}

export default Home
