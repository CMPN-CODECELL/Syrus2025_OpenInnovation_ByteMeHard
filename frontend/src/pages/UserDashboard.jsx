import React, { useEffect, useState } from "react";
import axios from "axios";
import ChatBot from "./ChatBot";

const UserDashboard = () => {
    const [showChat, setShowChat] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);

    const handleNegotiate = (product) => {
        console.log(product.manufacturer._id)
        setSelectedProduct(product);
        setShowChat(true);
    };

    const fetchProducts = async () => {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND}/get-producer-negogiation`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
        console.log("dataa", response.data);
        setProducts(response.data);
    };
    useEffect(() => {
        fetchProducts();
    }, []);


 

    return (
        <div className="mx-auto p-6 w-screen bg-white">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Available Products</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
                    >
                        <div className="p-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                        </div>
                        <div className="p-4 space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-700">Price:</span>
                                <span className="text-gray-900">${product.max_price}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-700">Available Quantity:</span>
                                <span className="text-gray-900">{product.quantity} units</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-700">Manufacturer:</span>
                                <span className="text-gray-900">{product.manufacturer?.name || "N/A"}</span>
                            </div>
                            <div className="mt-2">
                                <p className="text-sm text-gray-600">
                                    {product.description}
                                </p>
                            </div>
                            <div className="mt-4">
                                <button
                                    className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
                                    onClick={() => handleNegotiate(product)}
                                >
                                    Negotiate Price
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* AI Chatbot */}
            {showChat && selectedProduct && (
                <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-lg shadow-xl">
                    <ChatBot
                        onClose={() => {
                            setShowChat(false);
                            setSelectedProduct(null);
                        }}
                        productId={selectedProduct._id}
                        initialPrice={selectedProduct.max_price}
                        minimumPrice={selectedProduct.min_price}
                        productName={selectedProduct.name}
                        retailerId={selectedProduct.manufacturer?._id || "1"}
                    />
                </div>
            )}
        </div>
    );
};

export default UserDashboard;