import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { View } from '../components/Themed';

export default function UploadAnimation() {
  return (
    <View>
      <LottieView
        source={require("../assets/icons/upload_icon.json")}
        style={styles.animation}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 200,
    height: 200,
  },
});
