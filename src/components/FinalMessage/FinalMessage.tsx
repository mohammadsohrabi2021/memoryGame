import React, { useState, useEffect } from "react";
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
    // width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: '10px',
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
                <Box sx={style} width={{xs:'75%',sm:'500px'}} textAlign={'center'}>
                    <Grid display={'flex'} justifyContent={'center'} alignItems={'center'} gap={2} >
                        <Typography fontSize={{xs:'18px',sm:'28px'}} fontWeight={'bold'} color={score === 8 ?'blue':'gray'}>
                            {
                                score === 8 ? "برنده شدی!" : ' متاسفانه امروز برنده نشدید'
                            }
                        </Typography>
                        {score === 8 ? <CloudIcon style={{ width: '50px', height: '50px', color: 'blue' }} /> : <CloudIcon style={{ width: '50px', height: '50px', color: 'gray' }} />}
                    </Grid>
                    <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }} my={3} fontWeight={'bold'}fontSize={'22px'}color={score === 8 ?'green':'red'}>
                        {
                            score === 8 ? <> {`تبریک میگم! توی ${clickCounts} کلیک برنده شدی :)`}</> : <> {`(:شما با ${clickCounts}  کلیک بازنده شدید `}</>
                        }


                    </Typography>
                    <Typography borderRadius={'3px'} bgcolor={score === 8 ? 'green':'red'} py={2}color={'#fff'} fontWeight={'bold'} fontSize={'18px'}>
                        {
                            score === 8 ? <>  {`بریم جایزتو بدیم ${timeLeft}`}</> : <>  {`بریم به صفحه اصلی سورچی ${timeLeft}`}</>
                        }
                    </Typography>

                </Box>
            </Modal>
        </Grid>
    )
}

export default FinalMessage