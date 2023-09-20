import Link from 'next/link';
import React, { FC } from 'react'
import gameCategoryCardClassNames from './gameCategoryCardClasnames';
import Image from 'next/image';

interface GameCategoryCardProps {
    gamecategory: {
        categoryName: string;
        categoryImage: string;
        slug: string;
    }
}

const GameCategoryCard: FC<GameCategoryCardProps> = (props) => {
    const { gamecategory } = props;

    return (
        <Link href={`categories/${gamecategory.slug}`} className={gameCategoryCardClassNames.container}>
            <Image src={gamecategory.categoryImage}
                className={gameCategoryCardClassNames.image}
                height={200}
                width={200}
                alt={gamecategory.categoryName} />
                <h3 className={gameCategoryCardClassNames.name}>{gamecategory.categoryName}</h3>
                <Image src="/images/arrow.svg"
                className={gameCategoryCardClassNames.arrow}
                height={20}
                width={20}
                alt="arrow" />
        </Link>
    )
}

export default GameCategoryCard 