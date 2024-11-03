//redux is used to maintain the global state.

import { createSlice } from "@reduxjs/toolkit";

// createSlice is a helper function from Redux Toolkit.
// It helps define a slice of the Redux state,
// along with actions and reducers, all in one go.

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
  },
  reducers: {
    //actions
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
        state.user = action.payload
    }
  },
});

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;

// authSlice defines a slice of
// the Redux store for tracking loading state in the auth process.

// Redux is a state management library.
// It’s used to help manage and centralize the state of an application,
// specially useful when the state becomes complex or needs to be shared
// across multiple components in an app.
