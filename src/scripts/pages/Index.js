import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Counter from '../components/Counter';
import { plusCounter, minusCounter, fetchCountIfNeeded } from '../actions/count';

export default class Index_ extends React.Component {

  componentDidMount() {
    this.props.actions.fetchCountIfNeeded();
  }

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
      fetchCountIfNeeded,
      plusCounter,
      minusCounter
    }, dispatch)
  };
}

const Index = connect(mapStateToProps, mapDispatchToProps)(Index_);

export default Index;
