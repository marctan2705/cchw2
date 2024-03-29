import logo from './logo.svg';
import './App.css';
import Main from './Components/Main';
import Quiz from "./Components/Quiz"
import { useState } from 'react';

function App() {
  const [quiz, setQuiz] = useState(null)
  return (
    <>
    {!quiz ? <Main setQuiz={setQuiz}/> : <Quiz quiz={quiz}/>}
    </>
  );
}

export default App;
