"use client";
import GameDetailsClient from '@/components/GameDetails/GameDetailsClient';
import GameDetailsServer from '@/components/GameDetails/GameDetailsServer';
import React, { useState, useEffect } from 'react'

interface GameItemProps {
  params: { slug: string; }
}

const GameItem = (props: GameItemProps) => {
  const { params: { slug } } = props;


  return (
    <>
      <GameDetailsClient slug={slug}>
          <GameDetailsServer slug={slug} />
        </GameDetailsClient>
    </>

  )
}

export default GameItem
