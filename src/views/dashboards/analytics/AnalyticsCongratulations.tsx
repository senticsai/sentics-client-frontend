// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid, { GridProps } from '@mui/material/Grid'

// ** Hook
import { useSettings } from 'src/@core/hooks/useSettings'
import {router} from "next/client";
import Link from 'next/link'

// Styled Grid component
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    order: -1,
    display: 'flex',
    justifyContent: 'center'
  }
}))

// Styled component for the image
const Img = styled('img')(({ theme }) => ({
  right: 0,
  bottom: 0,
  width: 298,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    width: 250,
    position: 'static'
  }
}))

const AnalyticsCongratulations = () => {
  // ** Hook
  const { settings } = useSettings()

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent sx={{ p: theme => `${theme.spacing(6.75, 7.5)} !important` }}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <Typography variant='h5' sx={{ mb: 4.5 }}>
              Congratulations{' '}
              <Box component='span' sx={{ fontWeight: 'bold' }}>
                Sentics
              </Box>
              ! 🎉
            </Typography>
            <Typography variant='body2'>
              Our safety score is{' '}
              <Box component='span' sx={{ fontWeight: 600 }}>
                68%
              </Box>{' '}
              😎 higher this week.
            </Typography>
            <Typography sx={{ mb: 4.5 }} variant='body2'>
              Check our detailed analytics page for details.
            </Typography>
            <Link href='/analytics'>
              <Button variant='contained'>View Detailed Analytics</Button>
            </Link>
          </Grid>
          <StyledGrid item xs={12} sm={6}>
            <Img alt='Congratulations John' src={`/images/cards/illustration-john-${settings.mode}.png`} />
          </StyledGrid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AnalyticsCongratulations
