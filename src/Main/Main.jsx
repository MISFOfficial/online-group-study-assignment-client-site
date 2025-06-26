import React, { use } from 'react';
import Navigation from '../Component/Navigation/Navigation';
import { Outlet } from 'react-router';
import Footer from '../Component/Footer/Footer';
import { AuthContext } from '../Auth/AuthContext';
import Loader from '../PrivetRout/loader/Loader';

const Main = () => {

    const { loader } = use(AuthContext)

    if (loader) {
        return <Loader></Loader>
    }

    return (
        <div className='min-h-screen flex flex-col'>
            <Navigation></Navigation>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;