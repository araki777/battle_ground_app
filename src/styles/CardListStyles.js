import { createStyles } from "@mantine/core";

export const useStyles = createStyles(() => ({
  cardGalleryContainer: {
    position: "relative",
    width: "100%",
    msOverFlowStyle: "none",
    scrollbarWidth: "none",
    overflowY: "scroll",

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
    padding: "0px 10px",
    margin: "0px auto",
    position: "relative",
    zIndex: 1,
    height: "100%",
  },
}));
