import { loadStripe } from "@stripe/stripe-js";

let stripePromise: any;

export const getStripe = async () => {
    if(!stripePromise)
    {
        stripePromise= await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
    }
    return stripePromise;
}