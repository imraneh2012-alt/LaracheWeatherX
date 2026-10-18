import { configureStore } from '@reduxjs/toolkit'
import weatherApiReducer from './reduxsSlices/weatherApiSlice'

// redux store
export const store = configureStore({
    reducer: {
        weatherApi: weatherApiReducer
    }
})