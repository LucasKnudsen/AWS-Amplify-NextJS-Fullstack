import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import AccountCircle from '@mui/icons-material/AccountCircle'
import DynamicFormIcon from '@mui/icons-material/DynamicForm'
import MenuItem from '@mui/material/MenuItem'
import AddIcon from '@mui/icons-material/Add'
import Menu from '@mui/material/Menu'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useRecoilState } from 'recoil'
import { userState } from '../recoil/atoms'
import { Button, Tooltip } from '@mui/material'
import { Auth } from 'aws-amplify'

const Header = () => {
  const router = useRouter()
  const [user] = useRecoilState(userState)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSignOut = async () => {
    await Auth.signOut()
    handleClose()
  }

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
      <AppBar color='inherit' position='static'>
        <Toolbar>
          <Link href='/'>
            <IconButton>
              <DynamicFormIcon color='warning' />
            </IconButton>
          </Link>

          <Typography variant='h6' sx={{ flex: 1 }}>
            Fullstack Amplify Awesomeness
          </Typography>

          {user.username ? (
            <div>
              <Tooltip title='Create a post'>
                <IconButton
                  color='inherit'
                  onClick={() => router.push('/create')}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>

              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Menu>
            </div>
          ) : (
            <Grid justifyContent='flex-end' container sx={{ flex: 1 }}>
              <Button
                sx={{ marginRight: 2 }}
                variant='contained'
                color='warning'
                onClick={() => router.push('/login')}
              >
                Login
              </Button>
              <Button
                onClick={() => router.push('/signup')}
                variant='outlined'
                color='inherit'
              >
                Sign up
              </Button>
            </Grid>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
