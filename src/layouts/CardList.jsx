import { useEffect, useState } from "react";
import { fetchDataWithRetry } from "../utils/api";
import { useStyles } from "../styles/CardListStyles";
import { forwardRef } from "react";
import {
  Group,
  Avatar,
  Text,
  Select,
  Container,
  Grid,
  Flex,
  Button,
} from "@mantine/core";

const data = [
  {
    image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
    label: "All",
    value: "All",
  },
  {
    image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
    label: "Hero",
    value: "hero",
  },
  {
    image: "https://img.icons8.com/clouds/256/000000/homer-simpson.png",
    label: "Minion",
    value: "minion",
  },
  {
    image: "https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png",
    label: "Quest",
    value: "quest",
  },
  {
    image: "https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png",
    label: "Reward",
    value: "reward",
  },
  {
    image: "https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png",
    label: "Anomaly",
    value: "anomaly",
  },
];

// eslint-disable-next-line react/display-name
const SelectItem = forwardRef(
  // eslint-disable-next-line react/prop-types
  ({ image, label, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />
        <div>
          <Text size="sm">{label}</Text>
        </div>
      </Group>
    </div>
  )
);

// eslint-disable-next-line react/prop-types
const CardList = ({ accessToken }) => {
  const { classes, cx } = useStyles();

  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [value, setValue] = useState(data[0].label);
  const [selectedStars, setSelectedStars] = useState(Array(7).fill(false));

  const handleStarClick = (index) => {
    // 選択された星の状態を反転
    const newSelectedStars = [...selectedStars];
    newSelectedStars[index] = !newSelectedStars[index];
    setSelectedStars(newSelectedStars);
  };

  const handleScroll = () => {
    window.scrollY > 10 ? setIsSticky(true) : setIsSticky(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (accessToken) {
      handleCardSearch(value);
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      handleCardSearch(value);
    }
  }, [value]);

  useEffect(() => {
    let tier = "";
    if (selectedStars.includes(true)) {
      for (let i = 0; i < selectedStars; i++) {
        if (tier == "" && selectedStars[i]) {
          tier += `tier=${i + 1}`;
        } else if (selectedStars[i]) {
          tier += `,tier=${i + 1}`;
        }
      }
    }
  }, [selectedStars]);

  const handleCardSearch = async (category) => {
    setLoading(true); // ローディング状態を設定

    try {
      const cardList = await fetchDataWithRetry(accessToken, category, 3);
      setSearchData(cardList);
    } catch (error) {
      console.error("データの取得に失敗しました:", error);
    } finally {
      setLoading(false); // ローディング状態を解除
    }
  };

  const result = (
    <Grid columns={5} gutter="lg">
      {loading ? (
        <p>Loading...</p>
      ) : (
        searchData.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <Grid.Col span={1} key={`${rowIndex}-${cellIndex}`}>
              <img src={cell.image} />
              <h5>{cell.name}</h5>
            </Grid.Col>
          ))
        )
      )}
    </Grid>
  );

  return (
    <div className={classes.cardGalleryContainer}>
      <div className={classes.cardGalleryHeader}></div>
      <div
        className={classes.cardGalleryFilter}
        style={{ position: isSticky ? "fixed" : "relative" }}
      >
        <div className={classes.cardGalleryFilterContainer}>
          <Select
            itemComponent={SelectItem}
            data={data}
            onChange={setValue}
            maxDropdownHeight={350}
            value={value}
            mr="md"
          />
          <Flex
            gap="xl"
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
          >
            {Array.from({ length: 7 }, (_, index) => (
              <Button
                className={`${classes.button} ${
                  selectedStars[index + 1] ? "selected" : ""
                } `}
                key={index}
                onClick={() => handleStarClick(index + 1)}
              >
                <h4 className={classes.buttonText}>{index + 1}</h4>
              </Button>
            ))}
          </Flex>
        </div>
      </div>
      <div className={classes.cardGridLayout}>
        <Container fluid={true}>{result}</Container>
      </div>
    </div>
  );
};

export default CardList;
