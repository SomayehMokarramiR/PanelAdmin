import { createSlice } from "@reduxjs/toolkit";

const editUserfo = createSlice({
  name: "editUserfo",
  initialState: {
    id: "",
    fName: "",
    lName: "",
    userName: "",
    gmail: "",
    phoneNumber: "",
    userAbout: "",
    linkdinProfile: "",
    telegramLink: "",
    homeAdderess: "",
    nationalCode: "",
    birthDay: "",

    // gender: "",
    // active: "",
    // isDelete: "",
    // isTecher: "",
    // isStudent: "",
    // recoveryEmail: "",
    // twoStepAuth: "",
    // currentPictureAddress: "", 
    // receiveMessageEvent: "",
    // latitude: "",
    // longitude: "",
    // insertDate: "",
    // roles: "",
    // courses: "",
    // coursesReseves: "",
    // userProfileId: "",
  },

  reducers: {
    handleId: (state, action) => {
      state.id = action.payload.id;
    },
    handleStepOne: (state, action) => {
      state.fName = action.payload.fName;
      state.lName = action.payload.lName;
      state.userName = action.payload.userName;
      state.nationalCode = action.payload.nationalCode;   
      state.birthDay = action.payload.birthDay;      
    },
    handleStepTwo: (state, action) => {
      state.phoneNumber = action.payload.phoneNumber;
      state.gmail = action.payload.gmail;
      state.linkdinProfile = action.payload.linkdinProfile;
      state.telegramLink = action.payload.telegramLink;
      state.homeAdderess = action.payload.homeAdderess;
      state.userAbout = action.payload.userAbout; 
    },

    // handleStepTree: (state, action) => {
         // state.insertDate = action.payload.insertDate;
      // state.currentPictureAddress = action.payload.currentPictureAddress;
      // state.receiveMessageEvent = action.payload.receiveMessageEvent;
     // state.recoveryEmail = action.payload.recoveryEmail;
      // state.active = action.payload.active;
      // state.isTecher = action.payload.isTecher;
      // state.isStudent = action.payload.isStudent
    // },
    
    // handleStepFour: (state, action) => {
      // state.gender = action.payload.gender;
    //     state.roles = action.payload.roles;
    //     state.courses = action.payload.courses;
    //     state.coursesReseves = action.payload.coursesReseves;
    //     state.userProfileId = action.payload.userProfileId;
    //   },

  },
});

export const { handleStepOne, handleStepTwo, handleId } =
  editUserfo.actions;
export default editUserfo.reducer;
