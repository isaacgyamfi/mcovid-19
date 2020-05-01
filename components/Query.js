import gql from 'graphql-tag';

export const GET_TOP_CASES = gql`
  query {
    countries(sortBy: cases) {
      country
      countryInfo {
        _id
        flag
        iso3
      }
      result {
        cases
        todayCases
        deaths
        recovered
      }
    }
  }
`;

export const GET_GLOBAL_DATA = gql`
  query getGlobalData {
    globalTotal {
      affectedCountries
      tests
      cases
      todayCases
      deaths
      todayDeaths
      recovered
      active
      critical
    }
  }
`;

export const GET_COUNTRY_DATA = gql`
  query getCountryData($countryName: String!) {
    country(name: $countryName) {
      country
      countryInfo {
        _id
        flag
      }
      continent
      result {
        tests
        cases
        todayCases
        deaths
        todayDeaths
        recovered
        active
        critical
        casesPerOneMillion
        deathsPerOneMillion
        testsPerOneMillion
        updated
      }
    }
  }
`;
