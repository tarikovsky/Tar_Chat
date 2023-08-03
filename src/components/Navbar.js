import React, { useContext } from 'react'
import { Context } from '..';
import { useAuthState } from 'react-firebase-hooks/auth';

export const Navbar = () => {
    const { auth } = useContext(Context)
    const [user] = useAuthState(auth);
    return (
        <header>
            <div className='navLeft'>
                <img className='littleLogo' src='/img/logo3.svg' alt='Logo' />
                <img className='bigLogo' src='/img/logo.svg' alt='Logo' />
            </div>
            <div className='navRight'>
                {user
                    &&
                    <>
                        <img src={user.photoURL} alt='profile' />
                        <button onClick={()=>auth.signOut()}>Выйти</button>
                    </>}
            </div>
        </header>
    )
}

export default Navbar;