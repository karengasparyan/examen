import React, { Component } from 'react';
import { connect } from 'react-redux';

class Error404 extends Component {
  render() {
    return (
      <>
        <h1>ERROR 404!</h1>
      </>
    );
  }
}

const mapStateToProps = () => ({

});
const mapDispatchToProps = {

};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Error404);

export default Container;
