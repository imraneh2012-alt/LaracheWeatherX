import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let cancelAxios = null;

// write the logic code only her
// the UI logic code in the component "WeatherCard.js"

export const fetchWeatherApi = createAsyncThunk("weatherApiThunk", async () => {
    const response = await axios
        .get("https://api.openweathermap.org/data/2.5/weather?lat=35.19321&lon=-6.15572&appid=79db85a1c5d72366f0259ace0bb1f739", {
            cancelToken: new axios.CancelToken((c) => {
                cancelAxios = c;
        })})

        const weatehrApiReasponse = {
            temp: Math.round(response.data.main.temp - 273),
            minTemp: Math.round(response.data.main.temp_min - 273),
            maxTemp: Math.round(response.data.main.temp_max - 273),
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
        }
    
    return weatehrApiReasponse

})

const state = {
    weather: {},
    isLoading: false,
}

export const weatherApiSlice = createSlice({
    name: "weatherApi",
    initialState: state,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWeatherApi.pending, (state, action) => {
            state.isLoading = true

        }).addCase(fetchWeatherApi.fulfilled, (state, action) => {
            state.weather = action.payload
            state.isLoading = false
            
        }).addCase(fetchWeatherApi.rejected, (state, action) => {
            console.log(action.error.message)
            state.isLoading = false
        })
    }
})

export default weatherApiSlice.reducer;