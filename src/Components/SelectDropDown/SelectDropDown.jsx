import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

const SelectDropDown = ({
    value,
    label,
    setValue,
    values,
    mappingFunction,
}) => {
    return (
        <FormControl sx={{ width: "150px" }}>
            <InputLabel
                sx={{ color: "var(--text-color)", textAlign: "center" }}
            >
                {label}
            </InputLabel>
            <Select
                variant="outlined"
                value={value}
                label={label}
                onChange={(event) => {
                    setValue(event.target.value);
                }}
                sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                    },
                    "& .MuiInputLabel-root": {
                        display: "none",
                    },
                    "& .MuiInputBase-root": {
                        "&:before": {
                            borderBottom: "none",
                        },
                    },
                    color: "inherit",
                }}
            >
                {values.map((v) => (
                    <MenuItem key={v} value={v}>
                        {mappingFunction ? mappingFunction(v) : v}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectDropDown;
