"use client";

import axios from 'axios';
import {useState, useEffect} from "react";

export function RecentPriceEstimatorCard() {
    const [outputs, setOutputs] = useState<Array<{
        rooms: { S: string },
        square_feet: { S: string },
        price: { S: string }
    }>>([]);

    useEffect(() => {
        handleRefresh();
    }, []);

    const handleRefresh = async () => {
        console.log("Refreshing...");
        try {
            const response = await axios.get('https://fakwbg0j0c.execute-api.us-west-2.amazonaws.com/dev/retrieve');
            setOutputs(response.data.Items);
            console.log(response.data.Items);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div
            className="col-span-12 rounded-[10px] bg-white py-6 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-6 min-w-[550px] max-w-lg mx-auto">
            <div className="flex justify-between items-center mb-5.5 px-7.5">
                <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
                    Recent Saves
                    <span className="block text-sm font-normal mt-1">Showing all saves</span>
                </h2>
                <button
                    onClick={handleRefresh}
                    className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90"
                >
                    Refresh
                </button>
            </div>

            <div className="px-7.5">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="border-b border-stroke dark:border-stroke-dark">
                            <th className="py-4 px-4 text-left font-medium text-dark dark:text-white">Rooms</th>
                            <th className="py-4 px-4 text-left font-medium text-dark dark:text-white">Sqft</th>
                            <th className="py-4 px-4 text-left font-medium text-dark dark:text-white">Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {outputs.map((output, index) => (
                            <tr key={index} className="border-b border-stroke dark:border-stroke-dark">
                                <td className="py-4 px-4 text-dark dark:text-white">{output.rooms.S}</td>
                                <td className="py-4 px-4 text-dark dark:text-white">{output.square_feet.S}</td>
                                <td className="py-4 px-4 text-dark dark:text-white">${Number(output.price.S).toLocaleString('en-US')}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
