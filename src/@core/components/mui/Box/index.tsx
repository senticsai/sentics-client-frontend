// ** MUI Imports
import MuiBox from '@mui/material/Box'
import {BoxProps} from '@mui/material/Box'

const Box = (props: BoxProps) => {
  return (
    <MuiBox
      {...props}
      component="div"
    />
  )
}

export type {BoxProps}

export default Box
