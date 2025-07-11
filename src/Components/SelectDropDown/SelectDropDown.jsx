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
        <FormControl sx={{ width: "150px", fontSize: "14px" }}>
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
                    "& .MuiSelect-select": {
                        paddingBottom: "0",
                    },
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
                    fontSize: "14px",
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
