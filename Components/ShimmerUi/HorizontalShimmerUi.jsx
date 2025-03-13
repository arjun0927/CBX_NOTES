import { StyleSheet, View } from 'react-native';
import React from 'react';
import { rS, rVS } from '../Utils/Responsive';
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";

const HorizontalShimmerUi = ({ loading }) => {
  return (
    <View style={styles.shimmerCard}>
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.shimmerTitle}
            autoRun={true}
            visible={!loading}
          />
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.shimmerContentSmall}
            autoRun={true}
            visible={!loading}
          />
		  <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.shimmerContentSmall}
            autoRun={true}
            visible={!loading}
          />
		  
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.shimmerContentMedium}
            autoRun={true}
            visible={!loading}
          />
        </View>
        
        <View style={styles.rightContainer}>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={styles.shimmerIconsContainer}
            autoRun={true}
            visible={!loading}
          />
        </View>
      </View>
      
      <View style={styles.footerContainer}>
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={styles.shimmerFooter}
          autoRun={true}
          visible={!loading}
        />
      </View>
    </View>
  );
};

export default HorizontalShimmerUi;

const styles = StyleSheet.create({
  shimmerCard: {
    width: '100%',
	height: rVS(197),
    borderRadius: 10,
    backgroundColor: "#FFF",
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 20,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  contentContainer: {
    flexDirection: "column",
    flex: 3,
    justifyContent: 'flex-start',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  shimmerIconsContainer: {
    width: 60,
    height: 25,
    borderRadius: 4,
  },
  shimmerTitle: {
    width: "80%",
    height: 16,
    borderRadius: 4,
    marginBottom: 12,
  },
  shimmerContentSmall: {
    width: "80%",
    height: 12,
    borderRadius: 4,
    marginBottom: 10,
  },
  shimmerContentMedium: {
    width: "90%",
    height: 40,
    borderRadius: 4,
    marginBottom: 8,
  },
  footerContainer: {
    width: "100%",
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shimmerFooter: {
    width: "100%",
    height: 50,
    borderRadius: 5,
  },
});