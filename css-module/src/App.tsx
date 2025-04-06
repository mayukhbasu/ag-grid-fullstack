import React from 'react';
import Button from './components/Button';

const App: React.FC = () => {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div>
      <h1>Hello React + TypeScript + CSS Modules</h1>
      <Button text="Click Me" onClick={handleClick} />
    </div>
  );
};

export default App;
