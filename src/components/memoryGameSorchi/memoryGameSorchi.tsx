import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
import TimerProgress from "../TimerProgress/TimerProgress";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from "@mui/material/Button";
import GuidanceMessage from "../GuidanceMessage/GuidanceMessage";
import FinalMessage from "../FinalMessage/FinalMessage";
import { dataJsonScripts } from '../../../public/scripts/json'
import tickIcon from '../../../public/images/tick.png'
import tickFinal from '../../../public/images/tickFinal.png'
import clickIcon from '../../../public/images/clickIcon.png'


import { Roboto } from "next/font/google";
import { Transform } from "stream";
type Props = {}
const images = [
    "images/01.png",
    "images/02.png",
    "images/03.png",
    "images/04.jpg",
    "images/05.png",
    "images/06.jpg",
    "images/07.png",
    "images/08.jpg",
];



const MemoryGameSorchi = (props: Props) => {
    const [api, setApi] = useState({})
    const [cards, setCards] = useState([]);
    const [revealed, setRevealed] = useState([]);
    const [score, setScore] = useState(0);
    const [clickCounts, setClickCounts] = useState(0)
    const [time, setTime] = useState(90); // زمان ابتدایی بازی 90 ثانیه است
    const [gameOver, setGameOver] = useState(false);
    const [show, setShow] = useState(true)
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const [ids, setIds] = useState([]);
    const [matchedIds, setMatchedIds] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [openFinalMessage, setOpenFinalMessage] = React.useState(false);
    const handleOpenFinalMessage = () => setOpenFinalMessage(true);
    const handleCloseFinalMessage = () => setOpenFinalMessage(false);

    const shuffle = (array: string[]) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;

    };


    useEffect(() => {
        shuffle(images);
        const shuffledImages = shuffle(images.concat(images)); // تکرار عکس‌ها را اضافه می‌کنیم
        const newCards = shuffledImages.map((image) => ({ image, revealed: false }));
        // @ts-ignore
        setCards(newCards);
        setTimeout(() => {
            setShow(false)
        }, 1000);
        // @ts-ignore
        setApi(dataJsonScripts)

    }, []);

    useEffect(() => {
        if (!gameOver && time > 0) { // اگر بازی خاتمه نیافته و زمان باقیمانده وجود داشته باشد
            const intervalId = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        } else if (time === 0) { // اگر زمان بازی تمام شده باشد
            setGameOver(true);
            setOpenFinalMessage(true)
            // setTimeout(() => <Grid>
            //     {
            //         openFinalMessage ? <FinalMessage score={score} time={time} openFinalMessage={openFinalMessage} handleCloseFinalMessage={handleCloseFinalMessage} clickCounts={clickCounts} /> : ''
            //     }
            // </Grid>, 500);
        }
        // check if game is finished
        else if (score === images.length) {
            setGameOver(true);
            setOpenFinalMessage(true)
        }
    }, [time, score]);

    useEffect(() => {
        if (revealed.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }, [revealed]);
    // @ts-ignore
    const handleCardClick = (index) => {
        if (!gameOver) { // اگر بازی خاتمه نیافته باشد
            const newCards = [...cards];
            const card = newCards[index];
            // @ts-ignore
            if (revealed.length < 2 && !card.revealed) {
                // @ts-ignore
                card.revealed = true;
                // @ts-ignore
                setRevealed((prev) => [...prev, index]);
                setCards(newCards);
                setClickCounts((prev) => (prev + 1));

            }

        }

    };

    const checkMatch = (index: number | any) => {
        const [index1, index2] = revealed;
        const card1 = cards[index1];
        const card2 = cards[index2];

        // @ts-ignore
        if (card1.image === card2.image) {
            // increase score
            setScore((prev) => prev + 1);
            setRevealed([]);
            setMatchedIds((prevMatchedIds) => [...prevMatchedIds, index1, index2]);
        } else {
            const newCards = [...cards];
            // @ts-ignore
            newCards[index1].revealed = false;
            // @ts-ignore
            newCards[index2].revealed = false;
            setCards(newCards);
            setRevealed([]);
        }
    };

    return (
        <Grid py={1} width={'100%'} height={'100vh'} display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} alignItems={'center'}>
            <Grid width={{ xs: '100%', sm: '500px', md: '342px' }} flexDirection={'row-reverse'} bgcolor={'#9506e7'} color={'#fff'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Typography width={{ xs: '95%' }} textAlign={'center'} fontWeight={'bold'} p={'10px 30px 10px 0'}>{'بازی حافظه'}</Typography>
                <Grid width={{ xs: '5%' }}>
                    <Button onClick={handleOpen}>
                        <MoreVertIcon style={{ color: '#fff' }} />
                    </Button>
                </Grid>
                <GuidanceMessage open={open} handleClose={handleClose} />
            </Grid>
            <Grid position={'relative'} my={{ xs: 1, sm: 2 }} display={'flex'} flexDirection={{ xs: 'column', sm: 'row' }} justifyContent={'space-between'} width={{ xs: '100%', sm: '500px', md: '342px' }}>
                <Grid display={'flex'} width={'100%'} justifyContent={'space-between'} alignItems={'center'} px={{ xs: 0.5, sm: 0 }}>
                    <Grid position={'relative'} p={0.5} borderRadius={'5px'} display={'flex'} flexDirection={'row-reverse'} bgcolor={'rgb(228,99,219)'} sx={{ background: 'linear-gradient(180deg, rgba(228,99,219,1) 15%, rgba(29,81,226,1) 98%)' }} width={'100px'} height={'40px'}>
                        <Grid border={'1px solid #fff'} borderRadius={'5px'} width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <Grid position={'absolute'} right={-20} sx={{ transform: ' skew(-20deg)', transformOrigin: 'top left' }}>
                                <Image src={tickFinal} alt={'icon'} style={{ width: '45px', height: '45px', borderRadius: '50%' }} />
                            </Grid>
                            <Typography color={'#fff'} fontWeight={'bold'}>{score}</Typography>
                        </Grid>
                    </Grid>
                    <Grid width={{ xs: '30%', sm: '20%' }} pl={2} textAlign={'center'}>
                        <TimerProgress value={time} />
                    </Grid>
                    <Grid position={'relative'} p={0.5} borderRadius={'5px'} display={'flex'} flexDirection={'row-reverse'} bgcolor={'rgb(228,99,219)'} sx={{ background: 'linear-gradient(180deg, rgba(228,99,219,1) 15%, rgba(29,81,226,1) 98%)' }} width={'100px'} height={'40px'}>
                        <Grid border={'1px solid #fff'} borderRadius={'5px'} width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <Typography color={'#fff'} fontWeight={'bold'}>{clickCounts}</Typography>
                            <Grid position={'absolute'} left={-18} sx={{ transform: ' skew(10deg)', transformOrigin: 'top left' }}>
                                <Image src={clickIcon} alt={'clickIcon'} style={{ width: '45px', height: '45px', borderRadius: '50%' }} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {score === images.length && <FinalMessage clickCounts={clickCounts} openFinalMessage={openFinalMessage} handleCloseFinalMessage={handleCloseFinalMessage} time={time} score={score} />}
            {time === 0 && <FinalMessage clickCounts={clickCounts} openFinalMessage={openFinalMessage} handleCloseFinalMessage={handleCloseFinalMessage} time={time} score={score} />}
            <Grid display={'flex'} alignItems={'center'} flexWrap={'wrap'} width={{ xs: '100%', sm: '500px', md: '342px' }} height={{ xs: '80%', sm: '60%', md: '640px', lg: '100%' }} bgcolor={'#c4c4c4'}>
                <Grid display={'flex'} justifyContent={'center'} flexWrap={'wrap'} width={'100%'} gap={{ xs: 0.5, sm: 1 }} height={{ xs: '80%', sm: '60%', md: '400px', lg: '100%' }} >
                    {cards.slice(0, 16).map((card, index) => (
                        <>
                            {show ? <Grid
                                key={index}
                                className="card"
                                width={{ xs: '75px', sm: '100px', md: '75px' }}
                                height={{ xs: '75px', sm: '100px', md: '75px' }}
                                borderRadius={'50%'}
                                style={{

                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    // @ts-ignore
                                    backgroundImage: card.revealed

                                        ? "url('images/card-back.png')"
                                        // @ts-ignore
                                        : `url('${card.image}')`,

                                }}

                                onClick={() => handleCardClick(index)}
                            ></Grid> : <Grid
                                key={index}

                                className="card"
                                width={{ xs: '75px', sm: '100px', md: '75px' }}
                                height={{ xs: '75px', sm: '100px', md: '75px' }}
                                borderRadius={'50%'}
                                border={'2px solid #fff'}
                                style={{
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    // @ts-ignore
                                    backgroundImage: card.revealed
                                        // @ts-ignore
                                        ? `url('${card.image}')`
                                        : "url('images/card-back.png')",

                                }}

                                onClick={() => handleCardClick(index)}
                                // @ts-ignore
                            > {matchedIds.includes(index) && <Image src={tickIcon} alt={'tickIcon'} style={{ width: '30px', height: '30px' }} />}</Grid>}
                        </>
                    ))}

                </Grid>
            </Grid>
        </Grid>
    )
}

export default MemoryGameSorchi