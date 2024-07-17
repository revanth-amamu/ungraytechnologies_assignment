import React, { useEffect, useState } from 'react';
import { fetchData } from '../../services/api';

const apiUrl = import.meta.env.VITE_API_FIVE;

const CommunityFeedback = () => {
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    fetchData(apiUrl)
      .then(response => setFeedback(response))
      .catch(error => console.error(error));
  }, []);

  const total = feedback.negative + feedback.neutral + feedback.positive;
  const negativePercent = (feedback.negative / total) * 100;
  const neutralPercent = (feedback.neutral / total) * 100;
  const positivePercent = (feedback.positive / total) * 100;

  let result = "";
  // compare which is greater
  const max = Math.max(negativePercent, neutralPercent, positivePercent);

  if (max === negativePercent) {
    result = "Negative";
  } else if (max === neutralPercent) {
    result = "Neutral";
  } else if (max === positivePercent) {
    result = "Positive";
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="text-gray-500 text-sm">Community feedback</div>
        <div className="text-lg text-gray-900 mt-2 font-semibold">Mostly {result}</div>
        <div className="flex items-center mt-4">
          <div className="h-2 rounded-full bg-red-400 mr-1" style={{ width: `${negativePercent}%` }}></div>
          <div className="h-2 rounded-full bg-yellow-400 mr-1" style={{ width: `${neutralPercent}%` }}></div>
          <div className="h-2 rounded-full bg-green-400" style={{ width: `${positivePercent}%` }}></div>
        </div>
        <div className="flex justify-between text-gray-500 text-sm mt-4">
          <div className="flex flex-col items-center">
            <div>Negative</div>
            <div className="text-gray-900 font-semibold">{feedback.negative}</div>
          </div>
          <div className="flex flex-col items-center">
            <div>Neutral</div>
            <div className="text-gray-900 font-semibold">{feedback.neutral}</div>
          </div>
          <div className="flex flex-col items-center">
            <div>Positive</div>
            <div className="text-gray-900 font-semibold">{feedback.positive}</div>
          </div>
        </div>
    </div>
  );
};

export default CommunityFeedback;
