import gql from "graphql-tag";
export const GET_MY_USERNAME = gql`
  query {
    me {
      username
    }
  }
`;

export const CREATE_USER = gql`
  mutation($username: String!, $password: String!) {
    createUser(input: { username: $username, password: $password }) {
      user {
        id
        username
      }
    }
  }
`;

export const GET_TOKEN = gql`
  mutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

export const GET_SINGLE_DATA_ITEM = gql`
  query($id: ID!) {
    dataItem(id: $id) {
      id
      source
      symbol
      name
      start
      end
      priceJson
    }
  }
`;
export const GET_SINGLE_DATA_ITEM_BY_SYMBOL = gql`
  query($symbol: String!) {
    dataItemBySymbol(symbol: $symbol) {
      id
      source
      symbol
      name
      start
      end
      priceJson
    }
  }
`;

export const SEARCH_DATA_ITEM = gql`
  query($symbol: String!) {
    allDataItems(symbol_Icontains: $symbol) {
      edges {
        node {
          id
          source
          symbol
          name
          start
          end
        }
      }
    }
  }
`;
export const GET_ALL_DATA_ITEM = gql`
  query {
    allDataItems {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export const CREATE_DATA_ITEM = gql`
  mutation CREATE_DATA_ITEM(
    $symbol: String!
    $source: String!
    $start: Date!
    $end: Date!
    $apiKey: String!
  ) {
    createDataItem(
      input: {
        symbol: $symbol
        source: $source
        start: $start
        end: $end
        apiKey: $apiKey
      }
    ) {
      dataItem {
        id
        symbol
        source
        start
        end
        priceJson
      }
    }
  }
`;
