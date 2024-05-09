import { gql } from "@apollo/client";
export const GET_ALL_CONTRIES = gql`
query GetAllcountries{
  countries {
   name
    currency
  }
}`
export const GET_COUNTRIES = gql`
  query GetAllcountries{
    countries {
      code
      name
      native
      phone
      emoji
      continent {
        name
      }
      languages {
        name
      }
    }
  }
`;
export const GET_ALL_LAN = gql`
query GetAlllanguages{
  countries {
    continent {
      name
    }
    languages {
      name
    }
  }
}`
export const GET_COUNTRY_DETAILS = gql`
query SingleCountriesDetails($countryCode: [String!]) {
  countries(filter: { code: { in: $countryCode } }) {
    code
    name
    phone
    native
    emoji
    capital
    phones
    currency
    awsRegion
    continent {
      name
    }
    languages {
      name
    }
  }
}
`;