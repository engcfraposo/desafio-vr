import { theme } from "../../common/theme";
import { Card } from "../../common/zod";
import * as S from "./styled";

interface Props {
  card: Card,
  testId: string,
}

const CreditCard = ({ card, testId }:Props) => {
  const lastDigit = card.number.slice(-1);

  let cardType = {
    name: "Black Card",
    backgroundColor: "#000",
    fontColor: "#FFF",
  }

  if (/[0-4]/.test(lastDigit)) {
    cardType = {
      name: "Green Card",
      backgroundColor: "#A5FF32",
      fontColor:"#000",
    }
  }

  if (/[5-7]/.test(lastDigit)) {
    cardType = {
      name: "Platinum Card",
      backgroundColor: "gray",
      fontColor: "#000",
    }
  }

  const maskedCardNumber = "****  ****  ****  " + card.number.slice(-4);
  return (
    <S.Card
      color={cardType.backgroundColor}
      testID={`${testId}-card`}
    >
      <S.Title
        style={theme.regular}
        color={cardType.fontColor}
        testID={`${testId}-card-title`}
      >
         {cardType.name}
      </S.Title>
      <S.Name
        style={theme.regular}
        color={cardType.fontColor}
        testID={`${testId}-card-name`}
      >
          {card.name}
      </S.Name>
      <S.Number
        style={theme.regular}
        color={cardType.fontColor}
        testID={`${testId}-card-number`}
      >
          {maskedCardNumber}
      </S.Number>
      <S.ValidDate
        style={theme.regular}
        color={cardType.fontColor}
        testID={`${testId}-card-validDate`}
      >
          {card.validDate}
      </S.ValidDate>
    </S.Card>
  );
}

export default CreditCard;
