import React from 'react';
import PageNotFoundAnimation from '../../assets/json/pageNotFoundAnimation.json';
import Lottie from 'lottie-react';


const PageNotFound = () => {
    return (
        <div className='w-2/4 mx-auto h-40'>
            <Lottie animationData={PageNotFoundAnimation} />
        </div>
    );
};

export default PageNotFound;