function CalculatorDisplay({ value, expression, operator }) {
  const expressionText =
    expression === null || operator === null ? 'Start typing numbers...' : `${expression} ${operator}`;

  return (
    <section className="display-panel">
      <p className="expression-line">{expressionText}</p>
      <p className="value-line">{value}</p>
    </section>
  );
}

export default CalculatorDisplay;
