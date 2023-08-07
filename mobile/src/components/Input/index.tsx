import * as S from './styled';
import { TextInputProps } from 'react-native';
import { theme } from '../../common/theme';
import { useState } from 'react';

interface Props extends TextInputProps {
  label: string;
  value: any;
  onChange: (name: string, value: any) => void;
  name: string;
  placeholder: string;
  testId: string;
}

const Input = ({
  label,
  value,
  placeholder,
  onChange,
  name,
  testId,
  ...props
}: Props) => {
  const [maskedValue, setMaskedValue] = useState(value);

  const handleInputChange = (text: string) => {
    let unmaskedText;
    if (name === 'number') {
      unmaskedText = text.replace(/\D/g, '').slice(0, 16).trim();
      setMaskedValue(
        unmaskedText.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4'),
      );
    } else if (name === 'validDate') {
      const date = text.replace(/\D/g, '').slice(0, 4).trim();
      const day = date.slice(0, 2);
      const month = date.slice(2, 4);
      unmaskedText = `${day}/${month}`;
      setMaskedValue(unmaskedText);
    } else if (name === 'cvv') {
      unmaskedText = text.replace(/\D/g, '').slice(0, 3).trim();
      setMaskedValue(unmaskedText);
    } else {
      unmaskedText = text;

      setMaskedValue(unmaskedText.replace(/[^a-zA-Z\s]/g, ''));
    }
    onChange(name, unmaskedText);
  };

  return (
    <S.InputContainer testID={`${testId}-inputContainer-${name}`}>
      <S.Label
        style={theme.regular}
        testID={`${testId}-label-${name}`}
      >
          {label}
      </S.Label>
      <S.Field
        testID={`${testId}-field-${name}`}
        value={maskedValue}
        placeholder={placeholder}
        onChangeText={handleInputChange}
        style={theme.regular}
        {...props}
      />
    </S.InputContainer>
  );
};

export default Input;
