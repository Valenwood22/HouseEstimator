"use client";

import axios from 'axios';
import {useState} from "react";

export function HousePriceEstimatorCard() {
    const [output, setOutput] = useState("");
    const [rooms, setRooms] = useState<number>(2);
    const [squareFeet, setSquareFeet] = useState<number>(800);

    const handleEstimation = async () => {
        try {
            setOutput("Estimation in progress...");
            const response = await axios.post('http://35.95.129.233:8000/house-prediction', {
                rooms: rooms,
                square_feet: squareFeet,
            });
            console.log(response);
            const data = await response.data.prediction;
            setOutput(data);
        } catch (error) {
            setOutput("Error occurred while fetching estimation");
            console.error('Error:', error);
        }
    };

  return (
      <div
          className="col-span-12 rounded-[10px] bg-white py-6 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-6 max-w-lg mx-auto">
          <h2 className="mb-5.5 px-7.5 text-body-2xlg font-bold text-dark dark:text-white">
              House Price Estimator
              <span className="block text-sm font-normal mt-1">Sklearn Regression Model</span>
          </h2>

          <div className="px-7.5">
              <div className="mb-4 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                      <label htmlFor="rooms"
                             className="text-sm font-medium text-dark dark:text-white whitespace-nowrap w-32">
                          Number of Rooms
                      </label>
                      <input
                          id="rooms"
                          type="text"
                          value={rooms}
                          onChange={(e) => setRooms(Number(e.target.value))}
                          placeholder="Number of rooms"
                          className="flex-1 rounded-lg border border-stroke p-2 dark:border-stroke-dark dark:bg-gray-dark"
                      />
                  </div>
                  <div className="flex items-center gap-4">
                      <label htmlFor="squareFeet"
                             className="text-sm font-medium text-dark dark:text-white whitespace-nowrap w-32">
                          Square Feet
                      </label>
                      <input
                          id="squareFeet"
                          type="text"
                          value={squareFeet}
                          onChange={(e) => setSquareFeet(Number(e.target.value))}
                          placeholder="Square feet"
                          className="flex-1 rounded-lg border border-stroke p-2 dark:border-stroke-dark dark:bg-gray-dark"
                      />
                  </div>
              </div>
              <button
                  onClick={handleEstimation}
                  className="mb-4 rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90"
              >
                  Estimate
              </button>
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
