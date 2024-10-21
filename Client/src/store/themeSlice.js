import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    theme: "light",
}

const themeSlice = createSlice({
    name: "Theme",
    initialState,
    reducers: {
        setTheme: (state, action) => {
            if (state.theme === 'light') state.theme = 'dark';
            else state.theme = 'light';
        }
    }
})

export default themeSlice.reducer

export const { setTheme } = themeSlice.actions