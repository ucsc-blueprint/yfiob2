// Incorporate useStates to save the user's input
'use client';

export default function TextBox({Placeholder, onChange, onFocus, onBlur, value, id, type}) {


    return (
        <>
        <input 
        type={type ? type : "text"}
        placeholder={Placeholder}
        color='#FFFFFF'
        className = "focus:outline-none"
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
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        id={id}
        />
        </>
        
    );
}