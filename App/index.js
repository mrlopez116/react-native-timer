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
	buttonStop: {
		borderColor: '#FF851B'
	},
	buttonText: {
		fontSize: 45,
		color: '#89AAFF'
	},
	buttonTextStop: {
		fontSize: 45,
		color: '#FF851B'
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
		remainingSeconds: 5,
		isRunning: false
	};
	interval = null; // To make sure that interval is null

	componentDidUpdate(prevProp, prevState) {
		// Check we are that there are 0 remaining seconds
		// Check we have already reached zero so that `this.stop()` is not called infinietly.
		if (this.state.remainingSeconds === 0 && prevState.remainingSeconds !== 0) {
			this.stop();
		}
	}

	// Lifestyle method
	componentWillUnmount() {
		if (this.interval) {
			clearInterval(this.interval);
		}
	}
	// Handles the starting of the timer
	// Called By: Button in the return
	start = () => {
		// The moment that the button is pressed count down by one and track this in state.
		this.setState(state => ({
			remainingSeconds: state.remainingSeconds - 1,
			isRunning: true
		}));
		// Once we have started counting down, start an interval and updated the
		// text every second, always subtracting the new numbwer
		this.interval = setInterval(() => {
			this.setState(state => ({
				remainingSeconds: state.remainingSeconds - 1
			}));
		}, 1000);
	};

	stop = () => {
		clearInterval(this.interval); // Clears interval to clear memory
		this.interval = null;
		this.setState({
			remainingSeconds: 5,
			isRunning: false
		});
	};

	render() {
		const { minutes, seconds } = getRemaining(this.state.remainingSeconds);
		return (
			<View style={styles.container}>
				<StatusBar barStyle='light-content' />
				<Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
				{this.state.isRunning ? (
					<TouchableOpacity onPress={this.stop} style={[ styles.button, styles.buttonStop ]}>
						<Text style={[ styles.buttonText, styles.buttonTextStop ]}>Stop</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity onPress={this.start} style={styles.button}>
						<Text style={styles.buttonText}>Start</Text>
					</TouchableOpacity>
				)}
			</View>
		);
	}
}
