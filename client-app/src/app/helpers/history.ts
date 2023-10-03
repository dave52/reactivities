/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigateFunction, Location } from "react-router-dom";

type History = {
  navigate: NavigateFunction | null;
  location: Location<any> | null;
}

export const history: History = {
  navigate: null,
  location: null
};