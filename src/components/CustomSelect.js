import React from "react";
import Select from "react-select";

export function CustomSelect({ name, options, value, placeholder, onBlur, onChange }) {
  const selectedOption = options.find(option => option.value === value);
  
  return (
    <Select
      name={name}
      options={options}
      value={selectedOption}
      placeholder={placeholder ? placeholder : "Seçiniz" }
      onBlur={onBlur}
      onChange={onChange}
      noOptionsMessage={() => "Kayıt Bulunamadı"} 
    />
  )
}