import API from '@aws-amplify/api'
import { Container } from '@mui/material'
import { GetStaticProps, GetStaticPaths } from 'next'

import { GetPostQuery, ListPostsQuery, Post } from '../../API'
import Comment from '../../components/Comment'
import PostPreview from '../../components/PostPreview'
import { getPost, listPosts } from '../../graphql/queries'

const SinglePost = ({ post }: Props) => {
  return (
    <Container maxWidth='md'>
      <PostPreview post={post} />
      {post.comments.items.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </Container>
  )
}

export default SinglePost

// PRE-RENDERING

export const getStaticPaths: GetStaticPaths = async () => {
  let paths = []
  try {
    const response = (await API.graphql({
      query: listPosts,
    })) as { data: ListPostsQuery; error: any[] }

    paths = response.data.listPosts.items.map((post) => {
      return { params: { id: post.id } }
    })
  } catch (error) {
    console.log(error)
  }

  return {
    paths: paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = (await API.graphql({
    query: getPost,
    variables: {
      id: params.id,
    },
  })) as { data: GetPostQuery; error: any[] }

  return {
    props: {
      post: response.data.getPost,
    },
  }
}

interface Props {
  post: Post
}
