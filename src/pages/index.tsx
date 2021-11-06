import { Button, Container, Typography } from '@mui/material'
import { Auth, API } from 'aws-amplify'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { ListPostsQuery, Post } from '../API'
import PostPreview from '../components/PostPreview'

import { listPosts } from '../graphql/queries'
import { userState } from '../recoil/atoms'

const Home = () => {
  const user = useRecoilValue(userState)
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = (await API.graphql({
        query: listPosts,
      })) as { data: ListPostsQuery; error: any[] }

      setPosts(response.data.listPosts.items)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSignOut = async () => {
    try {
      await Auth.signOut()
      console.log('Success')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container maxWidth='md'>
      <Link href='/login'>
        <a>
          <Typography display='inline-block' variant='h1'>
            Hello {user.username || 'World'}
          </Typography>
        </a>
      </Link>

      {user.username && (
        <Button variant='contained' onClick={handleSignOut}>
          Sign out
        </Button>
      )}

      {posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </Container>
  )
}

export default Home
