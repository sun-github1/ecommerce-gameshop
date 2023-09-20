import Link from "next/link";
import headerClassNames from "./headerClassNames";
import { AiOutlineShoppingCart } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"

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

    return (
        <header className={header}>
            <div className={container}>
                <Link className={logoContainer} href="/">
                    <h1 className={logo}>Logo</h1>
                </Link>
                <nav className={nav}>
                    <ul className={ul}>
                        <li className={li}>
                            <button className={link}>
                                <span>Cart
                                    <AiOutlineShoppingCart className="inline-block text-3xl" />
                                </span>
                                <div className={cart}>10</div>
                            </button>
                        </li>
                        <li className="flex items-center justify-center h-7">
                            <Link className={orders} href="/orders">
                                Orders
                            </Link>
                            <button className={logoutBtn}>Logout</button>
                            <button className={signupBtn}>Sign Up</button>
                            <button className={signinBtn}>Sign In
                                <FcGoogle
                                    className={link}
                                    style={{
                                        fontSize: "25px",
                                        cursor: "pointer",
                                        marginLeft: "12px"
                                    }}
                                />
                            </button>

                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header