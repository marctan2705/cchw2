import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

function Quiz({quiz}) {
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex > 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }
    const [answers, setAnswers] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [score, setScore] = useState(0)
    function submit(){
        var i = 0
        console.log("yas/", answers)
        for (const [key, value] of Object.entries(answers)) {
            console.log(key-1, quiz[key - 1])
            if(quiz[key - 1]["answer"] == value){
                i += 1
            }
          }
        setScore(i)
        setSubmitted(true)
    }
    function handleChange(e, x){
        var a = {...answers}
        a[x] = e.target.value
        setAnswers(a)
    }
    useEffect(
        ()=>{
            quiz = shuffle(quiz)
        }, []
    )
    console.log(quiz)
    var i = 1
    return ( 
        <>
       { 
       !submitted ? 
       <>
        

        <div className="questionholder">
        <h1>
            Quiz
        </h1>
            {quiz.map(
                (question)=>{
                    var x = i
                    i++
                    return(
                        <div className="questionbox">
                        <h3>Question {x}. {question["question"]}</h3>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            onChange={(e) => handleChange(e, x)}
                        >
                            {
                            question["options"].map(
                                (option) => {
                                    console.log(option)
                                    return(
                                    <FormControlLabel value={option} control={<Radio />} label={option} />)
                                }
                            )
                            }
                        </RadioGroup>
                        </div>)
                }
            )}
        <Button variant="contained" id="button" onClick={submit}>Submit</Button>

        </div>
        
        </>
        :
        <div className='score'>
            <h1>Your Score:</h1>
            <h2>
                {score} / {quiz.length}
            </h2>
        </div>
}
        </>
     );
}

export default Quiz;