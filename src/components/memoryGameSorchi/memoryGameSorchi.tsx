import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import TimerProgress from "../TimerProgress/TimerProgress";

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

const shuffle = (array: string[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const MemoryGameSorchi = (props: Props) => {

    const [cards, setCards] = useState([]);
    const [revealed, setRevealed] = useState([]);
    const [score, setScore] = useState(0);
    const [clickCounts, setClickCounts] = useState(0)
    const [time, setTime] = useState(90); // زمان ابتدایی بازی ۶۰ ثانیه است
    const [gameOver, setGameOver] = useState(false);
    const [show, setShow] = useState(true)

    useEffect(() => {
        shuffle(images);
        // const newCards = images.map((image) => ({ image, revealed: false }));

        const shuffledImages = shuffle(images.concat(images)); // تکرار عکس‌ها را اضافه می‌کنیم
        const newCards = shuffledImages.map((image) => ({ image, revealed: false }));
        // @ts-ignore
        setCards(newCards);
        setTimeout(() => {
            setShow(false)
        }, 1000);
    }, []);

    useEffect(() => {
        if (!gameOver && time > 0) { // اگر بازی خاتمه نیافته و زمان باقیمانده وجود داشته باشد
            const intervalId = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        } else if (time === 0) { // اگر زمان بازی تمام شده باشد
            setGameOver(true);
            setTimeout(() => alert("Time's up! Game over."), 500);
        }
    }, [time]);
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
            //  // check if game is finished
            //  if (score + 1 === images.length / 2) {
            //     setTimeout(() =>
            //         alert("You won the game!")
            //         , 500);
            // }
        }
    };

    const checkMatch = () => {
        const [index1, index2] = revealed;
        const card1 = cards[index1];
        const card2 = cards[index2];
        // @ts-ignore
        if (card1.image === card2.image) {
            // increase score
            setScore((prev) => prev + 1);
            setRevealed([]);

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
            <Grid width={{ xs: '100%',sm:'80%',md:'60%', lg: '40%' }} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Typography width={{ xs: '100%' }} textAlign={'center'} fontWeight={'bold'} bgcolor={'#9506e7'} color={'#fff'} p={'10px 0'}>{'بازی حافظه'}</Typography>
            </Grid>
            <Grid mt={{xs:1,sm:3}} display={'flex'} flexDirection={{ xs: 'column', sm: 'row' }} justifyContent={'space-between'} width={{ xs: '100%',sm:'80%',md:'60%', lg: '40%' }}>
                <Grid display={'flex'} justifyContent={'space-between'} alignItems={'center'} px={{xs:2,sm:0}}>
                    <Grid display={'flex'} justifyContent={'center'} alignItems={'center'} gap={1} flexDirection={'row-reverse'}>
                        <Typography fontWeight={'bold'}>{': امتیاز شما   '}</Typography>
                        {score}
                    </Grid>
                    <Grid display={{ xs: 'flex', sm: 'none' }}>تعداد کلیک: {clickCounts}</Grid>
                </Grid>
                <Grid width={{xs:'100%',sm:'70%'}} pl={2} textAlign={'center'}>
                    <TimerProgress value={time} />
                </Grid>
                <Grid display={{ xs: 'none', sm: 'flex' }}>تعداد کلیک: {clickCounts}</Grid>
            </Grid>
            <Grid display={'flex'} flexWrap={'wrap'}  width={{ xs: '100%',sm:'80%',md:'60%', lg: '40%' }} height={'100%'}>
                <Grid display={'flex'} justifyContent={'space-evenly'} flexWrap={'wrap'} width={'100%'} gap={{xs:0.5,sm:0.5}} height={{xs:'80%',sm:'60%',md:'55%',lg:'100%'}} bgcolor={'#c4c4c4'}>
                    {cards.slice(0, 16).map((card, index) => (
                        <>
                            {show ? <Grid
                                key={index}
                                className="card"
                                width={{xs:'75px',sm:'135px',lg:'125px'}}
                                height={{xs:'75px',sm:'135px',lg:'125px'}}
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
                                width={{xs:'75px',sm:'135px',lg:'125px'}}
                                height={{xs:'75px',sm:'135px',lg:'125px'}}
                                
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
                            ></Grid>}
                        </>
                    ))}

                </Grid>
            </Grid>
        </Grid>
    )
}

export default MemoryGameSorchi