// ** MUI Import
import Box from '@components/mui/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { useSettings } from 'src/@core/hooks/useSettings'

const FallbackSpinner = () => {
  // ** Hook
  const {settings} = useSettings()

  return (
    <Box
      component="div"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <img alt="logo" height={48} width={256} src={settings.mode === 'dark' ? '/images/logo.png' : '/images/logo-blue.png'} />
      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  )
}

export default FallbackSpinner
