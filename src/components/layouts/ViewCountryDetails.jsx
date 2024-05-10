"use client"

import * as React from "react"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import { useQuery, gql } from "@apollo/client";
import { GET_COUNTRY_DETAILS } from "../gqlOperation/queries";

export function ViewCountryDetails({task,onOpenChange,...props}) {
  const [isUpdatePending, startUpdateTransition] = React.useTransition()


  // Use the useQuery hook to fetch data
  const { loading, error, data } = useQuery(GET_COUNTRY_DETAILS, {
    variables: { countryCode: [task?.code] },
  });
  const countryDetails = data?.countries[0];
console.log("country details are", countryDetails)
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;
  return (
    <Sheet onOpenChange={onOpenChange} {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle className="flex flex-row justify-start items-center gap-2"> <h1 className="text-2xl lg:text-3xl">{countryDetails?.name}</h1><h1 className="text-5xl">{countryDetails?.emoji}</h1></SheetTitle>
        </SheetHeader>
        <div className=" py-2 rounded-md">
          <ul className="flex flex-col gap-5">
            <li><span className="font-bold">Code: </span>  {countryDetails?.code} </li>
            <li><span className="font-bold">ISD:</span> {countryDetails?.phone}</li>
            <li><span className="font-bold">Native:</span> {countryDetails?.native}</li>
            <li><span className="font-bold">Currency:</span> {countryDetails?.currency}</li>
            <li><span className="font-bold">Capital: </span>{countryDetails?.capital}</li>
            {/* <li><span className="font-bold">AWSRegion:</span> {countryDetails?.awsRegion}</li> */}
            <li><span className="font-bold">Continent:</span> {countryDetails?.continent?.name}</li>
            <li><span className="font-bold">Languages:</span>  {countryDetails?.languages?.map((data) => data.name).join(", ")}</li>
          </ul>
          </div>
      </SheetContent>
    </Sheet>
  )
}
