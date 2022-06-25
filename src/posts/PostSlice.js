import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = [];
const postsSlice = createSlice({
 name: "posts",
 initialState,
 reducers: {
  loadPosts(state, posts) {
   return posts.payload;
  },
  postAdded: {
   reducer(state, action) {
    state.push(action.payload);
   },
   prepare(content, image) {
    return {
     payload: {
      id: nanoid(),
      content,
      image: image,
      reactions: {
       like: 0,
      },
     },
    };
   },
  },
 },
});
export const selectAllPosts = (state) => state.posts;

export const { postAdded, loadPosts } = postsSlice.actions;

export default postsSlice.reducer;
