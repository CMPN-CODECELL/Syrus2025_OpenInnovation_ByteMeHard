// import axios from "axios";
// import React, { useState } from "react";

// const SubsidyChatbot = () => {
//     const [message, setMessage] = useState("");
//     const [response, setResponse] = useState("");

//     const handleSend = async () => {
//         if (!message.trim()) return;

//         try {
//             const res = await axios.post(`${import.meta.env.VITE_BACKEND}/chat`, { message });
//             setResponse(res.data.reply);
//         } catch (error) {
//             console.error("Error sending message:", error.message);
//             setResponse("Error: Unable to connect to the chatbot.");
//         }
//     };

//     return (
//         <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//             <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
//                 <h1 className="text-3xl font-bold mb-6">Subsidy Chatbot</h1>

//                 <div className="mb-4">
//                     <textarea
//                         className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         rows="4"
//                         placeholder="Ask about subsidies or tax filing..."
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                     />
//                 </div>

//                 <button
//                     onClick={handleSend}
//                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition"
//                 >
//                     Send
//                 </button>

//                 {response && (
//                     <div className="mt-6 p-4 bg-gray-50 border rounded-lg">
//                         <h2 className="text-xl font-semibold mb-2">Response:</h2>
//                         <p>{response}</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default SubsidyChatbot;


import axios from "axios";
import React, { useState } from "react";

const SubsidyChatbot = () => {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");

    const handleSend = async () => {
        if (!message.trim()) return;

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND}/chat`, { message });
            setResponse(res.data.reply);
        } catch (error) {
            console.error("Error sending message:", error.message);
            setResponse("Error: Unable to connect to the chatbot.");
        }
    };

    const formatResponse = (text) => {
        return text.split("\n").map((line, index) => (
            <p key={index} className="mb-2">{line}</p>
        ));
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold mb-6">Subsidy & Tax Chatbot</h1>

                <div className="mb-4">
                    <textarea
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        rows="4"
                        placeholder="Ask about subsidies or tax filing..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>

                <button
                    onClick={handleSend}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition"
                >
                    Send
                </button>

                {response && (
                    <div className="mt-6 p-4 bg-gray-50 border rounded-lg">
                        <h2 className="text-xl font-semibold mb-2">Response:</h2>
                        <div>{formatResponse(response)}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubsidyChatbot;
