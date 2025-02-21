function replaceAttackLevelValues(value) {
    switch (value) {
        case "HighHigh":
            return "High"
        case "HighMiddle":
            return "High";
        // 
        case "MiddleHigh":
            return "Middle";
        case "MiddleMiddle":
            return "Middle"
        case "MiddleMiddleMiddle":
            return "Middle";
        case "Middle (Unblockable when fully charged)":
            return "Middle"
        // 
        case "LowHigh":
            return "Low";
        case "LowLow":
            return "Low";
        case "LowLow (If the first hit is a counter hit, LowHigh)":
            return "Low"
        // 
        case "Other (Special Action)":
            return "Other";
        case "Atemi Combo":
            return "Atemi";
        default:
            return value;
    }

}

module.exports = replaceAttackLevelValues;