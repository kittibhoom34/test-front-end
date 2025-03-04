import { useEffect, useState } from "react";
import axios from "axios";

import { Typography } from "antd";

const { Text } = Typography;

interface HairColorSummary {
  [color: string]: number;
}

interface DepartmentSummary {
  male: number;
  female: number;
  ageRange: string;
  hair: HairColorSummary;
  addressUser: string[];
}

interface Crytro {
  coin: string;
  wallet: string;
  network: string;
}

interface Company {
  department: string;
  name: string;
  title: string;
  address: Address;
}

interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}
interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
}
interface Hair {
  color: string;
  type: string;
}

interface Users {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crytro: Crytro;
  role: string;
}

function Apitran() {
  const [data, setAlldata] = useState<Users[] | undefined>(undefined);
  const uniqueDepartments = [
    ...new Set(data?.map((item: Users) => item.company.department)),
  ];

  let itemtrans: { [department: string]: DepartmentSummary } = {};
  const items = uniqueDepartments.map((department: string) => {
    const departmentData = data?.filter(
      (item: Users) => item.company.department === department
    );
    const allHairColor = [
      ...new Set(departmentData?.map((item: Users) => item.hair.color)),
    ];

    itemtrans[department] = {
      male:
        departmentData?.filter((item: Users) => item.gender === "male")
          .length || 0,
      female:
        departmentData?.filter((item: Users) => item.gender === "female")
          .length || 0,
      ageRange: `${Math.min(
        ...(departmentData?.map((item: Users) => item.age) || [])
      )} - ${Math.max(
        ...(departmentData?.map((item: Users) => item.age) || [])
      )}`,
      hair: Object.fromEntries(
        allHairColor.map((color) => [
          color,
          departmentData?.filter((item: Users) => item.hair.color === color)
            .length || 0,
        ])
      ),
      addressUser:
        departmentData?.map(
          (item: Users) =>
            `${item.firstName} ${item.lastName} : ${item.address.postalCode}`
        ) ?? [],
    };

    return (
      <div key={department}>
        <Text strong>Company {department}</Text>
        <br />
        <Text strong>Male:</Text>
        <Text>
          {departmentData?.filter((item: Users) => item.gender === "male")
            .length || 0}
        </Text>
        <br />

        <Text strong>Female:</Text>
        <Text>
          {departmentData?.filter((item: Users) => item.gender === "female")
            .length || 0}
        </Text>
        <br />

        <Text strong>Age Range:</Text>
        <Text>{`${Math.min(
          ...(departmentData?.map((item: Users) => item.age) || [])
        )} - ${Math.max(
          ...(departmentData?.map((item: Users) => item.age) || [])
        )}`}</Text>
        <br />

        <Text strong>Hair color:</Text>
        {allHairColor.map((color) => (
          <div>
            <Text>{`${color}: ${
              departmentData?.filter((item: Users) => item.hair.color === color)
                .length || 0
            }`}</Text>

            <br />
          </div>
        ))}

        <Text strong>Address:</Text>
        <div>
          {departmentData?.map((item: Users) => (
            <Text
              key={item.id}
            >{`${item.firstName} ${item.lastName} : ${item.address.postalCode}`}</Text>
          ))}
        </div>
        <hr />
        <br />
      </div>
    );
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Make the GET request
      const response = await axios.get("https://dummyjson.com/users");

      // Handle the response data here
      console.log(response.data.users);
      setAlldata(response.data.users);
      //     setAlldata(response)
    } catch (error) {
      // Handle errors here
      console.error("There was an error fetching the data!", error);
    }
  };
  return (
    <div>
      <div>
        Raw data :<Text>{JSON.stringify(itemtrans)}</Text>
      </div>
      <hr />
      <div>Group Data :{items}</div>
    </div>
  );
}

export default Apitran;
