// ** React Imports
import { ReactNode } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@components/mui/Box'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Theme Config Import
import {useSettings} from "../../../../hooks/useSettings";

interface Props {
  hidden: boolean
  settings: Settings
  saveSettings: (values: Settings) => void
  horizontalAppBarContent?: (props?: any) => ReactNode
  horizontalAppBarBranding?: (props?: any) => ReactNode
}

const StyledLink = styled('a')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  marginRight: theme.spacing(8)
}))

const AppBarContent = (props: Props) => {
  // ** Props
  const {
    horizontalAppBarContent: userHorizontalAppBarContent,
    horizontalAppBarBranding: userHorizontalAppBarBranding
  } = props

  // ** Hooks
  const {settings} = useSettings()

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {userHorizontalAppBarBranding ? (
        userHorizontalAppBarBranding(props)
      ) : (
        <Link href='/' passHref>
          <StyledLink>
            <img alt="logo" height={24} width={128} src={settings.mode === 'dark' ? '/images/logo.png' : '/images/logo-blue.png'} />

          </StyledLink>
        </Link>
      )}
      {userHorizontalAppBarContent ? userHorizontalAppBarContent(props) : null}
    </Box>
  )
}

export default AppBarContent
