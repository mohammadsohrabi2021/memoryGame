import React from 'react'
import CircularProgress, {
    CircularProgressProps,
  } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type Props = {}

const TimerProgress = ( props: CircularProgressProps & { value: number },) => {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
            padding={'100px'}
            fontWeight={'bold'}
          >{`${Math.round(props.value)} زمان`}</Typography>
        </Box>
      </Box>
    )
}
export default TimerProgress