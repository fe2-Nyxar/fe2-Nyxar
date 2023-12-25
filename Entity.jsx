import React from 'react';
import PropTypes from "prop-types";
function Entity(props) {
  return (
    <>
      Name: {props.name}<br/>
      Age: {props.age}<br/>
      Strong: {props.strong ? "Yes" : "No"}<br/>
      <hr/>
    </>
  );
}
Entity.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  strong: PropTypes.bool
}
Entity.defaultProps ={
  name: "Guest",
  age:0,
  strong: false
}

export default Entity;
