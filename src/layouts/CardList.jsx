import { useEffect, useState } from "react";
import { cardSearch } from "../utils/api";
import { useStyles } from "../styles/CardListStyles";
import { forwardRef } from "react";
import { Group, Avatar, Text, Select } from "@mantine/core";

const data = [
  {
    image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
    label: "Bender Bending Rodríguez",
    value: "Bender Bending Rodríguez",
    description: "Fascinated with cooking",
  },
  {
    image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
    label: "Carol Miller",
    value: "Carol Miller",
    description: "One of the richest people on Earth",
  },
  {
    image: "https://img.icons8.com/clouds/256/000000/homer-simpson.png",
    label: "Homer Simpson",
    value: "Homer Simpson",
    description: "Overweight, lazy, and often ignorant",
  },
  {
    image: "https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png",
    label: "Spongebob Squarepants",
    value: "Spongebob Squarepants",
    description: "Not just a sponge",
  },
];

// eslint-disable-next-line react/display-name
const SelectItem = forwardRef(
  // eslint-disable-next-line react/prop-types
  ({ image, label, description, ...others }, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {description}
          </Text>
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

  const handleScroll = () => {
    window.scrollY > 10 ? setIsSticky(true) : setIsSticky(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (accessToken) {
      handleCardSearch();
    }
  }, [accessToken]);

  const handleCardSearch = async () => {
    setLoading(true); // ローディング状態を設定

    try {
      const cardList = await cardSearch(accessToken);
      setSearchData(cardList);
    } catch (error) {
      console.error("データの取得に失敗しました:", error);
    } finally {
      setLoading(false); // ローディング状態を解除
    }
  };

  return (
    <div className={classes.cardGalleryContainer}>
      <div className={classes.cardGalleryHeader}></div>
      <div
        className={classes.cardGalleryFilter}
        style={{ position: isSticky ? "fixed" : "relative" }}
      >
        <div className={classes.cardGalleryFilterContainer}>
          <Select
            label="Choose employee of the month"
            placeholder="Pick one"
            itemComponent={SelectItem}
            data={data}
            searchable
            maxDropdownHeight={400}
            nothingFound="Nobody here"
            filter={(value, item) =>
              item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
              item.description
                .toLowerCase()
                .includes(value.toLowerCase().trim())
            }
          />
        </div>
      </div>
      <div className={classes.cardGridLayout}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          searchData.map((data, index) => {
            return (
              <div key={index}>
                <img src={data.image}></img>
                <h5>{data.name}</h5>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CardList;
