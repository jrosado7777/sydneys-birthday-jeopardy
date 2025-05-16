import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.map(cat => cat.category));
        setQuestions(data.map(cat => cat.questions));
      });
  }, []);

  const showQuestion = (question) => {
    setSelectedQuestion(question);
  };

  const closeQuestion = () => {
    setSelectedQuestion(null);
  };

  return (
    <div className="app">
      <header><h1>Sydney's Birthday Jeopardy!</h1></header>
      <div className="container">
        {categories.map((cat, i) => (
          <div key={i} className="card category">{cat}</div>
        ))}
        {[0, 1, 2, 3, 4].map((rowIndex) => (
          categories.map((_, catIndex) => {
            const q = questions[catIndex][rowIndex];
            const price = `$${(rowIndex + 1) * 100}`;
            return (
              <div
                key={`${catIndex}-${rowIndex}`}
                className="card question"
                onClick={() => showQuestion(q.question)}
              >
                {price}
              </div>
            );
          })
        ))}
      </div>

      {selectedQuestion && (
        <div className="qDiv">
          <h1 dangerouslySetInnerHTML={{ __html: selectedQuestion }} />
          <button onClick={closeQuestion}>Close</button>
        </div>
      )}
      <footer><p>✨ Sydney's Birthday Jeopardy✨</p></footer>
    </div>
  );
}

export default App;
