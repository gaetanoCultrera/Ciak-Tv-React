export const contentCardStyle = {
  padding: 1,
  position: "absolute",
  textAlign: "center",
  color: "white",
};

export const typographyStyle = {
  textShadow:
    "2px 2px 4px rgba(0, 0, 0, 0.75), -2px -2px 4px rgba(0, 0, 0, 0.75)",
  fontWeight: "bold",
};

export const cardBoxStyle = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "flex-end",
};

export const scrollStyle = {
  display: "flex",
  overflowX: "auto",
  height: "450px",
  scrollbarWidth: "thin",
  scrollbarColor: "#000000 transparent",

  "&::-webkit-scrollbar": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#000000",
    borderRadius: "10px",
    border: "3px solid #B02323",
  },
};
