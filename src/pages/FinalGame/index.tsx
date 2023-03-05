import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import React from 'react'

type Props = {}

const index = (props: Props) => {
    return (
        <Grid display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} height={'80vh'}>
            <Typography fontSize={'22px'} fontWeight={'bold'} my={5}> {'اگه جایزتو میخوای یه سر بزن به استارت آپ سورچی'}</Typography>
            <Link href={'/'}>
                <Button variant='outlined'>{'بریم دوباره بازی کنیم:)'}</Button>
            </Link>
        </Grid>

    )
}

export default index