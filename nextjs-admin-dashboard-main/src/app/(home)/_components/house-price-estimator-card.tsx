"use client";

import axios from 'axios';
import {useState} from "react";

export function HousePriceEstimatorCard() {
    const [output, setOutput] = useState("");
    const [rooms, setRooms] = useState<number>(2);
    const [squareFeet, setSquareFeet] = useState<number>(800);
    const [inputsChanged, setInputsChanged] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleEstimation = async () => {
        try {
            setOutput("Estimation in progress...");
            const response = await axios.post('https://af3kvjlkna.execute-api.us-west-2.amazonaws.com/dev/house-prediction', {
                rooms: rooms,
                square_feet: squareFeet,
            });
            console.log(response);
            const data = await response.data.prediction;
            setOutput(data);
            setInputsChanged(false);
        } catch (error) {
            setOutput("Error occurred while fetching estimation");
            console.error('Error:', error);
        }
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);
            const response = await axios.post('https://fakwbg0j0c.execute-api.us-west-2.amazonaws.com/dev/save', {
                time_epochs: Date.now().toString(),
                rooms: rooms.toString(),
                square_feet: squareFeet.toString(),
                price: output.toString(),
            });
            console.log(response);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div
            className="col-span-12 rounded-[10px] bg-white py-6 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-4 min-w-[250px] max-w-lg mx-auto">
            <h2 className="mb-5.5 px-7.5 text-body-2xlg font-bold text-dark dark:text-white">
                House Price Estimator
                <span className="block text-sm font-normal mt-1">Sklearn Regression Model</span>
            </h2>

            <div className="px-7.5 w-full">
                <div className="mb-4 flex flex-col gap-4 w-full">
                    <div className="flex items-center gap-4 w-full">
                        <label htmlFor="rooms"
                               className="text-sm font-medium text-dark dark:text-white w-[128px]">
                            Number of Rooms
                        </label>
                        <input
                            id="rooms"
                            type="text"
                            value={rooms}
                            onChange={(e) => {
                                setRooms(Number(e.target.value));
                                setInputsChanged(true);
                            }}
                            placeholder="Number of rooms"
                            className="w-[calc(100%-144px)] rounded-lg border border-stroke p-2 dark:border-stroke-dark dark:bg-gray-dark"
                        />
                    </div>
                    <div className="flex items-center gap-4 w-full">
                        <label htmlFor="squareFeet"
                               className="text-sm font-medium text-dark dark:text-white w-[128px]">
                            Square Feet
                        </label>
                        <input
                            id="squareFeet"
                            type="text"
                            value={squareFeet}
                            onChange={(e) => {
                                setSquareFeet(Number(e.target.value));
                                setInputsChanged(true);
                            }}
                            placeholder="Square feet"
                            className="w-[calc(100%-144px)] rounded-lg border border-stroke p-2 dark:border-stroke-dark dark:bg-gray-dark"
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleEstimation}
                        className="mb-4 rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90"
                    >
                        Estimate
                    </button>
                    {output && Number(output) && !inputsChanged? (
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="mb-4 rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSaving ? "..." : "Save"}
                        </button>
                    ): null}
                </div>
                <div className="rounded-lg border border-stroke p-4 dark:border-stroke-dark">
                    <p className="text-dark dark:text-white">
                        {output && Number(output) ? `$${Number(output).toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                        })}` : output}
                    </p>
                </div>
            </div>
        </div>
    );
}
