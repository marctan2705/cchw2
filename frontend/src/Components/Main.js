import {useState} from "react"
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {
    Unstable_NumberInput as BaseNumberInput,
    numberInputClasses,
  } from '@mui/base/Unstable_NumberInput';
import "./main.css"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import { styled } from '@mui/system';


function Main({setQuiz}) {

    const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
        return (
          <BaseNumberInput
            slots={{
              root: StyledInputRoot,
              input: StyledInputElement,
              incrementButton: StyledButton,
              decrementButton: StyledButton,
              halfWidth: true
            }}
            slotProps={{
              incrementButton: {
                children: '▴',
              },
              decrementButton: {
                children: '▾',
              },
            }}
            {...props}
            ref={ref}
          />
        );
      });
      const blue = {
        100: '#DAECFF',
        200: '#80BFFF',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
      };
      
      const grey = {
        50: '#F3F6F9',
        100: '#E5EAF2',
        200: '#DAE2ED',
        300: '#C7D0DD',
        400: '#B0B8C4',
        500: '#9DA8B7',
        600: '#6B7A90',
        700: '#434D5B',
        800: '#303740',
        900: '#1C2025',
      };
      
      const StyledInputRoot = styled('div')(
        ({ theme }) => `
        font-family: 'IBM Plex Sans', sans-serif;
        font-weight: 400;
        border-radius: 8px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
        display: grid;
        grid-template-columns: 1fr 19px;
        grid-template-rows: 1fr 1fr;
        overflow: hidden;
        column-gap: 8px;
        padding: 4px;
      
        &.${numberInputClasses.focused} {
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
        }
      
        &:hover {
          border-color: ${blue[400]};
        }
      
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `,
      );
      
      const StyledInputElement = styled('input')(
        ({ theme }) => `
        font-size: 0.875rem;
        font-family: inherit;
        font-weight: 400;
        line-height: 1.5;
        grid-column: 1/2;
        grid-row: 1/3;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: inherit;
        border: none;
        border-radius: inherit;
        padding: 8px 12px;
        outline: 0;
      `,
      );
      
      const StyledButton = styled('button')(
        ({ theme }) => `
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        appearance: none;
        padding: 0;
        width: 19px;
        height: 19px;
        font-family: system-ui, sans-serif;
        font-size: 0.875rem;
        line-height: 1;
        box-sizing: border-box;
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 0;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 120ms;
      
        &:hover {
          background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
          border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
          cursor: pointer;
        }
      
        &.${numberInputClasses.incrementButton} {
          grid-column: 2/3;
          grid-row: 1/2;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          border: 1px solid;
          border-bottom: 0;
          &:hover {
            cursor: pointer;
            background: ${blue[400]};
            color: ${grey[50]};
          }
      
        border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
        color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
        }
      
        &.${numberInputClasses.decrementButton} {
          grid-column: 2/3;
          grid-row: 2/3;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          border: 1px solid;
          &:hover {
            cursor: pointer;
            background: ${blue[400]};
            color: ${grey[50]};
          }
      
        border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
        color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
        }
        & .arrow {
          transform: translateY(-1px);
        }
      `,
      );
    const [topics, SetTopics] = useState({
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
    })
    const [difficulty, setDifficulty] = useState("easy")
    function handleClick(e){
        console.log(e.target.value)
    }
    function handleChange(e){
        setDifficulty(e.target.value)
    }
    const t = ["1", "2", "3", "4", "5", "6", "7"]

    function setValue(val, x){
        if( val < 0){
            val = 0
            return
        }

        var a = {...topics}
        a[x] = val;
        console.log(a)
        SetTopics(a)
    }
    function submit(){
        axios.post(
            'http://127.0.0.1:5000/get_response',
            {
                chatters:{
                    'difficulty': difficulty,
                    'topics':topics
                }
            },
                {
                    headers: {
                        'content-type': 'application/json'
                      }
                }
        ).then(
            (res) => setQuiz(res.data["quiz"])
        )
    }
    return ( 
        <div className="page">
            <h1>
                Quiz Generator of Awesomeness
            </h1>
            <FormControl halfWidth>
            <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={difficulty}
                label="Difficulty"
                onChange={handleChange}
            >
                <MenuItem value={"easy"}>easy</MenuItem>
                <MenuItem value={"intermediate"}>intermediate</MenuItem>
                <MenuItem value={"advanced"}>advanced</MenuItem>
            </Select>
            </FormControl>
            <h2>
                Topics
            </h2>
            <FormGroup>
            {
                t.map(
                    (x) => {
                        return(
                        <div className="formgroup">
                            <h2>Topic {x}</h2>
                            <h3>
                                Enter number of questions
                            </h3>
                            <NumberInput
                                // aria-label="Demo number input"
                                placeholder="Enter number of question"
                                value={topics[x]}
                                onChange={(event, val) => setValue(val,x)}
                                />
                        </div>
                    )}
                )
            }
            <Button variant="contained" id="button" onClick={submit}>Submit</Button>
            </FormGroup>
        </div>
     );
}

export default Main;