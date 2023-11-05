import { useState } from "react";
import './UsefulViewer.css';

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

interface Props {
  value: Record<string, unknown>;
  onChange: (value: Record<string, unknown>) => void;
}

export default function UsefulViewer(props: Props) {
  /**
   *  what needed?
   * 1. onChange only when json is valid.
   * 2. allow select fields on hover and edit
   * 3. allow delete, add, edit.
   *  */
  const { value } = props;
  const [error, setError] = useState(false);

  function handleInput(key: string, e) {
    const check = structuredClone(value);
    const text = e.target.innerText;
    e.target.setSelectionRange(undefined, undefined)
    // trim and remove line breaks 
    try {
      const trimmed = JSON.parse(text).trim();
      check[key] = trimmed;
      const valid = JSON.parse(JSON.stringify(check));
      const debouncedChange = debounce(props.onChange, 1000);
      setError(false);
      debouncedChange(valid);
    } catch (e) {
      setError(true);
      console.log('json is invalid', check);
    }
  }


  // console.log(editable)
  return (
    <div className="wrapper">
      { error && <div className="error">Invalid Json</div>}
      <div className="editor">
        {Object.entries(value).map(([k, v]) => {
          return (
            <div key={k} className="field">
              <span className="key">{k}:</span>
              <span
                className="value"
                contentEditable
                onInput={(e) => handleInput(k, e)}
              >
                {JSON.stringify(v)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NumberValue() {

}

function StringValue() {

}

function BoolValue() {

}

function ArrayValue() {

}

function ObjectValue() {

}


