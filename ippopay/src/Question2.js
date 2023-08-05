// Question2.js
import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making API requests

const Question2 = ({ onSubmit }) => {
  const [numbers, setNumbers] = useState('');
  const [result, setResult] = useState('');

  const handleNumbersChange = (event) => {
    setNumbers(event.target.value);
  };

  var findMinAbsDiff = function (numbers) {
    const lengthN = numbers.length;
    const halfLength = lengthN / 2;
    const leftSums = new Array(halfLength + 1).fill().map(() => new Array().fill());
    const rightSums = new Array(halfLength + 1).fill().map(() => new Array().fill());
  
    let total = 0;
    numbers.forEach((num) => (total += num));
  
    for (let mask = 0; mask < 1 << halfLength; mask++) {
      let count = 0; // to count number of elements in the subset
      let leftSum = 0;
      let rightSum = 0;
  
      for (let bit = 0; bit < halfLength; bit++) {
        if (mask & (1 << bit)) {
          count++;
          leftSum += numbers[bit];
          rightSum += numbers[halfLength + bit];   
        }
      }
  
      leftSums[count].push(leftSum); 
      
      rightSums[count].push(rightSum);
    }
  
    for (let i = 0; i < halfLength; i++) {
      rightSums[i].sort((a, b) => a - b);
    }
  
    let minDiff = Number.MAX_VALUE;
  
    for (let i = 0; i < halfLength; i++) {
      const leftArr = leftSums[i];
      const rightArr = rightSums[halfLength - i]; 
      // we have to find min abs diff in two equal size arrays
  
      leftArr.forEach((element) => {
        let low = 0;
        let high = rightArr.length - 1;
  
        while (low <= high) {
          const mid = Math.floor(low + (high - low) / 2);
          const value = total - 2 * (element + rightArr[mid]);
          minDiff = Math.min(minDiff, Math.abs(value));
          if (minDiff == 0) {
            return minDiff;
          }
          if (value > 0) {
            low = mid + 1;
          } else {
            high = mid - 1;
          }
        }
  
      });
    }
  
    return minDiff;
  };

  const handleCalculateResult = () => {
    // Your logic to calculate result goes here
    const numbersArray = numbers.split(',').map(Number); // Convert input to array of numbers
    const calculatedResult = findMinAbsDiff(numbersArray); // Make sure to import the function
    setResult(calculatedResult);
    onSubmit(calculatedResult);


  // Make a POST request to save the result
  axios.post('/api/saveResult', {
    question: 'Question 2', // Change to the appropriate question name
    result: calculatedResult
  })
  .then(response => {
    console.log('Result saved:', response.data);
  })
  .catch(error => {
    console.error('Error saving result:', error);
  });

  };

  return (
    <div>
      <h2>Question 2: Minimum Absolute Difference</h2>
      <label>Numbers (comma-separated):</label>
      <input type="text" value={numbers} onChange={handleNumbersChange} />
      <button onClick={handleCalculateResult}>Calculate Result</button>
      <p>Result: {result}</p>
    </div>
  );
};

export default Question2;
