import { getGame } from '@/libs/apis';
import React from 'react'

interface GameDetailsServerProps {
    slug: string;
}

const GameDetailsServer = async (props: GameDetailsServerProps) => {
    const { slug } = props;
    const game = await getGame(slug);

    return (
        <>
            <h2 className={gameItemClassNames.name}>
                {game.name}
            </h2>
            <p className={gameItemClassNames.price}>
                {`${game.price} $`}
            </p>
            <h2 className={gameItemClassNames.description}>
                {game.description}
            </h2>
        </>
    )
}

export default GameDetailsServer



const gameItemClassNames = {
    description: "text-lg text-gray-300 mb-2",
    name: "text-4xl pt-5 text-gray-300 font-bold mb-2",
    price: "text-2xl text-primary font-bold",
};