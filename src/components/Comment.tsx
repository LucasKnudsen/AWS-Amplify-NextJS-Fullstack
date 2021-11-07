import { Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { Comment } from '../API'
import { findHourDifference } from '../helpers/utils'

interface Props {
  comment: Comment
}

const Comment = ({ comment }: Props) => {
  return (
    <Paper
      elevation={10}
      sx={{ width: '100%', minHeight: 102, padding: 2, marginBottom: 2 }}
    >
      <Grid container direction='column'>
        <Grid container spacing={1}>
          <Grid item>
            <Typography variant='caption'>
              Commented by <b>{comment.owner}</b>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='caption'>
              - <b>{findHourDifference(comment.createdAt)}</b> hours ago
            </Typography>
          </Grid>
        </Grid>

        <Grid item>
          <Typography>{comment.content}</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Comment
