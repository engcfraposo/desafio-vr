import * as S from './styled';
import Button from '../../components/Button';
import CreditCard from '../../components/CreditCard';
import MyCardContainer from '../../components/MyCardContainer';
import React from 'react';
import Toast from 'react-native-toast-message';
import { Card } from '../../common/zod';
import { useNavigation, useRoute } from '@react-navigation/native';

type ParamsProps = {
  id: string;
  cards: Card[];
}

const PayScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, cards } = route.params as ParamsProps;
  const card = cards.find((c) => c.id === id) as Card;
  const nextCardList = cards.filter((c) => c.id !== id);
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
    navigation.navigate('PayScreen', {
      id: nextCard.id as string,
      cards: [...nextCardList, card]
    })
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
      { cards.length > 1 && (
        <S.NextCardView onPress={handleNextPress} testID='payScreen_nextCard_button'>
        <CreditCard
          card={nextCard}
          testId='payScreen_nextCard'
        />
      </S.NextCardView>
      )}
    </MyCardContainer>
  );
}

export default PayScreen;
