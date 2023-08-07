import * as S from './styled';
import Button from '../../components/Button';
import Container from '../../components/Container';
import CreditCard from '../../components/CreditCard';
import { theme } from '../../common/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Card } from '../../common/zod';

const ConfirmCardScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const card = route.params;
  const handleSubmit = () => {
     navigation.navigate("CardListScreen")
  };

  return (
    <Container title="Wallet Test" testId="ConfirmCardScreen">
      <S.SubTitle
        style={theme.regular}
        testID="ConfirmCardScreen_subTitle">
          cartão cadastrado com sucesso
      </S.SubTitle>
      <CreditCard
        card={card as Card}
        testId='ConfirmCardScreen'
      />
      <Button
        colors="primary"
        text="avançar"
        testId="ConfirmCardScreen"
        onPress={handleSubmit}
      />
    </Container>
  );
};

export default ConfirmCardScreen;
