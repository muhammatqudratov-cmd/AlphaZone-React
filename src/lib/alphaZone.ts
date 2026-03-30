import { alpha } from "@mui/material/styles";

export const alphaZoneColors = {
  mint: "#A8DADC",
  mintStrong: "#8BCFD2",
  slate: "#457B9D",
  ink: "#183642",
  textSoft: "#5F7481",
  white: "#F1FAEE",
  canvas: "#F7FBF8",
  line: alpha("#457B9D", 0.14),
};

export const alphaZoneShadow = "0 24px 60px rgba(69,123,157,0.14)";
export const alphaZoneSoftShadow = "0 18px 40px rgba(69,123,157,0.12)";
export const alphaZoneRadius = 24;

export const alphaZoneSurface = (opacity = 0.82) => ({
  backgroundColor: alpha("#FFFFFF", opacity),
  backdropFilter: "blur(24px)",
  border: `1px solid ${alphaZoneColors.line}`,
  boxShadow: alphaZoneShadow,
});

export const alphaZoneMutedSurface = (opacity = 0.75) => ({
  backgroundColor: alpha(alphaZoneColors.white, opacity),
  border: `1px solid ${alpha("#457B9D", 0.1)}`,
  boxShadow: "0 16px 38px rgba(69,123,157,0.08)",
});

export const alphaZoneInputSx = {
  "& .MuiInputBase-root": {
    borderRadius: `${alphaZoneRadius}px`,
    backgroundColor: alpha("#FFFFFF", 0.92),
    boxShadow: "0 14px 34px rgba(69,123,157,0.08)",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: alpha("#457B9D", 0.1),
  },
  "& .MuiInputBase-input": {
    color: alphaZoneColors.ink,
    py: 1.65,
  },
  "& .MuiInputLabel-root": {
    color: alpha(alphaZoneColors.ink, 0.58),
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: alpha("#457B9D", 0.22),
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: alphaZoneColors.mint,
    borderWidth: "1px",
  },
};

export const alphaZoneStatus = {
  PAUSE: {
    label: "Pending",
    color: "#9A6B00",
    backgroundColor: alpha("#F4D58D", 0.3),
  },
  PROCESS: {
    label: "Shipped",
    color: "#1E5C83",
    backgroundColor: alpha("#457B9D", 0.16),
  },
  FINISH: {
    label: "Delivered",
    color: "#1F6B55",
    backgroundColor: alpha("#A8DADC", 0.34),
  },
  DELETE: {
    label: "Canceled",
    color: "#8C3D3D",
    backgroundColor: alpha("#F8C6C6", 0.5),
  },
};
