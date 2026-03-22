'use client';

import { useState } from 'react';

interface PriceFeed {
  symbol: string;
  address: string;
  price: number;
  confidence: string;
  staleness: string;
  lastUpdate: string;
  oracles: string[];
}

interface OracleNode {
  name: string;
  provider: string;
  address: string;
  data: number;
  reliability: number;
}

const priceFeeds: PriceFeed[] = [
  {
    symbol: 'ETH/USD',
    address: '0x5f4...9c7e',
    price: 3452.67,
    confidence: '99.9%',
    staleness: '0s',
    lastUpdate: '2026-03-21 14:30',
    oracles: ['Chainlink', 'Band Protocol', 'DIA'],
  },
  {
    symbol: 'BTC/USD',
    address: '0x1b4...3e43',
    price: 67823.45,
    confidence: '99.95%',
    staleness: '2s',
    lastUpdate: '2026-03-21 14:32',
    oracles: ['Chainlink', 'Pyth', 'Redstone'],
  },
  {
    symbol: 'LINK/USD',
    address: '0x8a3...5d2e',
    price: 8.47,
    confidence: '99.8%',
    staleness: '1s',
    lastUpdate: '2026-03-21 14:31',
    oracles: ['Chainlink', 'Band Protocol'],
  },
  {
    symbol: 'SOL/USD',
    address: '0x3c2...8f7a',
    price: 145.23,
    confidence: '99.7%',
    staleness: '3s',
    lastUpdate: '2026-03-21 14:29',
    oracles: ['Chainlink', 'Band Protocol', 'UMA'],
  },
  {
    symbol: 'ARB/USD',
    address: '0x9e1...4c2b',
    price: 1.82,
    confidence: '99.5%',
    staleness: '5s',
    lastUpdate: '2026-03-21 14:28',
    oracles: ['Chainlink', 'Pyth', 'RED'],
  },
];

const oracleNodes: OracleNode[] = [
  { name: 'Chainlink Node 1', provider: 'Lido', address: '0x7a...9f2e', data: 67823.45, reliability: 99.2 },
  { name: 'Chainlink Node 2', provider: 'Aave', address: '0x3c...1d4a', data: 67824.12, reliability: 99.1 },
  { name: 'Chainlink Node 3', provider: 'Coinbase', address: '0x5f...7a8b', data: 67822.87, reliability: 99.0 },
  { name: 'Chainlink Node 4', provider: 'Kraken', address: '0x2a...9c1d', data: 67823.33, reliability: 98.9 },
  { name: 'Band Node 1', provider: 'Binance', address: '0x7a...9f2e', data: 67823.51, reliability: 98.5 },
  { name: 'Pyth Node 1', provider: 'Jupiter', address: '0x3c...1d4a', data: 67824.01, reliability: 98.8 },
];

