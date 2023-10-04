import { Game } from "@/models/game";
import { getGamesById } from '@/libs/apis';

export async function POST(req: Request, res: Response) {
    const {cartItems} = await req.json();
    //check the quantity against from sanity
    const updatedItems = await fetchAndCalculateItemPriceQuantity(cartItems);
    //use our own proce
    return Response.json({ error: "here it is" }, { status: 500 });
    // try {
    //     // Create Checkout Sessions from body params.
    //     const session = await stripe.checkout.sessions.create({
    //         line_items: [
    //             {
    //                 // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
    //                 price: '{{PRICE_ID}}',
    //                 quantity: 1,
    //             },
    //         ],
    //         mode: 'payment',
    //         success_url: `${req.headers.origin}/?success=true`,
    //         cancel_url: `${req.headers.origin}/?canceled=true`,
    //     });
    //     res.redirect(303, session.url);
    // } catch (err) {
    //     res.status(err.statusCode || 500).json(err.message);
    // }
}

async function fetchAndCalculateItemPriceQuantity(cartItems: Game[]) {
    try {
        //get price from productid
        console.log('cartItems', cartItems);
        const itemIds=  cartItems.map(item=> item._id);
        const games = await getGamesById(itemIds);
        console.log('cartItems games', games);
    } catch (error) {
        console.log(error);
    }
}
