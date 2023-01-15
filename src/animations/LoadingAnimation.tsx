import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { View } from '../components/Themed';

export default function LoadingAnimation() {
  return (
    <View>
      <LottieView
        source={require("../assets/icons/loading_icon.json")}
        style={styles.animation}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 220,
    height: 220,
  },
});
