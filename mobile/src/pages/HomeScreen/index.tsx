
import Button from "../../components/Button";
import Container from "../../components/Container";

const HomeScreen = () => {
    return (
        <Container 
            title="Wallet Test" 
            testID='loginScreen'
        >
            <Button 
                background="#12C2E9" 
                color="#fff" 
                text="Meus Cartões" 
            />
            <Button 
                background="#A5FF32" 
                color="#000" 
                text="Cadastrar Cartão" 
            />
      </Container>
      );
}

export default HomeScreen;