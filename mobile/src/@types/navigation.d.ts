export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      ConfirmCardScreen: Card;
      AddCardScreen: undefined;
      CardListScreen: undefined;
      HomeScreen: undefined;
      PayScreen: {
        id: string;
        cards: Card[];
      }
    }
  }
}
