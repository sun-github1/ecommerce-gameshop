"use client";

import { SessionProvider } from "next-auth/react";

interface NextAuthProviderProps {
    children: React.ReactNode;
}

// export const NextAuthProvider = (props: NextAuthProviderProps) => {
//     const { children } = props;

//     return (
//         <SessionProvider>
//             {children}
//         </SessionProvider>
//     )
// }

type Props = {
    children: React.ReactNode;
}

export const NextAuthProvider = ({ children }: Props) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

