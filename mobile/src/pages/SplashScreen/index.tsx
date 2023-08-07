import React, { useRef } from 'react';
import Container from '../../components/Container';
import LottieView from 'lottie-react-native';
import animationJson from '../../assets/animation_lkwmzvq6.json';
import walletJson from '../../assets/animation_lkwozeu0.json';

const SplashScreen: React.FC = () => {
  const animation = useRef(null);
  const wallet = useRef(null);
  return (
    <Container title="" testId="splashScreen">
      <LottieView
        autoPlay
        testID='splashScreen_wallet'
        ref={wallet}
        style={{
          width: 200,
          height: 200,
          backgroundColor: 'transparent',
          elevation: 4,
          zIndex: 2,
          top: -20,
        }}
        source={walletJson}
      />
      <LottieView
        autoPlay
        testID='splashScreen_animation'
        ref={animation}
        style={{
          width: 800,
          height: 800,
          backgroundColor: 'transparent',
          position: 'absolute',
        }}
        source={animationJson}
      />
    </Container>
  );
};

export default SplashScreen;
