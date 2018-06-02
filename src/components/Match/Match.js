import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import { updateExpectation } from "../../store/actions/fixture";
import classes from './Match.css';

class Match extends Component {

	handleExpectationUpdate = team => event => {

		let newValue = event.target.value && parseInt(event.target.value) >= 0 ?
			parseInt(event.target.value) :
			null;

		this.props.onUpdateExpectation(
			this.props.group,
			this.props.match,
			{ [team]: newValue }
		)
	};

	render() {

		const {
			group,
			match,
			expectations,
			home_team,
			away_team,
			home_result,
			away_result,
			finished,
			date,
		} = this.props;

		const disabled = finished || new Date() >= new Date(date);

		return (
			<div className={classes.container}>
				<div className={classes.expectation}>
					<div className={classes.team}>
						<span className={classes.emojiString}>{home_team.emojiString}</span>
						<span>{home_team.fifaCode}</span>
					</div>
					<div className={classes.inputContainer}>
						<TextField
							disabled={disabled}
							inputStyle={{ textAlign: 'center' }}
							InputProps={{
								disableUnderline: true,
								className: classes.inputEnabled
							}}
							id="number"
							value={
								expectations[group].matches[match].home_expected_result || ""
							}
							onChange={this.handleExpectationUpdate("home_expected_result")}
							type="number"
							InputLabelProps={{
								shrink: true,
							}}
							margin="normal"
						/>

						<TextField
							disabled={disabled}
							InputProps={{
								disableUnderline: true,
								className: classes.inputEnabled
							}}
							id="number"
							value={
								expectations[group].matches[match].away_expected_result || ""
							}
							onChange={this.handleExpectationUpdate("away_expected_result")}
							type="number"
							InputLabelProps={{
								shrink: true,
							}}
							margin="normal"
						/>
					</div>
					<div className={classes.team}>
						<span>{away_team.fifaCode}</span>
						<span className={classes.emojiString}>{away_team.emojiString}</span>
					</div>
				</div>
				{ finished ?
						<p style={{textAlign: "center"}}>Finished<br/>{home_result}:{away_result}</p> :
						<p style={{textAlign: "center"}}>{new Date(date).toLocaleDateString()}<br/>{new Date(date).toLocaleTimeString()}</p>
				}
			</div>
		);
	}
}

const mapStateProps = state => {
	return {
		expectations: state.fixture.expectations,
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onUpdateExpectation: (group, match, expectation) => {dispatch(updateExpectation(group, match, expectation))}
	}
};

export default connect(mapStateProps, mapDispatchToProps)(Match);
