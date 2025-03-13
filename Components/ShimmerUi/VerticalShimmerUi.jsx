import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { rS, rVS } from '../Utils/Responsive'
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";

const VerticalShimmerUi = ({loading}) => {
  return (
	<View style={styles.shimmerCard}>
			<View style={styles.contentContainer}>
				<ShimmerPlaceholder
					LinearGradient={LinearGradient}
					style={styles.shimmerTitle}
					autoRun={true}
					visible={!loading}
				/>
				<ShimmerPlaceholder
					LinearGradient={LinearGradient}
					style={styles.shimmerContent}
					autoRun={true}
					visible={!loading}
				/>
				
				<ShimmerPlaceholder
					LinearGradient={LinearGradient}
					style={styles.shimmerContentSmall}
					autoRun={true}
					visible={!loading}
				/>
			</View>

			<View style={styles.extraBox}>
				<ShimmerPlaceholder
					LinearGradient={LinearGradient}
					style={styles.shimmerFooter}
					autoRun={true}
					visible={!loading}
				/>
			</View>
		</View>
  )
}

export default VerticalShimmerUi

const styles = StyleSheet.create({
	shimmerCard: {
		width: rS(160),
		height: rVS(175),
		borderRadius: 10,
		backgroundColor: "#FFF",
		padding: 10,
		marginHorizontal: 5,
		marginBottom: 0,
		flexDirection: "column",
		justifyContent: "space-between",
	},
	contentContainer: {
		flexDirection: "column",
	},
	extraBox: {
		marginTop: 10,
		width: "100%",
		alignItems: "center",
	},
	shimmerTitle: {
		width: "70%",
		height: 12,
		borderRadius: 4,
		marginBottom: 6,
	},
	shimmerContent: {
		width: "100%",
		height: 30,
		borderRadius: 4,
		marginBottom: 8,
	},
	shimmerFooter: {
		width: "90%",
		height: 20,
		borderRadius: 5,
	},
	shimmerContentSmall: {
		width: "80%",
		height: 18,
		borderRadius: 4,
		marginBottom: 6,
	},
})