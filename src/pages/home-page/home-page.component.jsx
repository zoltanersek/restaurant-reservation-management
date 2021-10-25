import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateRestaurantNameStart } from "../../redux/user/user.actions";
import {
  selectCurrentUser,
  selectError,
} from "../../redux/user/user.selectors";

import "./home-page.styles.scss";

const HomePage = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const currentUser = useSelector(selectCurrentUser);
  const [field, setField] = useState(
    currentUser.restaurantName ? currentUser.restaurantName : ""
  );
  const restaurantName = currentUser.restaurantName;

  const handleChange = (e) => {
    const { value } = e.target;
    setField(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateRestaurantNameStart(currentUser, field));
  };

  return (
    <div className="welcome">
      <h2>Welcome, {currentUser.name}</h2>
      {!restaurantName && (
        <h3>You must set a restaurant name below to continue!</h3>
      )}
      {restaurantName && <span>You can update your restaurant name below</span>}
      {error && <span>{error}</span>}
      <form onSubmit={handleSubmit}>
        <label>Restaurant Name</label>
        <input
          type="text"
          name="restaurantName"
          value={field}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {restaurantName ? "Update restaurant name" : "Set restaurant name"}
        </button>
      </form>
    </div>
  );
};

export default HomePage;
