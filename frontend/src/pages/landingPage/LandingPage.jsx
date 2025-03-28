import React from 'react';
import Squares from './SquaresBg';
import RotatingText from './RotatingText';
import SwipeCards from './SwipeCards';
import SpotlightCard from './SpotlightCard';
import SubscriptionSection from './SubscriptionSection';
import Navbar from './Navbar';
import CircularText from './CircularText';
import Footer from './Footer';
import ScrollVelocity from './ScrollVelocity';

function LandingPage() {
    return (
        <>
            <Navbar />
            <div className="relative w-full h-screen flex items-center justify-center bg-black">
                {/* Background Squares */}
                <Squares
                    speed={0.5}
                    squareSize={40}
                    direction="diagonal" // up, down, left, right, diagonal
                    borderColor="rgb(34, 34, 34)"
                    hoverFillColor="rgb(34, 34, 34)"
                    className="absolute inset-0"
                />

                {/* Content Wrapper */}
                <div className="relative flex items-center space-x-3">
                    {/* "NIRMAN" - Bold White Text */}
                    <h1 className="text-white font-extrabold text-9xl">NIRMAN</h1>

                    {/* Rotating Text - Inside Rounded Blue Background */}
                    <div className="bg-cyan-400 px-4 py-2 rounded-lg">
                        <RotatingText
                            texts={['BUY', 'BUILD', 'SELL']}
                            mainClassName="text-black text-9xl font-bold"
                            staggerFrom={"last"}
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-120%" }}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden"
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            rotationInterval={2000}
                        />
                    </div>
                </div>
            </div>

            {/* ------------------------------swipe cards----------------------------------------------------- */}
            <div className="relative w-full h-screen flex flex-col items-center justify-center bg-black">
                {/* Background Squares */}
                <Squares
                    speed={0.5}
                    squareSize={40}
                    direction="diagonal"
                    borderColor="rgb(34, 34, 34)"
                    hoverFillColor="rgb(34, 34, 34)"
                    className="absolute inset-0"
                />

                {/* Headings and Paragraphs Above Swipe Cards */}
                <div className="relative text-center text-white z-10 mb-12">
                    <h1 className="text-6xl mb-8">How It Works</h1>
                    <p className="text-lg">Convenient Streamlined Process</p>
                    <p className="text-lg">Experience a seamless and efficient process designed to </p>
                    <p className="text-lg mb-6">make your life easier</p>
                </div>

                {/* Swipe Cards Below */}
                <div className="relative w-full max-w-screen-lg mx-auto px-0">
                    <SwipeCards />
                </div>
            </div>

            {/* ----------------------------------------------------------------------------------------------- */}

            <div className="relative w-full h-screen flex items-center justify-center bg-black">
                {/* Background Squares */}
                <Squares
                    speed={0.5}
                    squareSize={40}
                    direction="diagonal" // up, down, left, right, diagonal
                    borderColor="rgb(34, 34, 34)"
                    hoverFillColor="rgb(34, 34, 34)"
                    className="absolute inset-0"
                />
                <div className="relative flex flex-col items-center space-y-6 mt-12">
                    <h1 className="text-white text-4xl mb-12 mt-10">What We Offer</h1>
                    <SubscriptionSection />
                </div>
            </div>
            {/* -------------------------------------------------------------------------------------- */}
            <div>
            <Footer />
                {/* <ScrollVelocity
                    texts={['React Bits', 'Scroll Down']}
                    velocity={100}
                    className="custom-scroll-text"
                /> */}
            </div>
            
        </>
    );
}

export default LandingPage;
