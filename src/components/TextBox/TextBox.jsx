// Incorporate useStates to save the user's input
'use client';
import { useState } from 'react';

export default function TextBox({Placeholder}) {

    const [input, setInput] = useState("");

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    return (
        <div style={{backgroundColor: "#E8F6FF", height: "100vh", margin: "0", padding: "0", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <br />
        <input type="text"
         placeholder={Placeholder}
         color='#FFFFFF'
          onChange={handleChange}
          value={input}  
          style={{width: "502px",
             height: "61px",
              borderRadius: "10px",
               textIndent: '30px',
                fontFamily: "Sofia Pro",
                 color: "#898989",
                  fontStyle: 'italic',
                   fontWeight: 400,
                   lineHeight: '20px',
                     fontSize: '20px',
                 }}
          />
        </div>
    );
}