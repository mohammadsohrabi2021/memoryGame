import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import { dataMobileMenuItem } from '@/DataModal/DataModal';
import CloudIcon from '@mui/icons-material/Cloud';
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
};
type Props = {
    open: boolean,
    handleClose: {} | boolean
}

const GuidanceMessage = ({ open, handleClose }: Props) => {
    return (
        <Modal
            keepMounted
            open={open}
            // @ts-ignore
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box  sx={style} width={{ xs: '75%',sm:'80%',md:'70%', lg: '40%' }}>
                {/* @ts-ignore */}
                <Button onClick={handleClose}>
                    <CloseIcon />
                </Button>
                <Typography display={'flex'} alignItems={'center'} justifyContent={'center'} gap={1} color={'#7b049c'} fontSize={'1.8rem'} fontWeight={'bold'}>
                    {'راهنمایی'} <CloudIcon style={{ width: '50px', height: '50px' }} />
                </Typography>
                <Grid sx={{ direction: 'rtl' }} width={'100%'}>
                    {
                        dataMobileMenuItem.map(item => (
                            <Typography key={item.id} fontWeight={'bold'} fontSize={'16px'} id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                                {item.icon} {item.title}
                            </Typography>
                        ))
                    }
                </Grid>
            </Box>
        </Modal>
    )
}

export default GuidanceMessage