// MainPage.js
import React, { useState } from 'react';
import Question1 from './Question1';
import Question2 from './Question2';
import Result from './Result';

const MainPage = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [result, setResult] = useState(null);

  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question);
    setResult(null);
  };

  const handleResult = (result) => {
    setResult(result);
  };

  return (
    <div>
      <h1>Main Page</h1>
      <button onClick={() => handleQuestionSelect('question1')}>Question 1</button>
      <button onClick={() => handleQuestionSelect('question2')}>Question 2</button>

      {selectedQuestion === 'question1' && <Question1 onSubmit={(result) => handleResult(result)} />}
      {selectedQuestion === 'question2' && <Question2 onSubmit={(result) => handleResult(result)} />}

      {result !== null && <Result result={result} />}
    </div>
  );
};

export default MainPage;
