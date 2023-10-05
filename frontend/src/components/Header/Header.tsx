"use client";
import Link from "next/link";
import headerClassNames from "./headerClassNames";
import { AiOutlineShoppingCart } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { useAppDispatch } from "@/hooks/storeHook";
import { toggleCart } from "@/redux/features/cartSlice";
import useCartTotals from "@/hooks/useCartTotals";
import Signup from "../Signup/Signup";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
    const { header,
        container,
        logoContainer,
        logo,
        nav,
        ul,
        li,
        link,
        cart,
        contactUs,
        orders,
        signupBtn,
        signinBtn,
        logoutBtn } = headerClassNames;
    const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);
    const { totalQuantity } = useCartTotals();
    const dispatch = useAppDispatch();
    const { status, data: session } = useSession({
        required: true,
        onUnauthenticated() {
            //handle unauthentication
        }
    });

    const toggleForm = () => {
        setIsSignupFormOpen(prevState => !prevState);
    }

    const signInHandler = async () => {
        try {
            await signIn();
        }
        catch (error) {
            console.log("signin error", error);
        }
    }
    console.log("session", session);
    return (
        <>
            <Signup isSignupFormOpen={isSignupFormOpen} toggleForm={toggleForm} />
            <header className={header}>
                <div className={container}>
                    <Link className={logoContainer} href="/">
                        <h1 className={logo}>Logo</h1>
                    </Link>
                    <nav className={nav}>
                        <ul className={ul}>
                            <li className={li}>
                                <button className={link} onClick={() => dispatch(toggleCart())}>
                                    <span>Cart
                                        <AiOutlineShoppingCart className="inline-block text-3xl" />
                                    </span>
                                    <div className={cart}>{totalQuantity}</div>
                                </button>
                            </li>
                            <li className="flex items-center justify-center h-7">
                                {session?.user && <>
                                    <Link className={orders} href="/orders">
                                        Orders
                                    </Link>
                                    <button className={logoutBtn} onClick={() => signOut()}>Logout</button>
                                </>}
                                {!session?.user && <>
                                    <button className={signupBtn} onClick={() => setIsSignupFormOpen(true)}>Sign Up</button>
                                    <button className={signinBtn} onClick={signInHandler}>Sign In
                                        <FcGoogle
                                            className={link}
                                            style={{
                                                fontSize: "25px",
                                                cursor: "pointer",
                                                marginLeft: "12px"
                                            }}
                                        />
                                    </button>
                                </>}

                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Header