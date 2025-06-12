import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { 
    useAnimatedStyle, 
    withRepeat, 
    withTiming, 
    useSharedValue, 
    withSequence 
} from 'react-native-reanimated';
import { rVS } from '../../Utils/Responsive';

const { width } = Dimensions.get('window');

const ShimmerCard = ({ listView }) => {
    const shimmerValue = useSharedValue(0);

    React.useEffect(() => {
        shimmerValue.value = withRepeat(
            withSequence(
                withTiming(1, { duration: 1000 }),
                withTiming(0, { duration: 1000 })
            ),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: shimmerValue.value,
        };
    });

    return (
        <View style={[styles.card, listView && styles.listCard]}>
            <View style={styles.content}>
                <Animated.View style={[styles.shimmer, animatedStyle]}>
                    <LinearGradient
                        colors={['#f0f0f0', '#e0e0e0', '#f0f0f0']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradient}
                    />
                </Animated.View>
                <View style={styles.titleShimmer} />
                <View style={styles.textShimmer} />
                <View style={styles.textShimmer} />
            </View>
            <View style={styles.bottomShimmer} />
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 10,
        width: '100%',
        height: rVS(197),
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10,
    },
    listCard: {
        width: '100%',
    },
    content: {
        flex: 1,
    },
    shimmer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    gradient: {
        flex: 1,
    },
    titleShimmer: {
        height: rVS(15),
        width: '80%',
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        marginBottom: 10,
    },
    textShimmer: {
        height: 10,
        width: '60%',
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        marginTop: 8,
    },
    bottomShimmer: {
        height: 30,
        width: '100%',
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        marginTop: 'auto',
    },
});

export default ShimmerCard; 