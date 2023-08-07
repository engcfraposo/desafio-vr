import Button from '../../components/Button';
import Container from '../../components/Container';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const  navigation  = useNavigation();
    return (
        <Container
            title="Wallet Test"
            testId='loginScreen'
        >
            <Button
                colors='primary'
                text="Meus Cartões"
                testId='loginScreen'
                onPress={()=> navigation.navigate('CardListScreen')}
            />
            <Button
                colors='secondary'
                text="Cadastrar Cartão"
                testId='loginScreen'
                onPress={()=> navigation.navigate('AddCardScreen')}
            />
      </Container>
      );
}

export default HomeScreen;
