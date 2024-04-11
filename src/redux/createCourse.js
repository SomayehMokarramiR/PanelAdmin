import { createSlice } from "@reduxjs/toolkit";

const creatCourseInfo = createSlice({
  name: "creatCourseInfo",
  initialState: {
    title: "",
    describe: "",
    miniDescribe: "",
    cost: "",
    startTime: "",
    endTime: "",
    sessionNumber: "",
    googleTitle: "",
    googleSchema: "",
    UniqeUrlString: "",
    shortLink: "",
    image: "",
    imageAddress: "",
    imageTumbAdress: "",
    capacity: "",
    courseTypeId: "",
    termId: "",
    classId: "",
    CourseLvlId: "",
    TeacherId: "",
    techId: "",
    courseId: "",
  },

  reducers: {
    handleId: (state, action) => {
      state.courseId = action.payload.courseId;
    },
    handleStepOne: (state, action) => {
      state.courseTypeId = action.payload.courseTypeId;
      state.CourseLvlId = action.payload.CourseLvlId;
      state.termId = action.payload.termId;
      state.classId = action.payload.classId;
      state.TeacherId = action.payload.TeacherId;
      state.techId = action.payload.techId;

    //   state.status = action.payload.status;   
    },
    handleStepTwo: (state, action) => {
      state.title = action.payload.title;
      state.describe = action.payload.describe;
      state.miniDescribe = action.payload.miniDescribe;
      state.cost = action.payload.cost;
      state.capacity = action.payload.capacity;
      state.startTime = action.payload.startTime;
      state.endTime = action.payload.endTime;
      state.sessionNumber = action.payload.sessionNumber;
    },
    handleStepTree: (state, action) => {
      state.googleTitle = action.payload.googleTitle;
      state.googleSchema = action.payload.googleSchema;
      state.UniqeUrlString = action.payload.UniqeUrlString;
      state.shortLink = action.payload.shortLink;
    },
  },
});

export const { handleStepOne, handleStepTwo, handleStepTree, handleId } =
  creatCourseInfo.actions;
export default creatCourseInfo.reducer;
