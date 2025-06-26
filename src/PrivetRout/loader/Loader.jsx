import Lottie from 'lottie-react';
import React from 'react';
import Loading from './loader.json'

const Loader = () => {
    return (
        <div className='h-screen flex items-center justify-center'>
            <Lottie className="h-50 md:h-90 lg:h-100"
                animationData={Loading}
            ></Lottie>
        </div>
    );
};

export default Loader;