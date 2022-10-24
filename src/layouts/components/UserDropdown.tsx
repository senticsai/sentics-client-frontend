// ** React Imports
import {useState, SyntheticEvent, Fragment} from 'react'

// ** Next Import
import {useRouter} from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import {styled} from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import CogOutline from 'mdi-material-ui/CogOutline'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'
import AccountOutline from 'mdi-material-ui/AccountOutline'

// ** Context
import {useAuth} from 'src/@core/hooks/useAuth'

// ** Type Imports
import {Settings} from 'src/@core/context/settingsContext'

interface Props {
  settings: Settings
}

// ** Styled Components
const BadgeContentSpan = styled('span')(({theme}) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = (props: Props) => {
  // ** Props
  const {settings} = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  // ** Hooks
  const router = useRouter()
  const {logout, user} = useAuth()

  // ** Vars
  const {direction} = settings

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const handleDiscordButtonClick = () => {
    window.open('https://discord.com/invite/JygBFC9eTp', '_blank')
    handleDropdownClose()
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary'
    }
  }

  const handleLogout = () => {
    logout()
    handleDropdownClose()
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ml: 2, cursor: 'pointer'}}
        badgeContent={<BadgeContentSpan/>}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Avatar
          alt='John Doe'
          onClick={handleDropdownOpen}
          sx={{width: 40, height: 40}}
          src='/images/avatars/1.png'
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{'& .MuiMenu-paper': {width: 230, marginTop: 4}}}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: direction === 'ltr' ? 'right' : 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: direction === 'ltr' ? 'right' : 'left'
        }}
      >
        <Box component="div" sx={{pt: 2, pb: 3, px: 4}}>
          <Box component="div" sx={{display: 'flex', alignItems: 'center'}}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan/>}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              <Avatar
                alt='John Doe'
                src='/images/avatars/1.png'
                sx={{width: '2.5rem', height: '2.5rem'}}
              />
            </Badge>
            <Box component="div"
                 sx={{
                   display: 'flex',
                   marginLeft: 3,
                   alignItems: 'flex-start',
                   flexDirection: 'column'
                 }}
            >
              <Typography sx={{fontWeight: 600}}>{user?.username}</Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{mt: 0, mb: 1}}/>
        <MenuItem sx={{p: 0}} onClick={() => handleDropdownClose('/account-settings')}>
          <Box component="div" sx={styles}>
            <AccountOutline sx={{marginRight: 2}}/>
            Profile
          </Box>
        </MenuItem>
        <Divider/>
        <MenuItem sx={{p: 0}} onClick={() => handleDropdownClose('/account-settings')}>
          <Box component="div" sx={styles}>
            <CogOutline sx={{marginRight: 2}}/>
            Settings
          </Box>
        </MenuItem>

        <MenuItem sx={{p: 0}} onClick={() => handleDiscordButtonClick()}>
          <Box component="div" sx={styles}>
            <Box component="div" sx={{
              marginRight: 2,
              display: 'flex',
              height: 22,
              width: 22,
              alignItems: 'center',
              justifyContent: 'center',
              color: 'text.secondary',
              fill: 'currentColor',
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20px"
                   height="18px" viewBox="0 -28.5 256 256" version="1.1" preserveAspectRatio="xMidYMid">
                <g>
                  <path
                    d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
                    fill="currentColor"/>
                </g>
              </svg>
            </Box>
            Discord
          </Box>
        </MenuItem>
        <Divider/>
        <MenuItem sx={{py: 2}} onClick={handleLogout}>
          <LogoutVariant
            sx={{
              marginRight: 2,
              fontSize: '1.375rem',
              color: 'text.secondary'
            }}
          />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
