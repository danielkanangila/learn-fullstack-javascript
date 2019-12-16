import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import ContestList from './contestList';
import Contest from './Contest';
import * as api from '../api';

const pushState = (obj, url) => {
    console.log(url);
    window.history.pushState(obj, null, url);
};

const onPopState = handler => {
    window.onpopstate = handler;
};

class App extends React.Component {
    static propTypes = {
        initialData: PropTypes.object.isRequired,
    }
    state = this.props.initialData;
    componentDidMount() {
        onPopState((event) => {
            this.setState({
                currentContestId: (event.state || {}).currentContestId,
            });
        });
    }
    componentWillUnmount() {
        // remove timers or listeners
        onPopState(null);
    }
    fetchContest = (contestId) => {

        pushState(
            {currentContestId: contestId},
            `/contest/${contestId}`,
        );

        api.fetchContest(contestId).then(contest => {
            this.setState({
                currentContestId: contest.id,
                contests: {
                    ...this.state.contests,
                    [contest.id]: contest,
                },
            });
        });
    }
    fetchContestList = () => {

        pushState(
            {currentContestId: null},
            '/',
        );

        api.fetchContestList().then(contests => {
            this.setState({
                currentContestId: null,
                contests,
            });
        });
    }
    pageHeader() {
        if (this.state.currentContestId) {
            return this.currentContest().contestName;
        } 
        
        return 'Naming Contests';
    }
    currentContest() {
        return this.state.contests[this.state.currentContestId];
    }
    currentContent() {
        if (this.state.currentContestId) {
            return <Contest 
            onContestListClick={this.fetchContestList}
                {...this.currentContest()} />;
        }
        
        return <ContestList
                    onContestClick={this.fetchContest} 
                    contests={this.state.contests} />;
    }
    render() {
        return (
            <div className="app">
                <Header pageHeader={this.pageHeader()} /> 
                <div className="container">
                    {this.currentContent()}
                </div>
            </div>
        );
    }
}

export default App;