import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Counter from '../components/Counter';
import { plusCounter, minusCounter, fetchCountIfNeeded } from '../actions/count';
import { unlock, lock } from '../actions/session';

class Index_ extends React.Component {

  componentDidMount() {
    this.props.actions.fetchCountIfNeeded();
  }

  render() {
    const { authenticated } = this.props;
    const button = authenticated ?
      <button onClick={this.handleLock.bind(this)}>Lock</button> :
      <button onClick={this.handleUnlock.bind(this)}>Unlock</button>;

    return (
      <div>
        <Counter count={this.props.count}
          enablePlus={authenticated}
          enableMinus={authenticated}
          onPlusClick={this.handlePlus.bind(this)}
          onMinusClick={this.handleMinus.bind(this)} />
        {button}
      </div>
    );
  }

  handlePlus() {
    this.props.actions.plusCounter();
  }

  handleMinus() {
    this.props.actions.minusCounter();
  }

  handleUnlock() {
    this.props.actions.unlock();
  }

  handleLock() {
    this.props.actions.lock();
  }

}

function mapStateToProps(state) {
  const { count, session: { authenticated } } = state;
  return { count, authenticated };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      lock,
      unlock,
      fetchCountIfNeeded,
      plusCounter,
      minusCounter
    }, dispatch)
  };
}

const Index = connect(mapStateToProps, mapDispatchToProps)(Index_);

export default Index;
