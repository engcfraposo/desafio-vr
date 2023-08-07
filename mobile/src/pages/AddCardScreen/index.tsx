import Button from '../../components/Button';
import Container from '../../components/Container';
import Input from '../../components/Input';
import { Card, validationSchema } from '../../common/zod';
import { Keyboard } from 'react-native';
import { newForm } from '../../store/cards';
import { postCardThunk } from '../../store/cards/thunk';
import { RootState } from '../../store';
import { RowContainer } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';


const AddCardScreen = () => {
  const navigation  = useNavigation();
  const dispatch = useDispatch();
  const cards = useSelector((state: RootState) => state.cards);
  const [values, setValues] = useState<Card>({
    id: null,
    number: '',
    cvv: '',
    name: '',
    validDate: '',
  });

  const handleSubmit = () => {
    try {
      Keyboard.dismiss();
      dispatch(postCardThunk(values));
    } catch (error: any) {
      console.error('Form validation error:', error.message);
    }
  };

  const handleChange = (name: string, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    try {
      validationSchema.parse(values);
      return true;
    } catch (error: any) {
      return false;
    }
  };

  useEffect(() => {
    if (cards.post === 'fulfilled') {
      navigation.navigate('ConfirmCardScreen', values);
    }
  }, [cards.post]);

  useEffect(() => {
    dispatch(newForm());
  });

  return (
    <Container title="Wallet Test" testId="addCardScreen">
      <Input
        testId="addCardScreen"
        name="number"
        label="número do cartão"
        placeholder="0000 0000 0000 0000"
        value={values.number}
        onChange={handleChange}
        keyboardType="numeric"
      />
      <Input
        testId="addCardScreen"
        name="name"
        label="nome do titular do cartão"
        placeholder="Joe Doe"
        value={values.name}
        onChange={handleChange}
        keyboardType="default"
      />
      <RowContainer>
        <Input
          testId="addCardScreen"
          name="validDate"
          label="vencimento"
          placeholder="00/00"
          value={values.validDate}
          onChange={handleChange}
          keyboardType="numeric"
        />
        <Input
          testId="addCardScreen"
          name="cvv"
          placeholder="000"
          label="código de segurança"
          value={values.cvv}
          onChange={handleChange}
          keyboardType="numeric"
        />
      </RowContainer>
      <Button
        colors="primary"
        text="avançar"
        testId="addCardScreen"
        onPress={handleSubmit}
        disabled={!isFormValid()}
        loading={cards.loading}
      />
    </Container>
  );
};

export default AddCardScreen;
