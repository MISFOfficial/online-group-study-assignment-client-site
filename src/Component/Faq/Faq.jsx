import React, { use } from 'react';
import { AuthContext } from '../../Auth/AuthContext';
import Lottie from 'lottie-react';
import FAQ from './faq.json'

const faq = [
    {
        question: "How do I create an account?",
        answer: 'Click the "Sign Up" button in the top right corner and follow the registration process.'
    },
    {
        question: "I forgot my password. What should I do?",
        answer: 'Click on "Forgot Password" on the login page and follow the instructions sent to your email.'
    },
    {
        question: "How do I update my profile information?",
        answer: 'Go to "My Account" settings and select "Edit Profile" to make changes.'
    }
];

const Faq = () => {
    const { theme } = use(AuthContext)
    return (
        <div data-theme={`${theme ? 'dark' : ''}`} className={`lg:px-30 py-3 md:py-20 ${theme ? 'dark-theme' : ''}`}>
            <h1 className='primary-text font-extrabold text-md md:text-3xl lg:text-5xl text-center mb-10'>Frequantly Ask and Question</h1>
            <div className='flex flex-col gap-10 justify-center items-center'>
                <div className='justify-items-center '>
                    <Lottie className='lg:w-50 mt-5'
                        animationData={FAQ}
                    ></Lottie>
                </div>
                <div className="join join-vertical  md:px-20 lg:px-30 text-[13px] md:text-[18px] w-full">
                    {faq.map((faq, i) => (
                        <div
                            key={i}
                            className="collapse collapse-arrow join-item border-base-300 border-y"
                        >
                            <input type="radio" name="my-accordion-4" />
                            <div className="collapse-title font-semibold">{faq.question}</div>
                            <div className="collapse-content">{faq.answer}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faq;