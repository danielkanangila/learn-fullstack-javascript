import React from 'react';
import Header from './Header';
import ContestList from './contestList';

class App extends React.Component {
    state = { 
        contests: this.props.initialContests, 
    }
    componentDidMount() {
        
    }
    componentWillUnmount() {
        // remove timers or listeners
    }
    render() {
        return (
            <div className="app">
                <Header message="Naming contest" /> 
                <div className="container">
                    <ContestList contests={this.state.contests} />
                </div>
            </div>
        );
    }
}

export default App;