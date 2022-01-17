import './App.css';
import CalcButton from './CalcButton';
import { useState } from 'react';

function App() {
  const [state, setState] = useState({
    expression: "+",
    top_token: "",
    bottom_token: "0"
  })

  function getTopToken(str) {
    return str.replace('<', '-').substring(1) || "ERROR";
  }

  function getBottomToken(str) {
    try {
      return str.match(/[+/<*]-*[\d.]*$/g)[0].substring(1,);
    } catch {
      return str.charAt(-1);
    }
  }

  function updateStateSpecial(str) {
    console.log(str);
    setState({
      ...state,
      expression: str,
      top_token: getTopToken(str),
      bottom_token: getBottomToken(str)
    });
  }

  function handleButtonClick(i) {
    if ('0' <= i && i <= '9') {
      updateStateSpecial(state.expression + i);
    }
    else if (i === "AC") {
      setState({
        ...state,
        expression: "+",
        top_token: "",
        bottom_token: "0"
      });
    }
    else if (['+', 'x', '/'].includes(i)) {
      if (state.expression.charAt(-1) in ['+', '-', 'x', '/', '<']) {
        updateStateSpecial(state.expression.slice(0, -1) + i);
      } else {
        updateStateSpecial(state.expression + i);
      }
    }
    else if (i === '-') {
      if (state.expression.charAt(-1) === '<') {
        updateStateSpecial(state.expression + i);
      } else if (!(state.expression.charAt(-1) === '-')) {
        updateStateSpecial(state.expression + '<');
      }
    }
    else if (i === '.') {
      if (state.expression.match(/[+/<\-*]\d*$/)) { // no double decimals
        updateStateSpecial(state.expression + i);
      }
    }
    else if (i === '=') {
      updateStateSpecial(eval(state.expression.replace('<', '-')) + "");
    }
  }

  return (
    <div className="App">
      <div className="display">
        <div id="upper-display">{state.top_token}</div>
        <div id="lower-display">{state.bottom_token}</div>
      </div>
      <div className="button-grid">
        <CalcButton name="AC" onClick={() => handleButtonClick("AC")} />
        <CalcButton name="/" onClick={() => handleButtonClick("/")} />
        <CalcButton name="x" onClick={() => handleButtonClick("x")} />
        <CalcButton name="7" onClick={() => handleButtonClick("7")} />
        <CalcButton name="8" onClick={() => handleButtonClick("8")} />
        <CalcButton name="9" onClick={() => handleButtonClick("9")} />
        <CalcButton name="-" onClick={() => handleButtonClick("-")} />
        <CalcButton name="4" onClick={() => handleButtonClick("4")} />
        <CalcButton name="5" onClick={() => handleButtonClick("5")} />
        <CalcButton name="6" onClick={() => handleButtonClick("6")} />
        <CalcButton name="+" onClick={() => handleButtonClick("+")} />
        <CalcButton name="1" onClick={() => handleButtonClick("1")} />
        <CalcButton name="2" onClick={() => handleButtonClick("2")} />
        <CalcButton name="3" onClick={() => handleButtonClick("3")} />
        <CalcButton name="=" onClick={() => handleButtonClick("=")} />
        <CalcButton name="0" onClick={() => handleButtonClick("0")} />
        <CalcButton name="." onClick={() => handleButtonClick(".")} />
      </div>

    </div>
  );
}

export default App;
