import React, { useState } from "react";
import styled from "styled-components";
import useCurationCreateStore from "./CurationCreateStore";

const DatePickerContainer = styled.div`
  display: flex;
  width: 1000px;
  justify-content: space-between;
  margin: 20px auto;
`;

const DateInput = styled.input`
  width: 48%;
  height: 40px;
  font-size: 16px;
  color: #212529;
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  padding: 8px;
  outline: none;
`;

const CurationCreateDatePicker = () => {
  const { data, setData } = useCurationCreateStore();
  const [startDate, setStartDate] = useState(data.startDate ? data.startDate.toISOString().slice(0, 10) : "");
  const [endDate, setEndDate] = useState(data.endDate ? data.endDate.toISOString().slice(0, 10) : "");

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    setStartDate(e.target.value);
    setData({ startDate: selectedDate });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    setEndDate(e.target.value);
    setData({ endDate: selectedDate });
  };

  return (
    <DatePickerContainer>
      <DateInput
        type="date"
        value={startDate}
        onChange={handleStartDateChange}
        placeholder="시작일"
      />
      <DateInput
        type="date"
        value={endDate}
        onChange={handleEndDateChange}
        placeholder="종료일"
      />
    </DatePickerContainer>
  );
};

export default CurationCreateDatePicker;
