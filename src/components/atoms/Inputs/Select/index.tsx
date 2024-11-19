import styled from "styled-components";
import { inputBaseStyle } from "../styles";

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const Select = styled.select`
  ${inputBaseStyle};
`;

interface Option {
  value: string;
  label: string;
}

interface SelectComponentProps {
  placeholder: string;
  options: Option[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  placeholder,
  options,
  value,
  onChange,
}) => {
  return (
    <SelectWrapper>
      <Select onChange={onChange} value={value}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </SelectWrapper>
  );
};

export default SelectComponent;
