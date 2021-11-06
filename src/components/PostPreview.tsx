import { Grid, IconButton, Typography, Paper } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { Post } from '../API'

interface Props {
  post: Post
}

const PostPreview = ({ post }: Props) => {
  return (
    <Paper>
      <Grid margin='24px 0' padding={1} container columns={2}>
        <Grid
          container
          flex={1}
          direction='column'
          alignItems='center'
          sx={{ maxWidth: 60 }}
        >
          <Grid item>
            <IconButton size='small' color='warning'>
              <ArrowUpwardIcon fontSize='inherit' />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant='overline'>Votes</Typography>
          </Grid>
          <Grid item>
            <IconButton size='small' color='warning'>
              <ArrowDownwardIcon fontSize='inherit' />
            </IconButton>
          </Grid>
        </Grid>

        {/* Preview */}
        <Grid container marginLeft={3} flex={1} direction='column'>
          <Grid item sx={{ width: '100%' }}>
            <Typography variant='caption'>
              Posted by <b>{post.owner} </b>
            </Typography>
            <Typography variant='caption'>
              - on the <b>{new Date(post.createdAt).toLocaleString()}</b>
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant='h2'>{post.title}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default PostPreview
