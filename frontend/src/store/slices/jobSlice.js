import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    singleJob: null,
    allAdminJobs: [],
    allJobs: [],
    appliedJobs: [],
    searchJobByText: "",
    searchQueryText: "",
  },

  reducers: {
    // ACTIONS
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },

    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },

    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },

    setAppliedJobs: (state, action) => {
      state.appliedJobs = action.payload;
    },

    searchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },

    setSearchQueryText: (state, action) => {
      state.searchQueryText = action.payload;
    },
  },
});

export const {
  setSingleJob,
  setAllAdminJobs,
  searchJobByText,
  setAllJobs,
  setAppliedJobs,
  setSearchQueryText,
} = jobSlice.actions;
export default jobSlice.reducer;
