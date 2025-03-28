// import React, { useState } from "react";
// import { color, motion } from "framer-motion";
// import { useNavigate } from "react-router-dom"; 
// import "./SwipeCards.css"; // Importing external CSS

// import scanhome from './images/scanhome.png';
// import diet from './images/diet.png';
// import rating from './images/rating.png';
// import analysis from './images/analysis.png';

// const cardData = [
//     {
//       title: "Scan a Product",
//       description: "Analyze food labels and detect misleading claims.",
//       buttonText: "Scan Now",
//       color: "#373640",
//       image: scanhome,
//       path: "./details" 
//     },
//     {
//       title: "Check Monthly Diet",
//       description: "Get insights on your diet and track nutritional intake.",
//       buttonText: "Check Now",
//       color: "#474a56",
//       image: diet,
//       path: "./monthlydiet"
//     },
//     {
//       title: "Peer Reviews",
//       description: "Get peer reviews about the products you consume.",
//       buttonText: "Review Now",
//       color: "#929aab",
//       image: rating,
//       path: "./chat"
//     },
//   ];

// const SwipeCards = () => {
//   const [selected, setSelected] = useState(null);
//   const navigate = useNavigate();
//   return (
//     <div className="container">
//       <div className="card-row">

//          {cardData.map((card, index) => (
//           <motion.div
//             key={index}
//             className="card"
//             style={{ backgroundColor: card.color }}
//             initial={{ width: 500 }}
//             animate={{
//               width: selected === index ? 600 : selected === null ? 500 : 440,
//             }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//             onMouseEnter={() => setSelected(index)}
//             onMouseLeave={() => setSelected(null)}
//             onClick={() => setSelected(index)}
//           >
//             <h2>{card.title}</h2>
//             <p>{card.description}</p>
//             <button style={{ width: 120, height: 40, margin: 20 , borderRadius: 10,  backgroundColor: "#fff", color: "#000", fontSize: 16, fontWeight: "bold" }} onClick={(e) => {
//                 e.stopPropagation(); // Prevent parent div click event
//                 navigate(card.path); // Navigate to the specified path
//               }}>{card.buttonText}</button>
//             <img style={{ width: 200, height: 200, margin: 20 }} src={card.image} alt="card" />
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SwipeCards;







import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./SwipeCards.css";

import scanhome from "./images/raw.png";
import diet from "./images/sell.png";
import rating from "./images/sheet.png";

const cardData = [
  {
    title: "Choose Your Producers",
    description: "Browse our extensive catalog to find the perfect material for your product. ",
    buttonText: "Ckeck Now",
    color: "#373640",
    image: scanhome,
    path: "./details",
  },
  {
    title: "Sell Your Products",
    description: "Select a price range, product and quantity that fits your business.",
    buttonText: "Check Now",
    color: "#474a56",
    image: diet,
    path: "./monthlydiet",
  },
  {
    title: "Track Your Business",
    description: "Real-time financial tracking, expense analysis, and profitability insights for better decision-making..",
    buttonText: "Check Now",
    color: "#929aab",
    image: rating,
    path: "./chat",
  },
];

const SwipeCards = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="card-row">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            className="card p-6 flex flex-col items-center justify-center rounded-lg"
            style={{ backgroundColor: card.color }}
            initial={{ width: 500 }}
            animate={{
              width: selected === index ? 600 : selected === null ? 500 : 440,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onMouseEnter={() => setSelected(index)}
            onMouseLeave={() => setSelected(null)}
            onClick={() => setSelected(index)}
          >
            {/* Title - Bold & White */}
            <h2 className="text-white font-extrabold text-2xl mb-6 text-center">
              {card.title}
            </h2>

            {/* Description - Centered */}
            <p className="text-gray-300 text-center mb-4">{card.description}</p>

            {/* Button */}
            <button
              className="px-4 py-2 rounded-lg bg-white text-black font-bold text-lg mb-8 mt-2"
              onClick={(e) => {
                e.stopPropagation();
                navigate(card.path);
              }}
            >
              {card.buttonText}
            </button>

            {/* Image */}
            <img className="w-40 h-40 mt-2" src={card.image} alt="card" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SwipeCards;
