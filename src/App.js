import './App.css';
import { useState } from 'react';
/* useState is a hook function that allows you to add state to functional components */ 
import { evaluate } from 'mathjs'

const App = () => {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ['/', '*', '+', '-', '.'];
/* here we apply the values to the operators */
  const updateCalc = value => {
    if (
      ((ops.includes(value)) && (calc === '')) || ((ops.includes(value)) && (ops.includes(calc.slice(-1))))
    ) {
      return;
    }
/* if the opertors include the value and calculation is = 0, or ops.includes value and the last value entered is an operator return and do nothing to limit unlimited operators  */
    setCalc(calc + value);

    if (!ops.includes(value)) {
      setResult(evaluate(calc + value).toString());
    }
  }
  /* if the last item was not a value/operator, we use evaluate to do calculation */

const CreateNums = (props) => {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <>
      {nums.map((num, index) => {
        return <button key={index} onClick={() => props.updateCalc(num)}>{num}</button>
      })}
    </>
  )
}
/* numbers stored in an array. Then mapped through to create number buttons */

  const calculate = () => {
    setCalc(evaluate(calc).toString()); 
  } /* this calculates total when = is pressed */

  const deleteLast = () => {
    if (calc === '') {
      return;
    } 
    const value = calc.slice(0, -1)

    setCalc(value);
  } /* if the calc = '' return, else .slice to remove the last value */

  return (
    <div className='App'> 
      <div className='calculator'>
        <div className='display'> 
          {result ? <span>({result})</span> : ''} 
          { calc || '0' }
        </div>

        <div className='operators'> 
          <button onClick={() => updateCalc('/')}>/</button> 
          <button onClick={() => updateCalc('*')}>*</button>
          <button onClick={() => updateCalc('+')}>+</button>
          <button onClick={() => updateCalc('-')}>-</button>

          <button onClick={deleteLast}>Delete</button>
        </div>

        <div className='numbers'>
          {/* { createNums() } */}
          <CreateNums updateCalc={updateCalc} />
          <button onClick={() => updateCalc('0')}>0</button>
          <button onClick={() => updateCalc('.')}>.</button>

          <button onClick={calculate}>=</button>
        </div>

      </div>
    </div>
  )
};

/* display - if theres a value we show it if not, will display ''. 0 displayed until buttons are clicked.
operators - update calc used to assign its value to operators onclick 
delete button deletes the last digit or operator 
updateCalc function ran within the next tags, = button calculates everything */

export default App;