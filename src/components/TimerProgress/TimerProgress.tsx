import React from 'react'
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Image from 'next/image';
import clock from '../../../public/images/clock.png'
import { Grid } from '@mui/material';
type Props = {}

const TimerProgress = (props: CircularProgressProps & { value: number },) => {
  return (
    <Grid position={'relative'}>
      <Image src={clock} alt={'clock'} style={{width:'55px',height:'55px'}}/>
      <Box sx={{ position: 'absolute', display: 'inline-flex'}}right={{xs:52,sm:115,md:70}} top={27}>
        {/* <CircularProgress variant="determinate" {...props} /> */}
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
            fontSize={'22px'}
          >{`${Math.round(props.value)}`}</Typography>
        </Box>
      </Box>
    </Grid>

  )
}
export default TimerProgress