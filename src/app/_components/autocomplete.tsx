import React, { useState } from 'react';
import Select from 'react-select';

const Autocomplete = ({ data, onChange ,msgLabel,selectedOption,setSelectedOption}:any) => {
  //const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption:any) => {
    setSelectedOption(selectedOption);
    onChange(selectedOption);
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={data}
      isSearchable
      placeholder={msgLabel}
      noOptionsMessage={() => "No hay datos"}
      isClearable
    />
  );
};

export default Autocomplete;
