import {useEffect, useState} from 'react';
import {mergeClassName} from '../utils.ts';
import {Link, useLocation} from 'react-router-dom';
import Container from '../components/Container.tsx';
import useAuth from '../hooks/useAuth.tsx';
import {IoMdPerson} from 'react-icons/io';

const MENU_CLASS = "py-1 px-1.5 hover:bg-primary rounded-md mobile:px-6"

const MENU_CLASS_ACTIVE = "bg-primary"

function Header() {
    const [pathname, setPathname] = useState("")
    const location = useLocation()
    const {auth, setAuth} = useAuth()
    let username = auth?.name;
    if (username?.includes(" ")) {
        username = username.split(" ")[0];
    }

    const getMenuClass = (path: string) => {
        if (path === pathname) {
            return mergeClassName(MENU_CLASS, MENU_CLASS_ACTIVE)
        }
        return mergeClassName(MENU_CLASS, "")
    }

    useEffect(() => {
        setPathname(location.pathname)
    }, [location.pathname])

    return (
        <header className="bg-header sticky top-0 z-[99]">
            <Container className="flex items-center gap-5">
                <div className="flex items-center gap-6 justify-between grow">
                    <h1 className="text-2xl font-semibold">
                        <Link to={"/"}>GameVault</Link>
                    </h1>
                    <div
                        className="pt-1.5 flex items-center gap-3 mobile:fixed mobile:bottom-0 mobile:right-0 mobile:left-0 mobile:justify-center mobile:py-3 mobile:header mobile:gap-6">
                        {auth?.id ? (
                            <>
                                <Link className={getMenuClass("/my-bets")} to={"/my-bets"}>
                                    My Bets
                                </Link>
                                <Link className={getMenuClass("/my-transactions")} to={"/my-transactions"}>
                                    My Transactions
                                </Link>
                                <Link
                                    className={getMenuClass("/logout")}
                                    onClick={() => setAuth(undefined)}
                                    to={"/"}>
                                    Logout
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link className={getMenuClass("/login")} to={"/login"}>
                                    Login
                                </Link>
                                <Link className={getMenuClass("/register")} to={"/register"}>
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                    {auth?.id && (
                        <div className="pt-1.5">
                            <Link to={"/profile"} className="flex gap-2 items-center w-full">
                                <span className="whitespace-nowrap">Hello, {username}</span>
                                <IoMdPerson size={24}/>
                                {auth.balance}&#8364;
                            </Link>
                        </div>
                    )}
                </div>
            </Container>
        </header>
    );
}

export default Header;