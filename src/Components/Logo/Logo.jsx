import React from "react";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import "./Logo.css";

const Logo = () => {
    return (
        <div className="logo">
            <SettingsEthernetIcon sx={{ fontSize: "inherit !important" }} />
            <span>CODEONE</span>
        </div>
    );
};

export default Logo;
