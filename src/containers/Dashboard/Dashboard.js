import React, { Component } from "react";
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';

import Match from "../../components/Match/Match";
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Dashboard.css';

import { loadData, submitExpectations } from "../../store/actions/fixture";

class Dashboard extends Component {

	constructor(props) {
		super(props);
	};

	componentDidMount() {
		this.props.onLoadData(
			this.props.token,
			this.props.userId,
		);
	};

	submitExpectationsHandler = () => {
		alert("Submitting expectations" +
			this.props.userId
		);
		this.props.onSubmitExpectations(
			this.props.token,
			this.props.userId,
		);
	};

	render() {
		let content = <Spinner />;
		let submitResultButton = null;

		if (!this.props.ui.isLoading
				&& this.props.fixture
				&& this.props.expectations) {

			content = [];
			Object.keys(this.props.fixture).forEach((groupIndex) => {

				let matches = [];
				this.props.fixture[groupIndex].matches.forEach((match, matchIndex) => {
					matches.push(
						<Match
							key={matchIndex}
							group={groupIndex}
							match={matchIndex}
							{...match}
						/>
					);
				});

				content.push(
					<div
						key={groupIndex}
						className={classes.groupContainer}>
						<span className={classes.groupName}>{this.props.fixture[groupIndex].name}</span>
						{matches}
					</div>
				)

			});

			submitResultButton = (
				<Button
					style={{
						margin: 50,
					}}
					color="primary"
					onClick={this.submitExpectationsHandler}
				>Submit Expectations
				</Button>
			)
		}

		return (
			<div className={classes.container}>
				{content}
				{submitResultButton}
			</div>
		);
	}
}

const mapStateProps = state => {
	return {
		fixture: state.fixture.fixture,
		expectations: state.fixture.expectations,
		ui: state.ui,
		token: state.auth.token,
		userId: state.auth.userId
	}
};

const mapDispatchToProps = dispatch => {
	return {
		onLoadData: (token, userId) => {dispatch(loadData(token, userId))},
		onSubmitExpectations: (token, userId) => {dispatch(submitExpectations(token, userId))},
	}
};

export default connect(mapStateProps, mapDispatchToProps)(Dashboard);
