import { Crypto } from '../Types';
import { useState, useEffect } from 'react';

export type AppProps = {
    crypto: Crypto;
    updateOwned: (crypto: Crypto, amount: number) => void;
    onRemove?: () => void;
};

export default function CryptoSummary({
    crypto,
    updateOwned,
    onRemove,
}: AppProps): JSX.Element {
    const [amount, setAmount] = useState<number>(0);
    
    useEffect(() => {
        console.log(crypto.name, amount, crypto.current_price * amount);
    }, [crypto.name, amount, crypto.current_price]);

    const totalValue = isNaN(amount) || amount === 0 
        ? 0 
        : crypto.current_price * amount;

    return (
        <div className="group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden">
            {/* Decorative gradient overlay */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            
            {/* Remove button */}
            {onRemove && (
                <button
                    onClick={onRemove}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 transform hover:scale-110"
                    aria-label="Remove cryptocurrency"
                >
                    <span className="text-lg">×</span>
                </button>
            )}

            {/* Header */}
            <div className="flex items-start justify-between mb-6 relative z-10">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-2xl">
                                {crypto.symbol === 'btc' ? '₿' : 
                                 crypto.symbol === 'eth' ? 'Ξ' : 
                                 crypto.symbol === 'usdt' ? '₮' : '💎'}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                {crypto.name}
                            </h3>
                            <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                                {crypto.symbol}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                        ${crypto.current_price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Current Price
                    </p>
                </div>
            </div>
            
            {/* Input Section */}
            <div className="mb-6 relative z-10">
                <label 
                    htmlFor={`amount-${crypto.id}`} 
                    className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3"
                >
                    Amount Owned
                </label>
                <div className="relative">
                    <input
                        id={`amount-${crypto.id}`}
                        type="number"
                        min="0"
                        step="0.00000001"
                        value={amount || ''}
                        onChange={(e) => {
                            const value = parseFloat(e.target.value) || 0;
                            setAmount(value);
                            updateOwned(crypto, value);
                        }}
                        className="w-full px-4 py-3.5 text-base border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md"
                        placeholder="0.00000000"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase">
                        {crypto.symbol}
                    </div>
                </div>
            </div>
            
            {/* Value Display */}
            <div className="pt-6 border-t-2 border-slate-200 dark:border-slate-700 relative z-10">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                            Portfolio Value
                        </p>
                        <p className={`text-3xl font-extrabold transition-colors duration-300 ${
                            totalValue > 0 
                                ? 'text-green-600 dark:text-green-400' 
                                : 'text-slate-400 dark:text-slate-500'
                        }`}>
                            ${totalValue.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </p>
                    </div>
                    {totalValue > 0 && (
                        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <span className="text-3xl">💵</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
