import React from 'react'

export default function CustomDynamicTabs({tabItems,activeTab,handleChangeActiveTab}) {
  return (
    <div className="w-full mx-auto mt-10">
      <div className="flex border-b border-gray-200">
        {tabItems.map((tab, index) => (
          <button
            key={index}
            className={`flex-1 py-2 text-center text-gray-600 font-medium transition-all ${
              activeTab === index
                ? "border-b-2 border-[#22c55e] text-[#22c55e]"
                : "hover:text-gray-800"
            }`}
            onClick={() => handleChangeActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}
