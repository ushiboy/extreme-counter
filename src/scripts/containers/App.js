import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { match, navigate } from 'redux-routing';

class App_ extends React.Component {

  render() {
    const { route, routes } = this.props;
    const matched = match(route.href, routes);
    if (matched) {
      return (
        <div>
          <ul>
            <li><a href="/" onClick={this.handleLink.bind(this)}>Home</a></li>
            <li><a href="/about" onClick={this.handleLink.bind(this)}>About</a></li>
          </ul>
          <matched.handler {...this.props} />
        </div>
      );
    } else {
      return <h1>404 not found</h1>;
    }
  }

  handleLink(e) {
    e.preventDefault();
    this.props.actions.navigate(e.target.href);
  }

}

function mapStateToProps(state, props) {
  const { routes } = props;
  const { route } = state;
  return { route, routes };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      navigate
    }, dispatch)
  };
}

const App = connect(mapStateToProps, mapDispatchToProps)(App_);

export default App;
