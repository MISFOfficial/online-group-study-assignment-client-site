import React, { use } from 'react';
import Navigation from '../Component/Navigation/Navigation';
import Banner from '../Component/Banner/Banner';
import Faq from '../Component/Faq/Faq';
import GetApp from '../Component/GetApp/GetApp';
import Footer from '../Component/Footer/Footer';
import Loader from '../PrivetRout/loader/Loader';
import { AuthContext } from '../Auth/AuthContext';
import Feature from '../Component/Feature/Feature';
import HomeCard from '../Component/HomeCard/HomeCard';

const Home = () => {
    const {loader}=use(AuthContext)
    if(loader){
        return <Loader></Loader>
    }
    return (
        <div>
            <title>
                Group study
            </title>
            <Banner></Banner>
            <Feature></Feature>
            <HomeCard></HomeCard>
            <Faq></Faq>
            <GetApp></GetApp>
        </div>
    );
};

export default Home;