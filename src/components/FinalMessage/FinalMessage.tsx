import React, { useState, useEffect} from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import { useRouter } from 'next/router'
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type Props = {
    openFinalMessage: boolean,
    handleCloseFinalMessage: {} | boolean,
    time: number,
    score: number,
    clickCounts: number
}

const FinalMessage = ({ openFinalMessage, handleCloseFinalMessage, time, score, clickCounts }: Props) => {
    const [timeLeft, setTimeLeft] = useState(5);
    const router = useRouter()
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
  
      if (timeLeft === 0) {
        clearTimeout(timer);
        router.push('/FinalGame')
      }
  
      return () => clearTimeout(timer);
    }, [timeLeft, router]);

    return (
        <Grid>
            <Modal
                keepMounted
                open={openFinalMessage}
                // @ts-ignore
                onClose={handleCloseFinalMessage}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        {
                            score === 8 ? "برنده شدی!" : 'باختی'
                        }
                        <CloudIcon style={{ width: '50px', height: '50px' }} />
                    </Typography>
                    <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                        {
                            score === 8 ? <> {`تبریک میگم! توی ${clickCounts} کلیک برنده شدی :)`}</> : <> {`تو با ${clickCounts}  کلیک بازنده شدی :)`}</>
                        }
                        {timeLeft}

                    </Typography>
                   
                </Box>
            </Modal>
        </Grid>
    )
}

export default FinalMessage