import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    singleJob: null,
    allAdminJobs: [],
    allJobs: [],
    searchJobByText: "",
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

    searchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
  },
});

export const { setSingleJob, setAllAdminJobs, searchJobByText, setAllJobs } =
  jobSlice.actions;
export default jobSlice.reducer;
