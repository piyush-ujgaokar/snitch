import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router';
import { useCart } from '../hooks/useCart';

const OrderSuccess = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get('order_id');

    const [isVisible, setIsVisible] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { handleGetPaymentDetails } = useCart();

    useEffect(() => {
        setIsVisible(true);
        if (orderId) {
            handleGetPaymentDetails(orderId)
                .then(data => {
                    setOrderDetails(data);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch order", err);
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }, [orderId]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center">
                <p className="text-sm font-bold tracking-widest text-[#1b1b1b] uppercase" style={{ fontFamily: '"Epilogue", sans-serif' }}>
                    Loading Order Details...
                </p>
            </div>
        );
    }

    if (!orderDetails) {
        return (
            <div className="min-h-screen bg-[#f9f9f9] flex flex-col items-center justify-center space-y-6">
                <p className="text-sm font-bold tracking-widest text-[#1b1b1b] uppercase" style={{ fontFamily: '"Epilogue", sans-serif' }}>
                    Order Not Found
                </p>
                <Link to="/" className="text-xs font-bold tracking-widest border-b border-black text-black uppercase pb-1 hover:text-[#777777] hover:border-[#777777] transition-colors">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    const { orderItems, price, user } = orderDetails;
    const subtotal = price?.amount || 0;
    const currency = price?.currency || "INR";

    return (
        <div className="min-h-screen bg-[#f9f9f9] text-[#1b1b1b] font-sans pt-24 pb-12 px-4 sm:px-6 lg:px-8 selection:bg-black selection:text-white flex flex-col items-center">
            {/* Main Container */}
            <div 
                className={`w-full max-w-2xl flex flex-col items-center transition-all duration-700 ease-out transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
                {/* Header Section */}
                <div className="text-center mb-16 w-full">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-widest uppercase mb-4 text-black" style={{ fontFamily: '"Epilogue", sans-serif' }}>
                        Order Confirmed
                    </h1>
                    <p className="text-lg text-[#474747] tracking-wider uppercase" style={{ fontFamily: '"Manrope", sans-serif' }}>
                        Thank you for your purchase.
                    </p>
                </div>

                {/* Details Card - No Borders, Shadow via background contrast */}
                <div className="w-full bg-white p-8 md:p-12 mb-12 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
                    
                    {/* Order Number */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-[#f3f3f3] pb-8">
                        <div>
                            <p className="text-xs text-[#777777] uppercase tracking-widest mb-1">Order Number</p>
                            <p className="text-xl font-medium tracking-wider">{orderId}</p>
                        </div>
                        <div className="mt-4 md:mt-0 text-left md:text-right">
                            <p className="text-xs text-[#777777] uppercase tracking-widest mb-1">Date</p>
                            <p className="text-base font-medium tracking-wide">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                    </div>

                    {/* Items Summary */}
                    <div className="mb-12">
                        <h2 className="text-sm uppercase tracking-widest text-[#474747] mb-6">Items Ordered</h2>
                        <div className="space-y-6">
                            {orderItems && orderItems.map((item, idx) => {
                                const prod = item.product;
                                const imgUrl = prod.images && prod.images.length > 0 ? prod.images[0].url : '/placeholder.png';
                                return (
                                    <div key={idx} className="flex items-center space-x-6 hover:bg-[#f9f9f9] transition-colors duration-300 p-2 -mx-2">
                                        <div className="w-20 h-24 bg-[#f3f3f3] flex-shrink-0 flex items-center justify-center overflow-hidden">
                                            <img src={imgUrl} alt={prod.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-base font-medium uppercase tracking-wide">{prod.title}</h3>
                                            {prod.attributes && Object.keys(prod.attributes).length > 0 && (
                                                <p className="text-sm text-[#777777] mt-1">
                                                    {Object.entries(prod.attributes).map(([k, v]) => `${k}: ${v}`).join(' | ')}
                                                </p>
                                            )}
                                            <p className="text-sm text-[#777777] mt-1">Qty: {prod.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-base font-medium">{prod.price?.currency || 'INR'} {prod.price?.amount?.toLocaleString('en-IN')}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-[#f3f3f3] pt-8">
                        {/* Shipping */}
                        <div>
                            <h2 className="text-sm uppercase tracking-widest text-[#474747] mb-4">Shipping To</h2>
                            <div className="text-base leading-relaxed text-[#1b1b1b]">
                                <p className="font-medium uppercase tracking-wider">{user?.fullname}</p>
                                <p>{user?.email}</p>
                                <p>{user?.contact}</p>
                            </div>
                        </div>

                        {/* Totals */}
                        <div>
                            <h2 className="text-sm uppercase tracking-widest text-[#474747] mb-4">Order Summary</h2>
                            <div className="space-y-3 text-base">
                                <div className="flex justify-between">
                                    <span className="text-[#474747]">Subtotal</span>
                                    <span>{currency} {subtotal.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#474747]">Delivery</span>
                                    <span className="uppercase text-xs tracking-widest mt-1">Free</span>
                                </div>
                                <div className="flex justify-between pt-4 mt-2 border-t border-[#f3f3f3] font-medium text-lg">
                                    <span>Total</span>
                                    <span>{currency} {subtotal.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
                    <Link 
                        to="/"
                        className="w-full sm:w-auto bg-black text-white px-10 py-4 uppercase tracking-widest text-sm font-medium hover:bg-[#5e5e5e] transition-colors duration-300 text-center"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;