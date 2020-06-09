import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { VehiclePerson } from "@/api/VehiclePerson";
import { NextPageContext } from "next";

export interface PersonProps {
  ownersList: VehiclePerson[] | undefined;
}

export default function Person({ ownersList }: PersonProps) {
  const router = useRouter();
  const [owners, setOwners] = useState(ownersList);

  useEffect(() => {
    async function loadData() {
      const { person, vehicle } = router.query;
      const response = await fetch(
        `http://localhost:4001/vehicles?ownerName=${person}&vehicle=${vehicle}`
      );
      const ownersList: VehiclePerson[] | undefined = await response.json();
      setOwners(ownersList);
    }

    if (ownersList?.length === 0) loadData();
  }, []);

  return (
    <>
      {!owners?.[0] && <div>loading...</div>}
      <pre>{owners[0]?.details}</pre>
    </>
  );
}

interface MyNextPageContext extends NextPageContext {
  query: {
    person: string;
    vehicle: string;
  };
}

Person.getInitialProps = async ({ req, query }: MyNextPageContext) => {
  if (!req) return { ownersList: [] };
  const { person, vehicle } = query;

  const response = await fetch(
    `http://localhost:4001/vehicles?ownerName=${person}&vehicle=${vehicle}`
  );
  const ownersList: VehiclePerson[] | undefined = await response.json();
  return { ownersList };
};
