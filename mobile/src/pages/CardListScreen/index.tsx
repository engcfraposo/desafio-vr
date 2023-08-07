import * as S from './styled';
import CreditCard from '../../components/CreditCard';
import LottieView from 'lottie-react-native';
import MyCardContainer from '../../components/MyCardContainer';
import React, { useEffect, useRef } from 'react';
import Swiper from 'react-native-deck-swiper';
import walletJson from '../../assets/animation_lkzh9akz.json';
import { fetchCardThunk } from '../../store/cards/thunk';
import { RootState } from '../../store';
import { theme } from '../../common/theme';
import { useDispatch, useSelector } from 'react-redux';

const CardListScreen = ({ navigation }) => {
  const wallet = useRef<LottieView>(null);
  const dispatch = useDispatch();
  const { cards } = useSelector((state: RootState)=> state.cards)
  useEffect(()=>{
    dispatch(fetchCardThunk());
  },[])

  const handleTapCard = (cardIndex: number) => {
    navigation.navigate("PayScreen", { id: cards[cardIndex].id, cards})
  }

  if (cards.length === 0) {
    return (
      <MyCardContainer testId={"cardListScreen"}>
        <LottieView
        autoPlay
        testID='cardListScreen-walletAnimation'
        loop={false}
        ref={wallet}
        style={{
          width: 200,
          height: 200,
          backgroundColor: 'transparent',
          elevation: 4,
          zIndex: 2,
        }}
        source={walletJson}
        />
        <S.Text style={theme.regular}>
          Ops... não encontramos o seu cartão
        </S.Text>
      </MyCardContainer>
    );
  }
  return (
  <MyCardContainer testId={"cardListScreen"}>
     <S.CardList>
    <Swiper
      cards={cards}
      renderCard={
        (card) => <CreditCard card={card} testId={"cardListScreen"}/>
      }
      stackSize={cards.length < 3? cards.length: 3}
      infinite
      stackSeparation={-60}
      testID='cardListScreen-swiper'
      backgroundColor="transparent"
      cardVerticalMargin={10}
      verticalSwipe={false}
      onTapCard={(cardIndex) => handleTapCard(cardIndex)}
      cardStyle={{
        paddingTop: 20,
        marginTop: 240,
      }}
      keyExtractor={(card) => card.id as string}
    />
    <S.CardListFooter>
      <S.Text style={theme.regular}>usar este cartão</S.Text>
    </S.CardListFooter>
   </S.CardList>
  </MyCardContainer>
  );
}

export default CardListScreen;
