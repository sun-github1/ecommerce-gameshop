import { NextPage } from 'next'
import React from 'react'

interface gameCategoryProps
{
    params: {slug: string };
}

const GameCategory: NextPage<> = (props) => {
    console.log('props category', props);
  return (
    <div>GameCategory</div>
  )
}

export default GameCategory