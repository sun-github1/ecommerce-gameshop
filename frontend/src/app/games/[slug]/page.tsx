import CarouselSlider from '@/components/CarouselSlider/CarouselSlider';
import { getGame } from '@/libs/apis';
import { NextPage } from 'next'
import React from 'react'

interface GameItemProps {
  params: { slug: string; }
}

const GameItem: NextPage<GameItemProps> = async (props) => {
  const { params: { slug } } = props;
  const gameDetails= await getGame(slug);
  console.log('GameItem game',gameDetails);

  return (
    <div>
      <CarouselSlider images={gameDetails.images} />
    </div>

  )
}

export default GameItem