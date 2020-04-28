import gql from 'graphql-tag';

export const GET_TOP_CASES = gql`
  query {
    countries(sortBy: cases) {
      country
      countryInfo {
        _id
        flag
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
      tests
      cases
      deaths
      recovered
    }
  }
`;
