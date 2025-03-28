// import { useRef } from "react";
// import "./SpotlightCard.css";

// const SpotlightCard = ({
//   title,
//   features = [],
//   className = "",
//   spotlightColor = "rgba(255, 255, 255, 0.25)",
// }) => {
//   const divRef = useRef(null);

//   const handleMouseMove = (e) => {
//     const rect = divRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     divRef.current.style.setProperty("--mouse-x", `${x}px`);
//     divRef.current.style.setProperty("--mouse-y", `${y}px`);
//     divRef.current.style.setProperty("--spotlight-color", spotlightColor);
//   };

//   return (
//     <div
//       ref={divRef}
//       onMouseMove={handleMouseMove}
//       className={`card-spotlight w-72 h-80 bg-gray-800 p-6 rounded-lg flex flex-col justify-between shadow-lg ${className}`}
//     >
//       {/* Bold Plan Name */}
//       <h2 className="text-xl font-bold text-white text-center">{title}</h2>

//       {/* Features List */}
//       <ul className="text-gray-300 space-y-2 text-center">
//         {features.map((feature, index) => (
//           <li key={index}>✅ {feature}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SpotlightCard;

import { useRef } from "react";
import "./SpotlightCard.css";

const SpotlightCard = ({
  title,
  features = [],
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
}) => {
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
    divRef.current.style.setProperty("--spotlight-color", spotlightColor);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`card-spotlight w-72 h-96 bg-gray-800 p-6 rounded-lg flex flex-col justify-between shadow-lg ${className}`}
    >
      {/* Bold Plan Name */}
      <h2 className="text-xl font-bold text-white text-center mb-8">{title}</h2>
      {/* <h1 className="text-xl font-bold text-white text-center mb-8">{price}</h1> */}

      {/* Features List (Aligned Left) */}
      <ul className="text-gray-300 space-y-2 text-left pl-4 list-disc flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            ✅ <span className="ml-2">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Subscribe Button */}
      <button className="bg-gray-700 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mt-4 w-full">
        Subscribe
      </button>
    </div>
  );
};

export default SpotlightCard;
