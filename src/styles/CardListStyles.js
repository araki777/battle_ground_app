import { createStyles } from "@mantine/core";

export const useStyles = createStyles(() => ({
  cardGalleryContainer: {
    position: "relative",
    width: "100%",
    msOverFlowStyle: "none",
    scrollbarWidth: "none",
    overflowY: "scroll",
    background: `url('/img/parchment.jpg')`,

    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  cardGalleryHeader: {
    minHeight: 335,
    width: "100%",
    position: "relative",
    zIndex: 20,

    "&::before": {
      content: "''",
      backgroundImage: `url('/img/Battlegrounds_BG_Desktop.jpg')`,
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundPosition: "center top",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
  },
  cardGalleryFilter: {
    background: `url('/img/bg_filter_middle_tile.jpg')`,
    padding: "11px 0px 0px",
    zIndex: 99,

    "&::before": {
      content: "''",
      position: "absolute",
      top: 0,
      height: "100%",
      width: "100%",
      background: `url('/img/bg_filter_top_title.png') center top repeat-x`,
    },
  },
  cardGalleryFilterContainer: {
    width: "100%",
    maxWidth: "1600px",
    padding: "0px 20px 0px 10px",
    margin: "0px auto",
    display: "flex",
    webkitBoxAlign: "center",
    alignItems: "center",
    webkitBoxPack: "center",
    justifyContent: "center",
    position: "relative",
    height: "93px",
  },
  cardGridLayout: {
    margin: "0px auto",
    position: "relative",
    zIndex: 1,
    height: "100%",

    img: {
      width: "100%",
      height: "100%",
      maxWidth: 350,
    },
  },
  button: {
    background: `url('/img/icon_gold.png') center center / contain no-repeat`,
    position: "relative",

    "&::before": {
      content: "''",
      position: "absolute",
      background: `url('/img/icon_gold_selected.png') center center / contain no-repeat`,
      inset: -10,
      opacity: 0,
      transition: "opacity 0.15s ease 0s",
    },

    "&:hover": {
      backgroundColor: "transparent",
    },

    "&:hover::before": {
      opacity: 1,
    },

    "&.selected::before": {
      opacity: 1,
    },
  },
  buttonText: {
    color: "rgb(255, 255, 255)",
    margin: 0,
    padding: 0,
    textShadow:
      "rgb(0, 0, 0) 2px 0px 0px, rgb(0, 0, 0) 1.75517px 0.95885px 0px, rgb(0, 0, 0) 1.0806px 1.68294px 0px, rgb(0, 0, 0) 0.14147px 1.99499px 0px, rgb(0, 0, 0) -0.83229px 1.81859px 0px, rgb(0, 0, 0) -1.60229px 1.19694px 0px, rgb(0, 0, 0) -1.97998px 0.28224px 0px, rgb(0, 0, 0) -1.87291px -0.70157px 0px, rgb(0, 0, 0) -1.30729px -1.5136px 0px, rgb(0, 0, 0) -0.42159px -1.95506px 0px, rgb(0, 0, 0) 0.56732px -1.91785px 0px, rgb(0, 0, 0) 1.41734px -1.41108px 0px, rgb(0, 0, 0) 1.92034px -0.55883px 0px",
    position: "relative",
    whiteSpace: "nowrap",
    fontFamily:
      "'Belwe Bold', Georgia, Times, 'Times New Roman', serif !important",
  },
}));
