/* import { connect } from "react-redux";
import Link from "./Link";
import { setVisibilityFilter } from "../actions/index";

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick() {
    dispatch(setVisibilityFilter(ownProps.filter));
  },
  //onClick: () => {dispatch(setVisibilityFilter(ownProps.filter))}, // this line gets replaced by the previous one which is the same using ES6 syntax.
});
export default connect(mapStateToProps, mapDispatchToProps)(Link); */
import React from "react";
import { NavLink } from "react-router-dom";

const FilterLink = ({ filter, children }) => (
  <NavLink
    to={filter === "all" ? "" : filter}
    activeStyle={{
      textDecoration: "none",
      color: "black",
    }}
  >
    {children}
  </NavLink>
);
export default FilterLink;
