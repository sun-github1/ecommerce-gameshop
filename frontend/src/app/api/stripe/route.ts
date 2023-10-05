import { Game, GameSubSet } from "@/models/game";
import { createOrder, getGamesById, updateGameQuantity } from '@/libs/apis';
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { useSession } from "next-auth/react";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string,
    {
        apiVersion: '2023-08-16'
    });

export async function POST(req: Request, res: Response) {
    const { cartItems, userEmail } = await req.json();
    const origin = req.headers.get('origin');

    //check the quantity against from sanity
    const updatedItems: GameSubSet[] = (await fetchAndCalculateItemPriceQuantity
        (cartItems)) as GameSubSet[];

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: updatedItems.map(item => ({
                quantity: item.quantity,
                adjustable_quantity: {
                    enabled: true,
                    maximum: item.maxQuantity,
                    minimum: 1,
                },
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        images: [item.images[0].url],
                    },
                    unit_amount: parseInt((item.price * 100).toString()),
                },
            })),
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            mode: 'payment',
            success_url: `${origin}/?success=true`,
            phone_number_collection: { enabled: true },
        });

        await updateGameQuantity(updatedItems);
        console.log('session.amount_total', session.amount_total);
        await createOrder(updatedItems, userEmail,
            {
                totalPrice: (session.amount_total as number)/100 ,
            });

        return NextResponse.json(session, { status: 200, statusText: "payment sucessfull" })
    }
    catch (error) {
        console.log("Checkout error", error);
        return NextResponse.json(error, { status: 500 })
    }

    //use our own proce
    return Response.json({ error: "here it is" }, { status: 500 });

}

async function fetchAndCalculateItemPriceQuantity(cartItems: Game[]) {
    try {
        //get price from productid
        const itemIds = cartItems.map(item => item._id);
        const sanityGames = await getGamesById(itemIds);

        const updatedItems: GameSubSet[] = sanityGames.map(
            item =>
            ({
                ...item,
                maxQuantity: item.quantity
            }))

        // Check the quantity
        if (checkQuantitiesAgainstSanity(cartItems, updatedItems)) {
            return new NextResponse(
                'Quantity has been updated, please update your cart',
                { status: 500 }
            );
        }

        //calculate prices
        const calculatedItemPrice: GameSubSet[] = updatedItems.map(item => {
            const cartItem = cartItems.find(c => c._id === item._id);
            return {
                _id: item._id,
                name: item.name,
                images: item.images,
                quantity: cartItem?.quantity as number,
                maxQuantity: item.quantity,
                price: item.price,
            };
        });

        return calculatedItemPrice;

    } catch (error) {
        console.log(error);
        return new NextResponse(
            'Quantity has been updated, please update your cart',
            { status: 500 }
        );
    }

}


function checkQuantitiesAgainstSanity(
    cartItems: Game[],
    sanityItems: GameSubSet[]) {
    for (let i = 0; i < cartItems.length; i++) {
        const cartItem = cartItems[i];
        const sanityItem = sanityItems.find(i => i._id === cartItem._id);

        if (!sanityItem || cartItem.quantity <= sanityItem.quantity) {
            return false;
        }
    }
}