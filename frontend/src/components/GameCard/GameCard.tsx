import Link from 'next/link';
import Image from 'next/image';
import React, { FC } from 'react'
import gameCardClassNames from './gameCardClassNames';

const GameCard: FC<{
    gameName: string;
    imageUrl: string;
    slug: string;
    price: number;
}> = (props) => {
    const { gameName, imageUrl, slug, price } = props;
    return (
        <>
            <Link href={`/games/${slug}`} className={gameCardClassNames.container}>
                <h3 className={gameCardClassNames.price}>{`${price} $`}</h3>
                <Image
                    src={imageUrl}
                    className={gameCardClassNames.image}
                    alt={gameName}
                    height={200}
                    width={200}
                />
                <div className={gameCardClassNames.gameName}>{gameName}</div>
            </Link>
        </>
    )
}

export default GameCard