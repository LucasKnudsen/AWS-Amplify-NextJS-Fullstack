import {
  Grid,
  IconButton,
  Typography,
  Paper,
  Box,
  ButtonBase,
} from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Post } from '../API'
import { findHourDifference } from '../helpers/utils'

interface Props {
  post: Post
}

const PostPreview = ({ post }: Props) => {
  const router = useRouter()

  const randomImage = () => {
    return 'https://images.unsplash.com/photo-1636224385430-c5671a455ff5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80'
  }

  const renderVotes = () => {
    return (
      <Grid
        container
        flex={1}
        direction='column'
        alignItems='center'
        sx={{ maxWidth: 50 }}
      >
        <Grid item>
          <IconButton size='small' color='warning'>
            <ArrowUpwardIcon fontSize='inherit' />
          </IconButton>
        </Grid>
        <Grid item>
          <Box>
            <Typography textAlign='center' variant='subtitle1'>
              <b>{post.upvotes - post.downvotes}</b>
            </Typography>
            <Typography textAlign='center' variant='overline'>
              Votes
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <IconButton size='small' color='warning'>
            <ArrowDownwardIcon fontSize='inherit' />
          </IconButton>
        </Grid>
      </Grid>
    )
  }

  return (
    <Paper>
      <Grid margin='24px 0' padding={1} container columns={2}>
        {renderVotes()}

        {/* Preview */}
        <Grid container marginLeft={2} flex={1} direction='column'>
          {/* Overline */}
          <Grid item sx={{ width: '100%' }}>
            <Typography variant='caption'>
              Posted by <b>{post.owner} </b>
            </Typography>
            <Typography variant='caption'>
              - on the <b>{new Date(post.createdAt).toLocaleString()} </b>
            </Typography>
            <Typography variant='caption'>
              | <b>{findHourDifference(post.createdAt)} </b>
              hours ago
            </Typography>
          </Grid>

          {/* Title */}
          <Grid item>
            <Typography variant='h2'>{post.title}</Typography>
          </Grid>

          {/* Content */}
          <ButtonBase onClick={() => router.push(`/posts/${post.id}`)}>
            <Grid container direction='column' alignItems='flex-start'>
              <Grid item sx={{ overflow: 'hidden' }}>
                <Typography
                  sx={{
                    maxHeight: 52,
                    overflow: 'hidden',
                    textAlign: 'start',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    marginBottom: 2,
                  }}
                >
                  {post.contents}
                </Typography>
              </Grid>

              <Grid item>
                <Image
                  src={randomImage()}
                  layout='intrinsic'
                  height={300}
                  width={700}
                  objectFit='cover'
                />
              </Grid>
            </Grid>
          </ButtonBase>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default PostPreview
