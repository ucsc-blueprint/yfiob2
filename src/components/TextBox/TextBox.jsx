// Incorporate useStates to save the user's input
'use client';

export default function TextBox({Placeholder, onChange, value, id}) {


    return (
        <>
        <input 
        type="text"
         placeholder={Placeholder}
         color='#FFFFFF'  
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
            onChange={onChange}
            value={value}
		    id={id}
          />
          </>
        
    );
}