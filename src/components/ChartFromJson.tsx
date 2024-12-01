import dynamic from "next/dynamic";
import React, { useState } from "react";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })

interface ChartFromJsonProps {
    data: any;
}

const ChartFromJson: React.FC<ChartFromJsonProps> = ({ data }) => {

    const [loading, setLoading] = useState(true);
    console.log(data)
    return (
        <div className="">
            {loading && (
                <div className="flex items-center justify-center bg-white bg-opacity-80 z-10">
                    {/* Tailwind Spinner */}
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="ml-4 text-blue-500 font-medium">Loading...</p>
                </div>
            )}
            <Plot
                data={data.data}
                layout={data.layout}
                onInitialized={() => setLoading(false)} // Chart initialized
                onUpdate={() => setLoading(false)} // Chart updated
            />
        </div>
    );
};

export default ChartFromJson;
