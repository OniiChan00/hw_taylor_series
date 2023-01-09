import React from 'react'
import { useState } from 'react'
import { evaluate, derivative,factorial } from 'mathjs'
import "./Taylor.css"



export default function Taylor() {
    const [equation, setEquation] = useState();
    const [x0, setX0] = useState();
    const [x, setX] = useState();
    const [n, setN] = useState();
    const [table, setTable] = useState();
    const [ans, setAns] = useState("");



    function calculate(){
        // taylor series
        let f;
        let ans;
        let count = parseInt(n);
        let all_ans = [];
        let temp_table;
        let fx = equation;
        
        for(var i = 0;i< count;i++){  
            if(i === 0){
                f = evaluate(fx,{x:x0});
                ans = f;
            }

            else{
                 fx = (derivative(fx,'x')).toString();
                 if(derivative(fx,'x').toString() === "0"){
                    break;
                 }
                f = evaluate(fx ,{x:x0});
                f = f / factorial(i);
                let eq = evaluate("(x-x0)^i",{x0:x0,x:x});
                ans = ans + f * eq;   
            }
            all_ans.push(ans);
        }
        
        temp_table = all_ans.map((ans,index) => {
            return <tr>
                <td>{index+1}</td>
                <td>{ans}</td>
            </tr>
        })
        setTable(temp_table);
        setAns(ans);
    }

 
  return (
    <div className='container'>
            <h1>Taylor Series</h1>
            <div className='container'>
                <label className='form-label'>Equation</label>
                <input type="text" className='form-control' value={equation} onChange={e => setEquation(e.target.value)} />
                <label className='form-label'>x0</label>
                <input type="text" className='form-control' value={x0} onChange={e => setX0(e.target.value)} />
                <label className='form-label'>x</label>
                <input type="text" className='form-control' value={x} onChange={e => setX(e.target.value)} />
                <label className='form-label'>n</label>
                <input type="text" className='form-control' value={n} onChange={e => setN(e.target.value)} />
                <button type="submit" className='btn btn-primary' onClick={calculate}>Submit</button>
            </div>
        <div className='container'>
            <h5><strong><i>Answer:</i></strong> {ans} </h5>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Iteration</th>
                        <th>Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {table}
                </tbody>
            </table>

        </div>
    </div>
  )
}

