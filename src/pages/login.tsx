import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { TextField, Button, Grid, Alert, Snackbar } from '@mui/material'
import Auth from '@aws-amplify/auth'
import { useRouter } from 'next/router'

interface IFormInput {
  username: string
  password: string
}

type AlertColor = 'success' | 'info' | 'warning' | 'error'

interface Message {
  message: string
  type: AlertColor
}

const Login = () => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState<Message>({
    message: '',
    type: 'success',
  })
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const amplifyUser = await Auth.signIn(data.username, data.password)
      if (amplifyUser) {
        setTimeout(() => {
          router.push('/')
        }, 2000)
      }
    } catch (error) {
      setMessage({ message: error.message, type: 'error' })
      setOpen(true)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='new-password'>
        <Grid
          container
          direction='column'
          alignItems='center'
          justifyContent='center'
          spacing={1}
          marginTop={2}
        >
          {/* Username */}

          <Grid item>
            <TextField
              defaultValue='Miyagi'
              label='Username'
              id='username'
              variant='outlined'
              type='text'
              {...register('username', {
                required: { value: true, message: 'Please enter a username' },
                minLength: {
                  value: 3,
                  message: 'Username must be between 3-16 characters',
                },
              })}
              error={Boolean(errors.username)}
              helperText={errors.username?.message}
            />
          </Grid>

          {/* Password */}

          <Grid item>
            <TextField
              label='Password'
              id='password'
              defaultValue='abcd1234'
              type='password'
              autoComplete='new-password'
              variant='outlined'
              {...register('password', {
                required: { value: true, message: 'Please enter a password' },
                minLength: { value: 8, message: 'Min length: 8' },
              })}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
          </Grid>

          <Grid marginTop={2}>
            <Button type='submit' variant='contained'>
              Login
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        sx={{ top: 50 }}
      >
        <Alert
          elevation={6}
          variant='filled'
          onClose={() => setOpen(false)}
          severity={message.type}
          sx={{ alignItems: 'center' }}
        >
          {message.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Login
