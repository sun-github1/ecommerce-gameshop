"use client";
import CarouselSlider from '@/components/CarouselSlider/CarouselSlider';
import { useAppDispatch } from '@/hooks/storeHook';
import { getGame } from '@/libs/apis';
import { Game } from '@/models/game';
import { addItemToCart } from '@/redux/features/cartSlice';
import React, { useState, useEffect } from 'react'
import { FaShoppingCart } from "react-icons/fa"

interface GameItemProps {
        slug: string;
        children: React.ReactNode
}

const GameDetailsClient = (props: GameItemProps) => {
    const { slug, children } = props;
    const [gameDetails, setGameDetails] = useState<Game>();
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchGameDetails = async () => {
            if (slug) {
                const game = await getGame(slug);
                setGameDetails(game);
                console.log("game", game);
            }
        };
        fetchGameDetails();
        console.log("fetchGameDetails called");
    }, [slug]);

    const handleDecrease = () => {
        if (!gameDetails) return;
        if (quantity > 0) {
            setQuantity(quantity - 1);
            setPrice(Number(((quantity - 1) * gameDetails.price).toFixed(2)));
        }
    };

    const handleIncrease = () => {
        if (!gameDetails) return;
        if (quantity < gameDetails.quantity) {
            setQuantity(quantity + 1);
            setPrice(Number(((quantity + 1) * gameDetails.price).toFixed(2)));
        }
    };

    const handleAddToCart = () => {
      if (!gameDetails) return;
      dispatch(addItemToCart({ ...gameDetails, quantity }));
    };

    return (
        <>
            {gameDetails && <CarouselSlider images={gameDetails.images} />}
            <div className={gameItemClassNames.container}>
                <div className={gameItemClassNames.productInfo}>
                    <div className={gameItemClassNames.cartContainer}>
                        <button
                            className={`${gameItemClassNames.button} 
              ${quantity === 0 && gameItemClassNames.disabledButton}`}
                            disabled={quantity === 0}
                            onClick={handleDecrease}>
                            -</button>
                        <input type="text"
                            className={gameItemClassNames.quantityInput}
                            value={quantity}
                            readOnly
                        />
                        <button className={`${gameItemClassNames.button} 
                            ${quantity === gameDetails?.quantity && gameItemClassNames.disabledButton}`}
                            disabled={quantity === gameDetails?.quantity}
                            onClick={handleIncrease}>+</button>
                        <div className={gameItemClassNames.cartPrice} >{`$ ${price}`}</div>
                        <button className={`${gameItemClassNames.button} 
                            ${quantity === 0 && gameItemClassNames.disabledButton}`}
                            disabled={quantity === 0}
                            onClick={handleAddToCart}>
                            <FaShoppingCart />
                        </button>
                    </div>
                    {/* Render Game Details */}
                    {children}
                </div>
            </div>
        </>

    )
}

export default GameDetailsClient


const gameItemClassNames = {
    container:
        "py-10 max-w-xs md:max-w-3xl mx-auto flex flex-col items-center justify-center",
    carousel: "relative w-full h-64 mb-4",
    previousButton:
        "absolute top-1/2 left-2 transform -translate-y-1/2 px-4 py-2 bg-gray-500 text-white rounded-l",
    nextButton:
        "absolute top-1/2 right-2 transform -translate-y-1/2 px-4 py-2 bg-gray-500 text-white rounded-r",
    productInfo: "text-center",
    cartPrice: "text-xl text-primary-light",
    addToCartButton: "px-4 py-2 mt-4 bg-blue-500 text-white rounded",
    cartContainer: "flex justify-center items-center space-x-4",
    quantityInput:
        "border outline-none border-gray-300 rounded px-2 py-1 text-center w-12",
    button: "px-4 py-2 rounded bg-blue-500 text-white",
    disabledButton: "bg-gray-300 cursor-not-allowed",
};