export default function Home() {
  const [selectedFeed, setSelectedFeed] = useState<PriceFeed | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchPrice = async () => {
    setIsFetching(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsFetching(false);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b-4 border-green-400 bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black">Oracle Price Feed</h1>
          <p className="text-gray-400 mt-2">Decentralized price feeds via Chainlink, Band Protocol, Pyth</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 border-4 border-green-400 p-4 text-center">
            <div className="text-3xl font-black text-green-400">5</div>
            <div className="text-sm text-gray-400">Active Feeds</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">98.7%</div>
            <div className="text-sm text-gray-400">Avg Confidence</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black text-green-400">&lt;3s</div>
            <div className="text-sm text-gray-400">Avg Staleness</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">6</div>
            <div className="text-sm text-gray-400">Oracle Nodes</div>
          </div>
        </section>

        {/* Fetch Button */}
        <button
          onClick={fetchPrice}
          disabled={isFetching}
          className="w-full py-4 bg-green-500 text-white font-bold border-4 border-green-400 hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed text-xl"
        >
          {isFetching ? 'Fetching Prices...' : 'Refresh All Price Feeds'}
        </button>

        {/* Price Feeds */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">Price Feeds</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {priceFeeds.map((feed) => (
              <div
                key={feed.symbol}
                onClick={() => setSelectedFeed(feed)}
                className={`p-4 border-4 cursor-pointer transition-all ${
                  selectedFeed?.symbol === feed.symbol
                    ? 'bg-green-900/30 border-green-400'
                    : 'bg-gray-800 border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-green-400 text-lg">{feed.symbol}</h3>
                    <span className="text-xs text-gray-400">{feed.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-bold ${
                      parseFloat(feed.confidence) >= 99 ? 'bg-green-900 text-green-400' :
                      parseFloat(feed.confidence) >= 98 ? 'bg-yellow-900 text-yellow-400' :
                      'bg-red-900 text-red-400'
                    }`}>
                      {feed.confidence}
                    </span>
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price:</span>
                    <span className="font-bold">${feed.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Staleness:</span>
                    <span className="font-bold">{feed.staleness}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Update:</span>
                    <span className="font-bold text-gray-400">{feed.lastUpdate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Oracles:</span>
                    <span className="font-bold text-xs">{feed.oracles.join(', ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Price Feed */}
        {selectedFeed && (
          <section className="bg-gray-900 border-4 border-green-400 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-black text-green-400">{selectedFeed.symbol} Price Feed</h2>
                <p className="text-sm text-gray-400">{selectedFeed.address}</p>
              </div>
              <button
                onClick={() => setSelectedFeed(null)}
                className="px-4 py-2 bg-gray-700 text-white font-bold border-2 border-gray-600 hover:bg-gray-600"
              >
                Close
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-800 border border-gray-700">
                <div className="text-sm text-gray-400 mb-1">Current Price</div>
                <div className="text-3xl font-bold text-green-400">${selectedFeed.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              </div>
              <div className="p-4 bg-gray-800 border border-gray-700">
                <div className="text-sm text-gray-400 mb-1">Confidence</div>
                <div className="text-3xl font-bold">{selectedFeed.confidence}</div>
              </div>
              <div className="p-4 bg-gray-800 border border-gray-700">
                <div className="text-sm text-gray-400 mb-1">Staleness</div>
                <div className="text-3xl font-bold text-green-400">{selectedFeed.staleness}</div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-800 border border-gray-700">
              <div className="text-sm text-gray-400 mb-2">Oracles</div>
              <div className="flex flex-wrap gap-2">
                {selectedFeed.oracles.map((oracle) => (
                  <span key={oracle} className="px-3 py-1 bg-green-900/50 border border-green-700 text-green-400 text-sm font-bold">
                    {oracle}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Oracle Node Leaderboard */}
        <section className="bg-gray-900 border-4 border-purple-400 p-6">
          <h2 className="text-xl font-black text-purple-400 mb-4">Oracle Node Leaderboard</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="text-left py-3">Oracle</th>
                  <th className="text-left py-3">Provider</th>
                  <th className="text-right py-3">Data</th>
                  <th className="text-right py-3">Reliability</th>
                </tr>
              </thead>
              <tbody>
                {oracleNodes.map((node) => (
                  <tr key={node.address} className="border-b border-gray-800">
                    <td className="py-3 font-bold text-purple-400">{node.name}</td>
                    <td className="py-3">{node.provider}</td>
                    <td className="py-3 text-right">${node.data.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="py-3 text-right text-green-400">{node.reliability}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">How Oracle Price Feeds Work</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">1️⃣</div>
              <h3 className="font-bold text-green-400 mb-2">Oracle Nodes</h3>
              <p className="text-xs text-gray-400">Multiple independent sources collect data</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">2️⃣</div>
              <h3 className="font-bold text-blue-400 mb-2">Aggregation</h3>
              <p className="text-xs text-gray-400">Data aggregated for consensus</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">3️⃣</div>
              <h3 className="font-bold text-purple-400 mb-2">Reliability Check</h3>
              <p className="text-xs text-gray-400">Filters outliers and errors</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">4️⃣</div>
              <h3 className="font-bold text-yellow-400 mb-2">On-Chain Report</h3>
              <p className="text-xs text-gray-400">Price sent to smart contracts</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm py-8 border-t border-gray-800">
          <p>
            Built by <a href="https://x.com/samdevrel" className="text-green-400 hover:underline">@samdevrel</a>
          <button
            onClick={() => window.location.href = '/docs/overview'}
            className="w-full py-4 bg-purple-500 text-white font-bold border-4 border-purple-400 hover:bg-purple-400 mb-4"
          >
            {buttonText}
          </button>
                    </p>
        </footer>
      </div>
    </main>
  );
}
