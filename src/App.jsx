import * as React from "react";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { CssBaseline } from "@mui/material";
import "./gradiant.css";
import axios from "axios";
import { useEffect } from "react";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const Battery = (props) => {
  const percentage = 100 - props.remain;

  return (
    <>
      <div
        style={{
          position: "relative",
          height: "40vw",
          width: "40vw",
          maxWidth: "180px",
          maxHeight: "180px",
          backgroundColor: "rgba(128,128,128,0.5)", // Add this line
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            height: "40vw",
            width: "40vw",
            maxWidth: "180px",
            maxHeight: "180px",

            background: `linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) ${percentage}% , #1CB5E0 ${percentage}%, #000851 100%)`,
            borderRadius: "50%",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "#f2f2f2",
              fontWeight: 500,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {props.remain}%
          </Typography>
        </div>
      </div>
    </>
  );
};

const PrioritySelect = (props) => {
  const [score, setScore] = React.useState(props.status);

  const handleChange = async (event) => {
    setScore(event.target.value);
    try {
      const respond = await axios.post(
        `https://invfp-demo.onrender.com/updatePriority/${props.slot}`,
        {
          soc: `${event.target.value}`,
        }
      );
      alert(respond);
      alert(`${props.slot} score : ${event.target.value}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          backgroundColor: props.status ? "green" : "red",
          borderRadius: "50%",
          boxShadow: `0 0 10px ${props.status ? "green" : "red"}, 0 0 5px ${
            props.status ? "green" : "red"
          }`,
        }}
      ></div>
      <FormControl
        sx={{ m: 1.5, minWidth: 100, display: "flex", maxWidth: "3%" }}
        size="small"
      >
        <InputLabel
          id="score-label"
          sx={{ color: "#f2f2f2", "&.Mui-focused": { color: "#f2f2f2" } }}
        >
          {`Slot ${props.slot}`}
        </InputLabel>
        <Select
          labelId="score-label"
          id="score-select"
          value={score}
          label="Age"
          onChange={handleChange}
          sx={{
            color: "#f2f2f2",
            borderColor: "#f2f2f2",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#f2f2f2",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#f2f2f2",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#f2f2f2",
            },
            "& .MuiSelect-icon": {
              color: "#f2f2f2",
            },
          }}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

function App() {
  const [batteryRemain, setBatteryRemain] = useState(70);
  const [remain, setRemain] = useState(0);
  const [statusList, setStatusList] = useState([]);

  useEffect(() => {
    axios.get("https://invfp-demo.onrender.com/test").then((res) => {
      const data = res.data;
      setStatusList([
        data.soc1,
        data.soc2,
        data.soc3,
        data.soc4,
        data.soc5,
        data.soc6,
      ]);
      console.log(data);
    });
  }, []);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= batteryRemain) {
        setRemain(i++);
      } else {
        clearInterval(interval);
      }
    }, 10);
  }, []);

  return (
    <div style={{ color: "#f2f2f2" }}>
      <CssBaseline />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#1d1e20",
          background:
            "linear-gradient(-45deg, #3c3c3c, #1e1e1e, #111111, #1d1e20)",
          backgroundSize: "400% 400%",
          animation: "gradient 15s ease infinite",
        }}
      >
        <Typography variant="h3" sx={{ marginTop: { xs: "6%", md: "2%" } }}>
          Manage
        </Typography>
        <div
          style={{
            width: "100%",
            paddingLeft: "10%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              width: "50%",
              background: "rgba(255, 255, 255, 0.08)",
              borderRadius: 20,
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(5px)",
              "-webkit-backdrop-filter": "blur(5px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              marginTop: "2%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              paddingBottom: "5%",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                marginTop: "5%",
                marginBottom: "5%",
                textAlign: "center",
                fontWeight: 500,
                padding: "5%",
              }}
            >
              Battery percent
            </Typography>
            <Battery remain={remain} />
          </div>
          <div
            style={{
              width: "36%",
              background: "rgba(255, 255, 255, 0.08)",
              borderRadius: 20,
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(5px)",
              "-webkit-backdrop-filter": "blur(5px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              marginTop: "2%",
              marginLeft: "3%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              paddingBottom: "5%",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                marginTop: "5%",
                marginBottom: "5%",
                textAlign: "center",
                fontWeight: 500,
                padding: "5%",
                paddingTop: "15%",
              }}
            >
              On/Off
            </Typography>
            <label class="switch">
              <input
                className="switch__input"
                type="checkbox"
                role="switch"
                name="dummy"
              />
              <span className="switch__lever-shadow"></span>
              <span className="switch__lever">
                <span className="switch__lever-sides"></span>
                <span className="switch__lever-half-top"></span>
                <span className="switch__lever-half-bottom"></span>
              </span>
              <span className="switch__label">Power</span>
            </label>
          </div>
        </div>

        <div
          style={{
            width: "80%",
            background: "rgba(255, 255, 255, 0.08)",
            borderRadius: 20,
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(5px)",
            "-webkit-backdrop-filter": "blur(5px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            paddingTop: "5%",
            paddingBottom: "5%",
            marginTop: "2%",
            marginBottom: "5%",
          }}
        >
          <Typography
            variant="h5"
            sx={{ marginBottom: "5%", textAlign: "center", fontWeight: 500 }}
          >
            Priority
          </Typography>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {statusList.map((status, i) => (
              <Grid item xs={2} sm={4} md={4} key={i}>
                <PrioritySelect slot={i + 1} status={status} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default App;
