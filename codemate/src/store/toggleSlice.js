import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    isChatBoxOpen: false,
  },
  reducers: {
    toggle: (state) => {
      state.isChatBoxOpen = !state.isChatBoxOpen;
    },
    closeChatBox:(state)=>{
        state.isChatBoxOpen=false
    }
  },
});
export const { toggle,closeChatBox } = toggleSlice.actions;
export default toggleSlice.reducer;