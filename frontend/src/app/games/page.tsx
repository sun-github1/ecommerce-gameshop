import GameCard from '@/components/GameCard/GameCard';
import HeroSection from '@/components/HeroSection/HeroSection';
import { getGames } from '@/libs/apis';
import { NextPage } from 'next'
import React from 'react'

interface gameProps{
    params: {slug: string}
}

const Games: NextPage = async (props) => {
    const games = await getGames();
    console.log('all games', games[4].imageFile);
    return (
        <div>
            <HeroSection />
            <section className={gamesAllClassNames.section}>
                <h2 className={gamesAllClassNames.heading}>
                    Games
                </h2>
                <p className={gamesAllClassNames.subHeading}>
                    Checkout our latest collection of games
                </p>
                <div className="flex rounded gap-8 flex-wrap py-10">
          {/* COllection of games */}
          {games && games?.map(game => (<GameCard
            key={game._id}
            gameName={game.name}
            imageUrl={game.images[0].url || game.imageFile}
            slug={game.slug.current}
            price={game.price} />
          ))}
        </div>
            </section>
        </div>
    )
}

export default Games;


const gamesAllClassNames = {
    section: "py-16 lg:pb-36 px-4 lg:px-36 text-white text-center",
    heading: "text-3xl lg:text-4xl font-bold mb-3",
    subHeading: "text-gray-400 max-w-xl mx-auto lg:text-lg",
};