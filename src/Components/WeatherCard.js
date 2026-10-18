// MUI COMPONENTS
import { Container } from "@mui/material";
import Card from '@mui/material/Card';
import CloudIcon from '@mui/icons-material/Cloud';
import CircularProgress from '@mui/material/CircularProgress';
//== MUI COMPONENTS ==
// REACT IMPORTS
import { useEffect, useState } from "react";
//== REACT IMPORTS ==

import moment from "moment/moment";
import 'moment/locale/ar';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";
import { fetchWeatherApi } from "../reduxsSlices/weatherApiSlice";

moment.locale("en")

export default function WeatherCard(){

    // import states from the state object in the weather api slice
    const weatherInformation = useSelector((state) => {return state.weatherApi.weather})
    const isLoading = useSelector((state) => {return state.weatherApi.isLoading})
    const dispatch = useDispatch()

    const [lang, setLang] = useState("en")
    
    const {t, i18n} = useTranslation()

    const [dateAndTime, setDateAndTime] = useState(null)

    // we don't need to do a state for weather api 

    // eslint-disable-next-line eqeqeq
    const direction = lang == "ar" ? "rtl" : "ltr";


    useEffect(() => {
        i18n.changeLanguage(lang)
    }, [])

    useEffect(() => {

        setDateAndTime(moment().format('MMMM Do YYYY, h:mm:ss a'))
        // no nessecery to do the api request her
        dispatch(fetchWeatherApi())
    }, [])

    function handleChangeLang(){
        // eslint-disable-next-line eqeqeq
        if(lang == "en"){
            i18n.changeLanguage("ar")
            setLang("ar")
            moment.locale("ar")
            setDateAndTime(moment().format('MMMM Do YYYY, h:mm:ss a'))
        }else{
            i18n.changeLanguage("en")
            setLang("en")
            moment.locale("en")
            setDateAndTime(moment().format('MMMM Do YYYY, h:mm:ss a'))
        }
    }

    return (
        
        <Container sx={{
            minHeight: "100vh", 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center", 
            fontFamily: lang === "en" ? "google-sans" : "rubik"}} 
            maxWidth={"sm"}>
            
            <Card sx={{maxWidth: "100%", height: "40vh", backgroundColor: "#0d47a1", color: "white", padding: "7px"}}>
                {/* TITLE: CITY/DATE */}
                
                <div dir={direction} style={{display: "flex", flexDirection: "row", height: "50px", position: "relative", bottom: "28px"}}>
                    {/* CITY */}
                    <div style={{
                        fontSize: "24px", 
                        display: "flex", 
                        alignContent: "start",
                        justifyItems: "start",
                        height: "fit-content",
                        margin: "10px"
                        }}>
                        <h2>{t("LARACHE")}</h2>
                    </div>

                    {/* DATE */}
                    <div style={{
                        position: "relative",
                        top: "30px",
                        height: "fit-content",
                        margin: "10px"
                        }}>
                        <p>{dateAndTime}</p>
                    </div>
                </div>
                {/*== TITLE: CITY/DATE ==*/}

                <hr/>

                {/* CONTENT */}

                <div style={{display: "flex", flexDirection: "row", height: "195px"}}>
                    {/* CLOUD ICON */}
                    <div style={{display: "flex", justifyContent: "left", paddingLeft: "20px", width: "fit-content"}}>
                        <CloudIcon style={{fontSize: "190px"}}/>
                        
                    </div>
                    {/*== CLOUD ICON ==*/}

                    {/* WEATHER INFORMATION */}
                    <div dir={direction} style={{width: "300px"}}>
                        <div dir="rtl" style={{display: "flex", flexDirection: "row"}}>
                            <h6 dir="ltr" style={{fontSize: "80px", 
                                margin: "0px", 
                                fontWeight: "500", 
                                padding: "0px", 
                                alignSelf: "start"}}>{weatherInformation.temp}°C</h6>
                            
                            {isLoading ? <CircularProgress style={{color: "white", alignSelf: "center"}} aria-label="Loading…"/> : null}
                            

                            {/* CURRENT WEATHER ICON */}
                            <img src={`https://openweathermap.org/payload/api/media/file/${weatherInformation.icon}.png`} alt=""/>
                            {isLoading ? <CircularProgress style={{color: "white", alignSelf: "start", marginRight: "40px"}} aria-label="Loading…"/> : null}
                            {/*== CURRENT WEATHER ICON ==*/}

                        </div>

                        <p style={{margin: "7px", fontSize: "25px"}}>{t(weatherInformation.description)}</p>

                        <div style={{display: "flex", flexDirection: "row", justifySelf: "center"}}>
                            <h5 style={{margin: "7px"}}>{t("min")}: {weatherInformation.minTemp} °C</h5>
                            {isLoading ? <CircularProgress style={{color: "white", alignSelf: "center", width: "25px"}} aria-label="Loading…"/> : null}
                            <span style={{fontSize: "25px"}}>|</span>
                            <h5 style={{margin: "7px"}}>{t("max")}: {weatherInformation.maxTemp} °C</h5>
                            {isLoading ? <CircularProgress style={{color: "white", alignSelf: "center", width: "25px"}} aria-label="Loading…"/> : null}
                        </div>
                        
                    </div>
                    {/*== WEATHER INFORMATION ==*/}

                </div>

                {/*== CONTENT ==*/}
            </Card>

            <div style={{margin: "10px", width: "98%", height: "fit-content", display: "flex", justifyContent: lang === "en" ? "right" : "left"}}>
                <button onClick={handleChangeLang} style={{fontFamily: lang === "en" ? "google-sans" : "rubik"}} className="buttont">{lang === "en" ? "ARABIC" : "إنجليزي"}</button>
            </div>
        </Container>
    
    )
}