import * as S from './styled';
import Button from '../../components/Button';
import CreditCard from '../../components/CreditCard';
import MyCardContainer from '../../components/MyCardContainer';
import React from 'react';
import Toast from 'react-native-toast-message';
import { Card } from '../../common/zod';

const PayScreen: React.FC = ({ route, navigation}) => {
  const { id, cards } = route.params;
  const card: Card = cards.find((c: { id: string; }) => c.id === id);
  const nextCardList = cards.filter((c: { id: string; }) => c.id !== id);
  const nextCard = nextCardList[0];
  const maskedCardNumber = "****  ****  ****  " + card.number.slice(-4);
  const handlePress = () => {
    Toast.show({
      type: 'success',
      text1: 'Pagamento realizado com sucesso',
      text2: `${maskedCardNumber} - ${card.name}`,
      visibilityTime: 2000,
    })
  }
  const handleNextPress = () => {
    navigation.navigate('PayScreen', { id: nextCard.id, cards: [...nextCardList, card]})
  }
  return (
    <MyCardContainer testId={"payScreen"}>
      <S.CardView>
      <CreditCard
        card={card}
        testId='payScreen'
      />
      <Button
        colors={'primary'}
        text={'pagar com esse cartão'}
        testId={'payScreen'}
        onPress={handlePress}
      />
      </S.CardView>
      <S.NextCardView onPress={handleNextPress}>
        <CreditCard
          card={nextCard}
          testId='payScreen_nextCard'
        />
      </S.NextCardView>
    </MyCardContainer>
  );
}

export default PayScreen;
