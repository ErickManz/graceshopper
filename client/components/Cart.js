import React from 'react';
import { connect } from 'react-redux';
import { fetchItems } from '../store/cart';

export class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: '',
    };
  }

  componentDidMount() {
    fetchItems();
  }

  render() {
    console.log(this.props);
    return <div></div>;
  }
}

const mapStateToProps = (state) => {
  return {
    item: state.item,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItems: () => dispatch(fetchItems()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
