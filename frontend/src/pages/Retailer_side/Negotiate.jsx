import React, { useState, useRef, useEffect } from 'react';
import { X, AlertCircle, Send, ShoppingCart, MessageSquare, Sparkles } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Negotiate = ({ onClose, productId, minimumPrice, initialPrice, productName, retailerId }) => {
  const navigate = useNavigate();
  const [finalprice, setFinalPrice] = useState(0);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: `Welcome! I see you're interested in the ${productName}. The current price is $${initialPrice} per unit. What's your budget and how many units would you like to purchase?`
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [negotiationState, setNegotiationState] = useState({
    budget: null,
    quantity: null,
    stage: 'initial', // initial, budget_set, quantity_set, negotiating, final
    isProcessing: false,
    dealAgreed: false,
    negotiationId: null,
    retailerResponse: null
  });
  const scrollAreaRef = useRef(null);
  const inputRef = useRef(null);
  const [checkRetailerInterval, setCheckRetailerInterval] = useState(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }

    // Focus input when chat opens
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages]);
  // Set up polling for retailer responses when we have a negotiation ID
  useEffect(() => {
    let interval;

    const startPolling = () => {
      if (!interval && negotiationState.negotiationId && negotiationState.stage === 'negotiating') {
        interval = setInterval(checkRetailerResponse, 5000);
        setCheckRetailerInterval(interval);
      }
    };

    startPolling();

    return () => {
      if (interval) {
        clearInterval(interval);
        setCheckRetailerInterval(null);
      }
    };
  }, [negotiationState.negotiationId, negotiationState.stage]);


  const checkRetailerResponse = async () => {
    if (!negotiationState.negotiationId) return;

    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/retailnego/retailer/negotiations/${negotiationState.negotiationId}`);
      const negotiation = response.data;
      console.log("negigoation", negotiation)
      // If retailer has responded and we haven't processed it yet
      if (negotiation.status !== 'active' && !negotiationState.retailerResponse) {
        if (negotiation.status === 'completed') {
          // Retailer accepted the offer
          setFinalPrice(negotiation.budget);
          setMessages(prev => [...prev, {
            type: 'bot',
            content: `Great news! The retailer has accepted your offer of $${negotiation.budget} for ${negotiationState.quantity} units of ${productName}.`,
            showPurchaseButton: true
          }]);

          setNegotiationState(prev => ({
            ...prev,
            stage: 'final',
            dealAgreed: true,
            retailerResponse: 'accepted'
          }));
        } else if (negotiation.status === 'counter-offered') {
          // Retailer made a counter offer
          const counterMessage = negotiation.retailerInput ||
            `I can offer you a price of $${negotiation.counterOffer} per unit instead. Would this work for you?`;

          setMessages(prev => [...prev, {
            type: 'bot',
            content: `The retailer has responded with a counter offer: ${counterMessage}`
          }]);

          setNegotiationState(prev => ({
            ...prev,
            retailerResponse: 'counter-offered',
            counterOffer: negotiation.counterOffer
          }));
        }

        // Clear the interval since we've processed the response
        if (checkRetailerInterval) {
          clearInterval(checkRetailerInterval);
          setCheckRetailerInterval(null);
        }
      }
    } catch (error) {
      console.error('Error checking retailer response:', error);
    }
  };

  const extractNumbers = (text) => {
    const numbers = text.match(/\d+/g);
    return numbers ? numbers.map(Number) : [];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || negotiationState.isProcessing) return;

    // Add user message
    const newMessages = [...messages, { type: 'user', content: inputMessage }];
    setMessages(newMessages);
    setInputMessage('');

    // Set processing state
    setNegotiationState(prev => ({ ...prev, isProcessing: true }));

    try {
      const numbers = extractNumbers(inputMessage);
      let { budget, quantity, stage, negotiationId, retailerResponse, counterOffer } = negotiationState;

      // If retailer has counter-offered and user is responding
      if (retailerResponse === 'counter-offered') {
        // Check if user accepts the counter offer
        if (inputMessage.toLowerCase().includes('yes') ||
          inputMessage.toLowerCase().includes('accept') ||
          inputMessage.toLowerCase().includes('agree') ||
          inputMessage.toLowerCase().includes('deal')) {

          // User accepts counter offer
          setMessages(prev => [...prev, {
            type: 'bot',
            content: `Excellent! You've accepted the retailer's counter offer of $${counterOffer} per unit for ${quantity} units of ${productName}. Would you like to proceed with the purchase?`,
            showPurchaseButton: true
          }]);

          setNegotiationState({
            budget: counterOffer * quantity,
            quantity,
            stage: 'final',
            isProcessing: false,
            dealAgreed: true,
            negotiationId,
            retailerResponse: 'accepted'
          });

          return;
        } else if (inputMessage.toLowerCase().includes('no') ||
          inputMessage.toLowerCase().includes('reject') ||
          inputMessage.toLowerCase().includes('decline')) {

          // User rejects counter offer, continue negotiation
          stage = 'negotiating';
          retailerResponse = null;
        }
      }

      // Process based on negotiation stage
      if (stage === 'initial') {
        // Try to extract both budget and quantity from initial message
        if (numbers.length >= 2) {
          // Assume larger number is budget, smaller is quantity
          const sortedNumbers = [...numbers].sort((a, b) => b - a);
          budget = sortedNumbers[0];
          quantity = sortedNumbers[1];
          stage = 'negotiating';
        }
        // If only one number, try to determine if it's budget or quantity
        else if (numbers.length === 1) {
          if (inputMessage.toLowerCase().includes('budget') ||
            inputMessage.toLowerCase().includes('afford') ||
            inputMessage.toLowerCase().includes('pay') ||
            inputMessage.toLowerCase().includes('$') ||
            inputMessage.toLowerCase().includes('dollar')) {
            budget = numbers[0];
            stage = 'budget_set';

            setMessages(prev => [...prev, {
              type: 'bot',
              content: `Thank you for sharing your budget of $${budget}. How many units of the ${productName} would you like to purchase?`
            }]);
          } else if (inputMessage.toLowerCase().includes('quantity') ||
            inputMessage.toLowerCase().includes('units') ||
            inputMessage.toLowerCase().includes('pieces')) {
            quantity = numbers[0];
            stage = 'quantity_set';

            setMessages(prev => [...prev, {
              type: 'bot',
              content: `Great! You're interested in ${quantity} units. What's your budget for this purchase?`
            }]);
          } else {
            // If unclear, assume it's budget
            budget = numbers[0];
            stage = 'budget_set';

            setMessages(prev => [...prev, {
              type: 'bot',
              content: `I understand your budget is $${budget}. How many units would you like to purchase?`
            }]);
          }
        } else {
          // No numbers found, ask for specific information
          setMessages(prev => [...prev, {
            type: 'bot',
            content: `I'd be happy to help you negotiate a price. Could you please tell me your budget and how many units you're interested in?`
          }]);
        }
      }
      else if (stage === 'budget_set') {
        if (numbers.length > 0) {
          quantity = numbers[0];
          stage = 'negotiating';
        } else {
          setMessages(prev => [...prev, {
            type: 'bot',
            content: `I need to know how many units you want to purchase. Please provide a quantity.`
          }]);
        }
      }
      else if (stage === 'quantity_set') {
        if (numbers.length > 0) {
          budget = numbers[0];
          stage = 'negotiating';
        } else {
          setMessages(prev => [...prev, {
            type: 'bot',
            content: `I need to know your budget for this purchase. Please provide an amount.`
          }]);
        }
      }

      // If we have both budget and quantity, start or continue negotiation
      if (stage === 'negotiating' && budget && quantity) {
        // Call the AI negotiation API
        const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/retailnego`, {
          productId,
          message: inputMessage,
          budget,
          quantity,
          productName,
          initialPrice,
          minimumPrice,
          retailerId,
          stage
        });

        // Store negotiation ID if provided
        if (response.data.negotiationId && !negotiationId) {
          negotiationId = response.data.negotiationId;

          // Add a message to inform the user that the retailer is being notified
          setMessages(prev => [...prev, {
            type: 'bot',
            content: `I'm connecting you with the retailer for this ${productName}. They'll be notified of your interest and may respond to your offer shortly.`,
            isNotification: true
          }]);
        }

        // Check if deal is agreed (simple heuristic - can be improved)
        const dealAgreed = response.data.message.toLowerCase().includes('deal') ||
          response.data.message.toLowerCase().includes('agreed') ||
          response.data.message.toLowerCase().includes('accept your offer') ||
          response.data.message.toLowerCase().includes('we can do that');

        setMessages(prev => [...prev, {
          type: 'bot',
          content: response.data.message
        }]);

        if (dealAgreed) {
          stage = 'final';

          // Add a final message with purchase option
          // setTimeout(() => {
          //   setMessages(prev => [...prev, {
          //     type: 'bot',
          //     content: `Great! We have a deal. Would you like to proceed with the purchase of ${quantity} units of ${productName} for a total of $${(budget).toFixed(2)}?`,
          //     showPurchaseButton: true
          //   }]);
          // }, 1000);
        }
      }

      setNegotiationState({
        budget,
        quantity,
        stage,
        isProcessing: false,
        dealAgreed: stage === 'final',
        negotiationId,
        retailerResponse,
        counterOffer
      });
    } catch (error) {
      console.error('Error in negotiation:', error);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'Sorry, there was an error processing your request. Please try again.'
      }]);
      setNegotiationState(prev => ({ ...prev, isProcessing: false }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePurchase = () => {

    alert(`We Are redirect to the payment form , Purchase confirmed! ${negotiationState.quantity} units of ${productName} for $${finalprice}`);
    navigate(`/payment?quantity=${negotiationState.quantity}&budget=${finalprice}`);
    onClose();
  };

  return (
    <div className="w-full max-w-5xl mx-auto h-full flex flex-col mt-10 mb-10 rounded-lg overflow-hidden bg-gray-900 text-black shadow-xl border border-gray-700">
      {/* Header with gradient */}
      <div className="bg-white py-4 px-5 border-b border-black">
        <div className="flex justify-between items-center">
          <div className="text-lg font-medium flex items-center">
            <div className="w-6 h-6 mr-2 rounded-full bg-white flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-black">Negotiating: {productName}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-700 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-black" />
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-grow p-5 overflow-hidden bg-white flex flex-col">
        {/* Scrollable Content */}
        <div
          ref={scrollAreaRef}
          className="flex-1 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
        >
          <div className="space-y-5">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-4 ${message.type === 'user'
                    ? 'bg-gray-100 text-black rounded-tr-none'
                    : message.isNotification
                      ? 'bg-white border border-black text-black'
                      : 'bg-black text-white rounded-tl-none'
                    }`}
                >
                  {message.isNotification && (
                    <div className="flex items-center mb-2 text-amber-300">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Retailer Notification</span>
                    </div>
                  )}

                  <div className="text-sm md:text-base">{message.content}</div>

                  {message.showPurchaseButton && (
                    <button
                      className="mt-3 w-full bg-green-600 text-white py-2 px-3 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
                      onClick={handlePurchase}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Complete Purchase
                    </button>
                  )}
                </div>
              </div>
            ))}

            {negotiationState.isProcessing && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-lg p-4 bg-white text-black">
                  <div className="flex space-x-2 items-center">
                    {[0, 150, 300].map((delay) => (
                      <div
                        key={delay}
                        className="w-2 h-2 rounded-full bg-white animate-bounce"
                        style={{ animationDelay: `${delay}ms` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer with input */}
      <div className="border-t border-black p-4 bg-white">
        <div className="flex w-full gap-2 items-center">
          <div className="relative flex-grow">
            <input
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your offer..."
              className="w-full px-4 py-3 bg-black border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-100 placeholder-gray-400"
              disabled={negotiationState.isProcessing || negotiationState.dealAgreed}
            />
            {negotiationState.dealAgreed && (
              <div className="absolute inset-0 bg-gray-800 bg-opacity-75 rounded-lg flex items-center justify-center text-sm text-gray-300">
                Negotiation completed
              </div>
            )}
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || negotiationState.isProcessing || negotiationState.dealAgreed}
            className="bg-black text-white p-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>

        {/* Negotiation tips */}
        {!negotiationState.dealAgreed && (
          <div className="mt-3 text-xs text-gray-400 flex items-start">
            <MessageSquare className="h-3 w-3 mr-1 mt-0.5" />
            <span>Tip: Be clear about your budget and requirements for effective negotiation</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Negotiate; 