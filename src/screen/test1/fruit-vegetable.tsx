import { Button, Card, Col, Row } from "antd";
import { useState } from "react";
import "../../styles/fruit-vegetable.css";

interface Fruit {
  type: string;
  name: string;
}

const Fruit = () => {
  const data = [
    {
      type: "Fruit",
      name: "Apple",
    },
    {
      type: "Vegetable",
      name: "Broccoli",
    },
    {
      type: "Vegetable",
      name: "Mushroom",
    },
    {
      type: "Fruit",
      name: "Banana",
    },
    {
      type: "Vegetable",
      name: "Tomato",
    },
    {
      type: "Fruit",
      name: "Orange",
    },
    {
      type: "Fruit",
      name: "Mango",
    },
    {
      type: "Fruit",
      name: "Pineapple",
    },
    {
      type: "Vegetable",
      name: "Cucumber",
    },
    {
      type: "Fruit",
      name: "Watermelon",
    },
    {
      type: "Vegetable",
      name: "Carrot",
    },
  ];
  const [dataAll, setdataAll] = useState<Fruit[]>(data);
  const [allFruit, setallFruit] = useState<Fruit[]>([]);
  const [allVegetable, setallVegetable] = useState<Fruit[]>([]);

  const moveTotype = (type: string, name: string) => {
    setdataAll((prevData) => prevData.filter((item) => item.name !== name));
    if (type === "Fruit") {
      setallFruit((prev) => [
        ...prev,
        {
          type: type,
          name: name,
        },
      ]);
    } else {
      setallVegetable((prev) => [
        ...prev,
        {
          type: type,
          name: name,
        },
      ]);
    }

    setTimeout(() => {
      setdataAll((prevData) => {
        const checkDuplicate = prevData.some((item) => item.name === name);
        return checkDuplicate ? prevData :[...prevData, { type, name }];
      });

      if (type === "Fruit") {
        setallFruit((prev) => prev.filter((item) => item.name !== name));
      } else {
        setallVegetable((prev) => prev.filter((item) => item.name !== name));
      }
    }, 5000);
  };
  const moveFruitToParent = () => {
    if (allFruit.length > 0) {
      setdataAll((prev) => [
        ...prev,
        {
          type: allFruit[0].type,
          name: allFruit[0].name,
        },
      ]);
      setallFruit((prevData) =>
        prevData.filter((item) => item.name !== allFruit[0].name)
      );
    }
  };

  const moveVegetableToParent = () => {
    if (allVegetable.length > 0) {
      setdataAll((prev) => [
        ...prev,
        {
          type: allVegetable[0].type,
          name: allVegetable[0].name,
        },
      ]);
      setallVegetable((prevData) =>
        prevData.filter((item) => item.name !== allVegetable[0].name)
      );
    }
  };

  return (
    <>
      <Row gutter={5}>
        <Col span={8}>
          <Card className="CardContent" title="All" variant="outlined">
            {dataAll.map((item, i) => (
              <Row>
                <Col key={i} span={24}>
                  <Button
                    className="Button-test1"
                    onClick={() => moveTotype(item.type, item.name)}
                    value={item.type}
                  >
                    {item.name}
                  </Button>
                </Col>
              </Row>
            ))}
          </Card>
        </Col>
        <Col span={8}>
          <Card
            className="CardContent"
            title="Fruit"
            variant="outlined"
            onClick={() => moveFruitToParent()}
          >
            {allFruit.map((item, i) => (
              <Row>
                <Col key={i} span={24}>
                  <Button className="Button-test1" value={item.type}>
                    {item.name}
                  </Button>
                </Col>
              </Row>
            ))}
          </Card>
        </Col>
        <Col span={8}>
          <Card
            className="CardContent"
            title="Vegetable"
            variant="outlined"
            onClick={() => moveVegetableToParent()}
          >
            {allVegetable.map((item, i) => (
              <Row>
                <Col key={i} span={24}>
                  <Button className="Button-test1" value={item.type}>
                    {item.name}
                  </Button>
                </Col>
              </Row>
            ))}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Fruit;
