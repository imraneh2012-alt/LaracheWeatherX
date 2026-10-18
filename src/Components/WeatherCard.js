// MUI COMPONENTS
import { Container } from "@mui/material";
import Card from '@mui/material/Card';
import CloudIcon from '@mui/icons-material/Cloud';
//== MUI COMPONENTS ==
// REACT IMPORTS
import { useEffect, useState } from "react";
//== REACT IMPORTS ==

import axios from "axios";
import moment from "moment/moment";
import 'moment/locale/ar';
import { useTranslation } from 'react-i18next';

moment.locale("en")

export default function WeatherCard(){

    const [lang, setLang] = useState("en")
    
    const {t, i18n} = useTranslation()

    const [dateAndTime, setDateAndTime] = useState(null)

    const [weatherInformation, setWeatherInformation] = useState({
        temp: null,
        minTemp: null,
        maxTemp: null,
        description: "",
        icon: "",
    })

    // eslint-disable-next-line eqeqeq
    const direction = lang == "ar" ? "rtl" : "ltr";

    let cancelAxios = null;

    useEffect(() => {
        i18n.changeLanguage(lang)
    }, [])

    useEffect(() => {

        setDateAndTime(moment().format('MMMM Do YYYY, h:mm:ss a'))

        console.log("rendering api")
        axios
            .get("https://api.openweathermap.org/data/2.5/weather?lat=35.19321&lon=-6.15572&appid=79db85a1c5d72366f0259ace0bb1f739", {
                cancelToken: new axios.CancelToken((c) => {
                    cancelAxios = c;
                }),
            })
            .then((response) => {
                console.log(response.data.main.temp - 273)
                setWeatherInformation({
                    temp: Math.round(response.data.main.temp - 273),
                    minTemp: Math.round(response.data.main.temp_min - 273),
                    maxTemp: Math.round(response.data.main.temp_max - 273),
                    description: response.data.weather[0].description,
                    icon: response.data.weather[0].icon,
                })
                console.log(weatherInformation)
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

            return () => {
                console.log("canceling")
                cancelAxios()
            }
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

                            {/* CURRENT WEATHER ICON */}
                            <img src={`https://openweathermap.org/payload/api/media/file/${weatherInformation.icon}.png`} alt=""/>
                            {/*== CURRENT WEATHER ICON ==*/}

                        </div>

                        <p style={{margin: "7px", fontSize: "25px"}}>{t(weatherInformation.description)}</p>

                        <div style={{display: "flex", flexDirection: "row", justifySelf: "center"}}>
                            <h5 style={{margin: "7px"}}>{t("min")}: {weatherInformation.minTemp} °C</h5>
                            <span style={{fontSize: "25px"}}>|</span>
                            <h5 style={{margin: "7px"}}>{t("max")}: {weatherInformation.maxTemp} °C</h5>
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