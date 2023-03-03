import React from "react";
import "./Input.css";

type InputProps = {
    onChange: (event) => void,
    label: string,
    name: string,
    type: string,
}
export const Input: React.FC<InputProps> = ({ onChange, type, name, label }) => (
  <div className="content">
    <label htmlFor={name}>{label}:</label>
    <input className="input" id={name} name={name} type={type} onChange={onChange} />
  </div>
);
