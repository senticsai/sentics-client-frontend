// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@components/mui/Box'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import { Theme } from '@mui/material/styles'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import ToggleButton from '@mui/material/ToggleButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

// ** Icons Imports
import CodeTags from 'mdi-material-ui/CodeTags'
import ContentCopy from 'mdi-material-ui/ContentCopy'
import LanguageJavascript from 'mdi-material-ui/LanguageJavascript'
import LanguageTypescript from 'mdi-material-ui/LanguageTypescript'

// ** Third Party Components
import Prism from 'prismjs'
import toast from 'react-hot-toast'

// ** Types
import { CardSnippetProps } from './types'

// ** Hooks
import useClipboard from 'src/@core/hooks/useClipboard'

const CardSnippet = (props: CardSnippetProps) => {
  // ** Props
  const { id, sx, code, title, children, className } = props

  // ** States
  const [showCode, setShowCode] = useState<boolean>(false)
  const [tabValue, setTabValue] = useState<'tsx' | 'jsx'>(code.tsx !== null ? 'tsx' : 'jsx')

  // ** Hooks
  const clipboard = useClipboard()
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  // ** Highlight code on mount
  useEffect(() => {
    Prism.highlightAll()
  }, [showCode, tabValue])

  const codeToCopy = () => {
    if (code.tsx !== null && tabValue === 'tsx') {
      return code.tsx.props.children.props.children
    } else if (code.jsx !== null && tabValue === 'jsx') {
      return code.jsx.props.children.props.children
    } else {
      return ''
    }
  }

  const handleClick = () => {
    clipboard.copy(codeToCopy())
    toast.success('The source code has been copied to your clipboard.', {
      duration: 2000
    })
  }

  const renderCode = () => {
    if (code[tabValue] !== null) {
      return code[tabValue]
    } else {
      return null
    }
  }

  // @ts-ignore
  return (
    <Card
      className={className}
      sx={{ '& .MuiCardHeader-action': { lineHeight: 0.8 }, ...sx }}
      id={id || `card-snippet--${title.toLowerCase().replace(/ /g, '-')}`}
    >
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: 'h6' }}
        {...(hidden
          ? {}
          : {
              action: (
                <IconButton onClick={() => setShowCode(!showCode)}>
                  <CodeTags fontSize='small' />
                </IconButton>
              )
            })}
      />
      <CardContent>{children}</CardContent>
      {hidden ? null : (
        <Collapse in={showCode}>
          <Divider sx={{ my: 0 }} />

          <CardContent sx={{ position: 'relative', '& pre': { m: '0 !important', maxHeight: 500 } }}>
            <Box component="div" sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <ToggleButtonGroup
                exclusive
                size='small'
                color='primary'
                value={tabValue}
                onChange={(e, newValue) => (newValue !== null ? setTabValue(newValue) : null)}
              >
                {code.tsx !== null ? (
                  <ToggleButton value='tsx'>
                    <LanguageTypescript fontSize='small' />
                  </ToggleButton>
                ) : null}
                {code.jsx !== null ? (
                  <ToggleButton value='jsx'>
                    <LanguageJavascript fontSize='small' />
                  </ToggleButton>
                ) : null}
              </ToggleButtonGroup>
            </Box>
            <Tooltip title='Copy the source' placement='top'>
              <IconButton
                onClick={handleClick}
                sx={{
                  top: '5rem',
                  right: '2.5625rem',
                  position: 'absolute',
                  color: theme => theme.palette.grey[100]
                }}
              >
                <ContentCopy fontSize='small' />
              </IconButton>
            </Tooltip>
            <Box component="div">{renderCode()}</Box>
          </CardContent>
        </Collapse>
      )}
    </Card>
  )
}

export default CardSnippet
