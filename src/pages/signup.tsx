import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { TextField, Button, Grid, Alert, Snackbar } from '@mui/material'
import Auth from '@aws-amplify/auth'
import { useRouter } from 'next/router'

interface IFormInput {
  username: string
  email: string
  password: string
  code: string
}

type AlertColor = 'success' | 'info' | 'warning' | 'error'

interface SignUpMessage {
  message: string
  type: AlertColor
}

const Signup = () => {
  const [open, setOpen] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [signUpMessage, setSignUpMessage] = useState<SignUpMessage>({
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
      if (isConfirming) {
        await confirmSignUp(data)
      } else {
        await signUp(data)
      }
    } catch (error) {
      setSignUpMessage({ message: error.message, type: 'error' })
      setOpen(true)
    }
  }

  const signUp = async (data: IFormInput) => {
    const { username, password, email } = data
    try {
      const amplifyUser = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      })
      console.log(amplifyUser)
      setSignUpMessage({
        message: 'Sign up successful. Continue by confirming your email.',
        type: 'success',
      })
      setIsConfirming(true)
      setOpen(true)
    } catch (error) {
      throw error
    }
  }

  const confirmSignUp = async (data: IFormInput) => {
    const { username, password, code } = data
    await Auth.confirmSignUp(username, code)
    const amplifyUser = await Auth.signIn(username, password)
    console.log(amplifyUser)
    setSignUpMessage({
      message: 'Verification succeeded!',
      type: 'success',
    })

    setTimeout(() => {
      router.push('/')
    }, 2000)
    try {
    } catch (error) {
      throw error
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

          {/* Email */}

          <Grid item>
            <TextField
              label='Email'
              defaultValue='laksteelhouse@gmail.com'
              id='email'
              autoComplete='new-password'
              type='email'
              variant='outlined'
              {...register('email', {
                required: { value: true, message: 'Please enter a email' },
              })}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
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

          {/* Verification Code */}

          {isConfirming && (
            <Grid item>
              <TextField
                label='Verification code'
                id='code'
                autoComplete='new-password'
                type='code'
                variant='outlined'
                {...register('code', {
                  required: { value: true, message: 'Please enter your code' },
                })}
                error={Boolean(errors.code)}
                helperText={errors.code?.message}
              />
            </Grid>
          )}

          <Grid marginTop={2}>
            <Button type='submit' variant='contained'>
              {isConfirming ? 'Confirm code' : 'Sign up'}
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
          severity={signUpMessage.type}
          sx={{ alignItems: 'center' }}
        >
          {signUpMessage.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Signup
