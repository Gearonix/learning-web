import { INCREASE_COUNT, DECREASE_COUNT } from "../constants";

export const increaseCount = () => ({
  type: INCREASE_COUNT,
});

export const decreaseCount = (data) => ({
  type: DECREASE_COUNT,
  data: data
});
