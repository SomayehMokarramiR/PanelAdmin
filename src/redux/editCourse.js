import { createSlice } from "@reduxjs/toolkit";

const editCourseInfo = createSlice({
  name: "editCourseInfo",
  initialState: {
    Id: "",
    Title: "",
    Describe: "",
    MiniDescribe: "",
    Capacity: "",
    CourseTypeId: "",
    SessionNumber: "",
    CurrentCoursePaymentNumber: 0,
    TremId: "",
    ClassId: "",
    CourseLvlId: "",
    TeacherId: "",
    Cost: "",
    GoogleTitle: "",
    GoogleSchema: "",
    UniqeUrlString: "",
    ShortLink: "",
    Image: "",
    TumbImageAddress: "",
    ImageAddress: "",
    StartTime: "",
    EndTime: "",
    CoursePrerequisiteId: " ",
  },

  reducers: {
    handleId: (state, action) => {
      state.Id = action.payload.Id;
    },
    handleStepOne: (state, action) => {
      state.CourseTypeId = action.payload.CourseTypeId;
      state.CourseLvlId = action.payload.CourseLvlId;
      state.TremId = action.payload.TremId;
      state.ClassId = action.payload.ClassId;
      state.TeacherId = action.payload.TeacherId;
      state.techId = action.payload.techId;
    },
    handleStepTwo: (state, action) => {
      state.Title = action.payload.Title;
      state.Describe = action.payload.Describe;
      state.MiniDescribe = action.payload.MiniDescribe;
      state.Cost = action.payload.Cost;
      state.Capacity = action.payload.Capacity;
      state.StartTime = action.payload.StartTime;
      state.EndTime = action.payload.EndTime;
      state.SessionNumber = action.payload.SessionNumber;
    },
    handleStepTree: (state, action) => {
      state.GoogleTitle = action.payload.GoogleTitle;
      state.GoogleSchema = action.payload.GoogleSchema;
      state.UniqeUrlString = action.payload.UniqeUrlString;
      state.ShortLink = action.payload.ShortLink;
    },
  },
});

export const { handleStepOne, handleStepTwo, handleStepTree, handleId } =
  editCourseInfo.actions;
export default editCourseInfo.reducer;
