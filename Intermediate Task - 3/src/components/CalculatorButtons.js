const buttonRows = [
  ['AC', 'DEL', '/', '*'],
  ['7', '8', '9', '-'],
  ['4', '5', '6', '+'],
  ['1', '2', '3', '='],
  ['0', '.'],
];

function CalculatorButtons({ onButtonClick }) {
  return (
    <section className="buttons-grid" aria-label="calculator buttons">
      {buttonRows.map((row, rowIndex) =>
        row.map((button) => {
          let className = 'calc-btn action-btn';

          if (/^\d$/.test(button) || button === '.') {
            className = 'calc-btn number-btn';
          }

          if (button === '0') {
            className += ' zero-btn';
          }

          if (button === '=') {
            className += ' equals-btn';
          }

          return (
            <button
              key={`${button}-${rowIndex}`}
              type="button"
              className={className}
              onClick={() => onButtonClick(button)}
            >
              {button}
            </button>
          );
        })
      )}
    </section>
  );
}

export default CalculatorButtons;
