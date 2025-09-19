import React from "react";
import { Backpack, Sword, Shield } from "lucide-react";
import type { InventoryItem } from "../data/inventory";
import characterImage from "../assets/images/mage-lv1.png";

interface InventoryPageProps {
items: InventoryItem[];
}

export default function InventoryPage({ items }: InventoryPageProps) {
const equipmentSlots = [
    { id: 1, name: "Armor", icon: <Shield size={32} className="text-gray-400" /> },
    { id: 2, name: "Shield", icon: <Shield size={32} className="text-gray-400" /> },
    { id: 3, name: "Sword", icon: <Sword size={32} className="text-gray-400" /> },
    { id: 4, name: "Accessory", icon: <Backpack size={32} className="text-yellow-400" /> },
];

const totalInventorySlots = 12;
const inventorySlots = new Array(totalInventorySlots).fill(null).map((_, i) => items[i] || null);

return (
    <div className="p-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen font-mono">
    {/* Header */}
    <div className="flex flex-col items-center mb-8 relative">
        <div className="flex items-center gap-3 mb-3 bg-gray-800 px-6 py-2 border-2 border-gray-700">
        <span className="text-yellow-400 text-2xl filter drop-shadow-lg">🛡️</span>
        <h2 className="text-3xl font-bold text-yellow-300 tracking-wider uppercase" style={{
            textShadow: '2px 2px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000',
            fontFamily: 'monospace'
        }}>Inventory</h2>
        <span className="text-yellow-400 text-2xl filter drop-shadow-lg">⚔️</span>
        </div>

        <div className="flex gap-6 text-sm bg-black bg-opacity-80 px-4 py-2 border border-gray-600 rounded-none">
        <div className="text-cyan-400 font-bold">
            <span className="text-gray-300">LV:</span> 
            <span className="text-yellow-300 ml-1">5</span>
        </div>
        <div className="text-red-400 font-bold">
            <span className="text-gray-300">HP:</span>
            <span className="text-green-400 ml-1">80</span>
            <span className="text-gray-400">/</span>
            <span className="text-red-300">100</span>
        </div>
        <div className="text-blue-400 font-bold">
            <span className="text-gray-300">EXP:</span>
            <span className="text-blue-300 ml-1 font-mono">▓▓▓▓░░░░░░</span>
        </div>
        </div>
    </div>

    {/* Main content */}
    <div className="bg-gray-800 bg-opacity-50 p-6">
        <div className="flex gap-8">
        {/* Character + Equipment */}
        <div className="flex flex-col items-center gap-6">
            <div className="relative">
            <div className="w-44 h-44 bg-gradient-to-b from-gray-700 to-gray-900 border-4 border-gray-600 flex items-center justify-center relative overflow-hidden animate-pulse-slow">
                <img src={characterImage} alt="Character" className="w-36 h-36 object-contain filter drop-shadow-lg" />
            </div>
            <div className="absolute -top-3 -right-3 bg-yellow-600 text-black font-bold text-xs px-2 py-1 border-2 border-yellow-400 rounded-none">
                LV.5
            </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
            {equipmentSlots.map((slot) => (
                <div
                key={slot.id}
                className="w-20 h-20 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 border-2 border-gray-600 flex items-center justify-center relative group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg animate-gradient"
                >
                {slot.icon}
                <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
                </div>
            ))}
            </div>
        </div>

        {/* Inventory */}
        <div className="flex-1">
            <div className="grid grid-cols-4 gap-3 p-4 bg-black bg-opacity-30 border-2 border-gray-700">
            {inventorySlots.map((item, idx) => (
                <div
                key={idx}
                className="w-full h-24 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 border-2 border-gray-600 flex flex-col items-center justify-center relative group cursor-pointer transition-all duration-300 hover:scale-105 hover:border-yellow-500 hover:shadow-lg animate-gradient"
                >
                {item ? (
                    <>
                    <Backpack size={28} className="text-yellow-400 mb-1 filter drop-shadow-sm" />
                    <div className="text-xs font-bold text-white text-center leading-tight">{item.name}</div>
                    <div className="text-xs text-yellow-300 font-bold">x{item.quantity}</div>
                    <div className="absolute top-0 right-0 w-2 h-2 bg-yellow-500"></div>
                    </>
                ) : (
                    <div className="text-gray-600 italic text-xs font-mono">EMPTY</div>
                )}
                </div>
            ))}
            </div>
        </div>
        </div>
    </div>

    {/* Bottom status */}
    <div className="mt-4 bg-black bg-opacity-80 border border-gray-600 px-4 py-2 flex justify-between items-center text-xs font-mono">
        <div className="text-gray-400">
        <span className="text-yellow-400">Gold:</span> 1,250G
        </div>
        <div className="text-gray-400">
        <span className="text-cyan-400">Weight:</span> {items.reduce((total, item) => total + (item?.quantity || 0), 0)}/100
        </div>
        <div className="text-gray-400">
        <span className="text-green-400">Slots:</span> {items.filter(item => item).length}/{totalInventorySlots}
        </div>
    </div>

    <style>
        {`
        @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .animate-gradient {
            background-size: 200% 200%;
            animation: gradientMove 6s ease infinite;
        }
        @keyframes pulseSlow {
            0%, 100% { opacity: 0.9; }
            50% { opacity: 1; }
        }
        .animate-pulse-slow {
            animation: pulseSlow 3s ease-in-out infinite;
        }
        `}
    </style>
    </div>
);
}
