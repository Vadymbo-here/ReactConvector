import React, {useEffect, useState} from 'react'

// importing material UI components
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"


export default function Header() {
    const [headerText, setHeaderText] = useState("");

    const fetchCurrency = (name) => {
        fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`)
        .then(response => response.json())
        .then(data => {
            setHeaderText(`${data[24].cc}: ${data[24].rate} / ${data[31].cc}: ${data[31].rate}`)
        })
        .catch(err => console.log(err))
    }

    useEffect(()=>{
        fetchCurrency();
    }, [])

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6"
                    component="div" sx={{ flexGrow: 1 }}>
                    {headerText}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}