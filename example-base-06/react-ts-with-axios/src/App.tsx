import axios from 'axios';
import { useEffect, useState } from 'react';
import CryptoSummary from './components/CryptoSummary';
import { Crypto } from './Types';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import moment from 'moment';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function App() {
    const [cryptos, setCryptos] = useState<Crypto[] | null>(null);
    const [selected, setSelected] = useState<Crypto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    /*
    const [data, setData] = useState<ChartData<'line'>>();
    const [options, setOptions] = useState<ChartOptions<'line'>>({
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    });
    */

    useEffect(() => {
        const url =
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
        setLoading(true);
        axios.get(url)
            .then((response) => {
                setCryptos(response.data);
            })
            .catch((error) => {
                console.error('Error fetching cryptos:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    /*
    useEffect(() => {
        if (!selected) return;
        axios
            .get(
                `https://api.coingecko.com/api/v3/coins/${
                    selected?.id
                }/market_chart?vs_currency=usd&days=${range}&${
                    range === 1 ? 'interval=hourly' : `interval=daily`
                }`
            )
            .then((response) => {
                console.log(response.data);
                setData({
                    labels: response.data.prices.map((price: number[]) => {
                        return moment
                            .unix(price[0] / 1000)
                            .format(range === 1 ? 'HH:MM' : 'MM-DD');
                    }),
                    datasets: [
                        {
                            label: 'Dataset 1',
                            data: response.data.prices.map(
                                (price: number[]) => {
                                    return price[1].toFixed(2);
                                }
                            ),
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                    ],
                });
                setOptions({
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        title: {
                            display: true,
                            text:
                                `${selected?.name} Price Over Last ` +
                                range +
                                (range === 1 ? ' Day.' : ' Days.'),
                        },
                    },
                });
            });
    }, [selected, range]);
    */

    useEffect(() => {
        console.log('SELECTED:', selected);
    }, [selected]);

    function updateOwned(crypto: Crypto, amount: number): void {
        console.log('updatwOwned', crypto, amount);
        let temp = [...selected];
        let tempObj = temp.find((c) => c.id === crypto.id);
        if (tempObj) {
            tempObj.owned = amount;
            setSelected(temp);
        }
    }

    function removeCrypto(id: string): void {
        setSelected(selected.filter(c => c.id !== id));
    }

    const totalPortfolioValue = selected
        .map((s) => {
            if (isNaN(s.owned)) {
                return 0;
            }
            return s.current_price * s.owned;
        })
        .reduce((prev, current) => {
            return prev + current;
        }, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950">
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
                        <span className="text-4xl">💰</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4">
                        Cryptocurrency Portfolio
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Track your crypto investments in real-time with live market prices
                    </p>
                </div>

                {/* Add Crypto Section */}
                <div className="mb-8 animate-slide-up">
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-6">
                        <label htmlFor="crypto-select" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                            <span className="text-xl">➕</span>
                            Add Cryptocurrency to Portfolio
                        </label>
                        <div className="flex gap-3">
                            <select
                                id="crypto-select"
                                onChange={(e) => {
                                    const c = cryptos?.find(
                                        (x) => x.id === e.target.value
                                    ) as Crypto;
                                    if (c && !selected.find(s => s.id === c.id)) {
                                        setSelected([...selected, c]);
                                        e.target.value = 'default';
                                    }
                                }}
                                defaultValue="default"
                                disabled={loading}
                                className="flex-1 px-5 py-3.5 text-base border-2 border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <option value="default">
                                    {loading ? 'Loading cryptocurrencies...' : 'Choose a cryptocurrency...'}
                                </option>
                                {cryptos
                                    ? cryptos.map((crypto) => {
                                          return (
                                              <option key={crypto.id} value={crypto.id}>
                                                  {crypto.name} ({crypto.symbol.toUpperCase()})
                                              </option>
                                          );
                                      })
                                    : null}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-indigo-200 dark:border-indigo-800 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl">💎</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!loading && selected.length === 0 && (
                    <div className="text-center py-20 animate-fade-in">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-3xl mb-6">
                            <span className="text-5xl">📊</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">
                            Your portfolio is empty
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-6">
                            Add cryptocurrencies above to start tracking your investments
                        </p>
                    </div>
                )}

                {/* Crypto Cards Grid */}
                {selected.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {selected.map((s, index) => {
                            return (
                                <div key={s.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                                    <CryptoSummary 
                                        crypto={s} 
                                        updateOwned={updateOwned}
                                        onRemove={() => removeCrypto(s.id)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Portfolio Summary */}
                {selected.length > 0 && (
                    <div className="animate-slide-up">
                        <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl p-8 text-white transform hover:scale-[1.02] transition-transform duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                                        <span>💼</span>
                                        Total Portfolio Value
                                    </h2>
                                    <p className="text-indigo-100 text-sm">
                                        {selected.length} {selected.length === 1 ? 'asset' : 'assets'} in portfolio
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl">
                                        <span className="text-3xl">📈</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-5xl md:text-6xl font-extrabold mb-2">
                                ${totalPortfolioValue.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </p>
                            <p className="text-indigo-100 text-sm">
                                Based on current market prices
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
