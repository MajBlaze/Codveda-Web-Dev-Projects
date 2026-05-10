import './App.css';
import { useState } from 'react';
import CalculatorDisplay from './components/CalculatorDisplay';
import CalculatorButtons from './components/CalculatorButtons';

function App() {
  const [screen, setScreen] = useState('0');
  const [num1, setNum1] = useState(null);
  const [op, setOp] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [history, setHistory] = useState([]);

  const clickNumber = (digit) => {
    if (waiting) {
      setScreen(digit);
      setWaiting(false);
      return;
    }
    setScreen((prev) => (prev === '0' ? digit : prev + digit));
  };

  const clickDot = () => {
    if (waiting) {
      setScreen('0.');
      setWaiting(false);
      return;
    }
    if (!screen.includes('.')) {
      setScreen((prev) => prev + '.');
    }
  };

  const clearAll = () => {
    setScreen('0');
    setNum1(null);
    setOp(null);
    setWaiting(false);
  };

  const runCalculation = (a, b, action) => {
    if (action === '+') return a + b;
    if (action === '-') return a - b;
    if (action === '*') return a * b;
    if (action === '/') return b === 0 ? 'Error' : a / b;
    return b;
  };

  const clickOperator = (nextOp) => {
    const now = Number(screen);

    if (num1 === null) {
      setNum1(now);
    } else if (op && !waiting) {
      const ans = runCalculation(num1, now, op);
      if (ans === 'Error') {
        setScreen('Error');
        setNum1(null);
        setOp(null);
        setWaiting(true);
        return;
      }

      const showAns = String(parseFloat(ans.toFixed(4)));
      setScreen(showAns);
      setNum1(Number(showAns));
    }

    setOp(nextOp);
    setWaiting(true);
  };

  const clickEqual = () => {
    if (op === null || num1 === null || waiting) return;

    const num2 = Number(screen);
    const ans = runCalculation(num1, num2, op);

    if (ans === 'Error') {
      setScreen('Error');
      setHistory((prev) => [`${num1} ${op} ${num2} = Error`, ...prev.slice(0, 4)]);
    } else {
      const showAns = String(parseFloat(ans.toFixed(4)));
      setScreen(showAns);
      setHistory((prev) => [
        `${num1} ${op} ${num2} = ${showAns}`,
        ...prev.slice(0, 4),
      ]);
    }

    setNum1(null);
    setOp(null);
    setWaiting(true);
  };

  const deleteOne = () => {
    if (waiting || screen === 'Error') return;
    setScreen((prev) => {
      if (prev.length <= 1) return '0';
      return prev.slice(0, -1);
    });
  };

  const handleClick = (value) => {
    if (/^\d$/.test(value)) {
      clickNumber(value);
      return;
    }

    if (value === '.') {
      clickDot();
      return;
    }

    if (value === 'AC') {
      clearAll();
      return;
    }

    if (value === 'DEL') {
      deleteOne();
      return;
    }

    if (value === '=') {
      clickEqual();
      return;
    }

    if (screen === 'Error') {
      setScreen('0');
      setNum1(null);
      setWaiting(false);
    }

    clickOperator(value);
  };

  return (
    <main className="app-shell">
      <div className="main-content">
        <section className="calculator-card">
          <header className="card-header">
            <h1>React Calculator App</h1>
          </header>

          <CalculatorDisplay value={screen} expression={num1} operator={op} />
          <CalculatorButtons onButtonClick={handleClick} />

          <section className="history-panel">
            <h2>Recent Calculations</h2>
            {history.length === 0 ? (
              <p className="empty-text">No calculations yet. Try something above.</p>
            ) : (
              <ul>
                {history.map((entry, index) => (
                  <li key={`${entry}-${index}`}>{entry}</li>
                ))}
              </ul>
            )}
          </section>
        </section>
      </div>

      <a
        className="portfolio-link"
        href="https://majblaze.github.io/Codveda-Web-Dev-Projects/"
        target="_blank"
        rel="noreferrer"
      >
        My Portfolio
      </a>
    </main>
  );
}

export default App;
