// Question1.js
import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making API requests

const Question1 = ({ onSubmit }) => {
  const [password, setPassword] = useState('');
  const [steps, setSteps] = useState(0);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCalculateSteps = () => {
    // Your logic to calculate steps goes here
    const calculatedSteps = countStrongPasswordSteps(password); // Make sure to import the function
    setSteps(calculatedSteps);
    onSubmit(calculatedSteps);


  // Make a POST request to save the result
  axios.post('/api/saveResult', {
    question: 'Question 1', // Change to the appropriate question name
    result: calculatedSteps
  })
  .then(response => {
    console.log('Result saved:', response.data);
  })
  .catch(error => {
    console.error('Error saving result:', error);
  });

  };

  function countStrongPasswordSteps(password) {
    const length = password.length;
    let hasLower = false;
    let hasUpper = false;
    let hasDigit = false;
    let repeatCount = 0;

    for (let i = 0; i < length; i++) {
        const char = password[i];
        if (char >= 'a' && char <= 'z') hasLower = true;
        if (char >= 'A' && char <= 'Z') hasUpper = true;
        if (char >= '0' && char <= '9') hasDigit = true;
        repeatCount = (i > 0 && char === password[i - 1]) ? repeatCount + 1 : 0;
    }

    const deletions = Math.max(0, length - 20);
    const insertions = Math.max(0, 6 - length);
    const replacements = Math.ceil(repeatCount / 2);

    // Calculate the correct number of missing criteria.
    const missingCriteria = ((!hasLower) ? 1 : 0) + ((!hasUpper) ? 1 : 0) + ((!hasDigit) ? 1 : 0);

    // Calculate the minimum steps required.
    let stepsRequired = Math.max(missingCriteria, replacements);

    // Adjust steps required based on deletions.
    if (deletions > 0) {
        stepsRequired += Math.ceil(deletions / 3);
    }

    return Math.max(stepsRequired, insertions); // We also need to account for insertions.
}

  return (
    <div>
      <h2>Question 1: Strong Password Steps</h2>
      <label>Password:</label>
      <input type="password" value={password} onChange={handlePasswordChange} />
      <button onClick={handleCalculateSteps}>Calculate Steps</button>
      <p>Steps required: {steps}</p>
    </div>
  );
};

export default Question1;
