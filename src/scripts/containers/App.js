import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Counter from '../components/Counter';
import { plusCounter, minusCounter } from '../actions/count';

class App_ extends React.Component {

  render() {
    return (
      <Counter count={this.props.count}
        onPlusClick={this.handlePlus.bind(this)}
        onMinusClick={this.handleMinus.bind(this)} />
    );
  }

  handlePlus() {
    this.props.actions.plusCounter();
  }

  handleMinus() {
    this.props.actions.minusCounter();
  }

}

function mapStateToProps(state) {
  const { count } = state;
  return { count };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      plusCounter,
      minusCounter
    }, dispatch)
  };
}

const App = connect(mapStateToProps, mapDispatchToProps)(App_);

export default App;
