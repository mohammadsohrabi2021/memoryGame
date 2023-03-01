import React from 'react'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type Props = {}

const TimerProgress = (props: LinearProgressProps & { value: number }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress  variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 80 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )} زمان`}</Typography>
            </Box>
        </Box>
    )
}
export default TimerProgress