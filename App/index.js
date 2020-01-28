import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Dimensions } from 'react-native';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		flex: 1, // Tells it to take up the entirety of the avilable area.
		backgroundColor: '#07121B',
		alignItems: 'center', // Horizontally center content
		justifyContent: 'center'
	},
	button: {
		borderWidth: 10,
		borderColor: '#89AAFF',
		width: screen.width / 2,
		height: screen.width / 2,
		borderRadius: screen.width / 2,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 30
	},
	buttonText: {
		fontSize: 45,
		color: '#89AAFF'
	},
	timerText: {
		color: '#fff',
		fontSize: 90
	}
});

const getRemaining = time => {
	const minutes = Math.floor(time / 60); // There are 60 seconds in a minute
	const seconds = time - minutes * 60;
	return { minutes: formatNumber(minutes), seconds: formatNumber(seconds) };
};
// This function formats the number as such:
// 3 => 03, 10 => 10
const formatNumber = number => `0${number}`.slice(-2); // We get the last 2 numbers

export default class App extends React.Component {
	state = {
		remainingSeconds: 5
	};

	start = () => {
		this.setState(state => ({
			remainingSeconds: state.remainingSeconds - 1
		}));
	};

	render() {
		const { minutes, seconds } = getRemaining(this.state.remainingSeconds);
		return (
			<View style={styles.container}>
				<StatusBar barStyle='light-content' />
				<Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
				<TouchableOpacity onPress={this.start} style={styles.button}>
					<Text style={styles.buttonText}>Start</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
