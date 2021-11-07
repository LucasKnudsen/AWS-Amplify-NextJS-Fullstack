import { TextField, Container, Button, Grid, Input } from '@mui/material'

import { useForm, SubmitHandler } from 'react-hook-form'

import React from 'react'

interface IFormInput {
  title: string
  content: string
}

const CreatePost = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {}

  return (
    <Container maxWidth='md'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction='column' spacing={4}>
          <Grid item>
            <TextField
              label='Title'
              id='title'
              variant='outlined'
              type='text'
              {...register('title', {
                required: { value: true, message: 'Please enter a title' },
              })}
              error={Boolean(errors.title)}
              helperText={errors.title?.message}
            />
          </Grid>

          <Grid item>
            <TextField
              label='Post Content'
              id='content'
              multiline
              variant='outlined'
              type='text'
              {...register('content', {
                required: { value: true, message: 'Please enter some content' },
              })}
              error={Boolean(errors.content)}
              helperText={errors.content?.message}
            />
          </Grid>

          <Grid item>
            <label htmlFor='contained-button-file'>
              <Input
                sx={{ display: 'none' }}
                id='contained-button-file'
                type='file'
              />
              <Button variant='contained' component='span'>
                Upload
              </Button>
            </label>
          </Grid>

          <Grid item>
            <Button>Create post</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default CreatePost
