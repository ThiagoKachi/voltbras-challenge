import { ApolloServer, gql } from 'apollo-server';
import { getPlanetsList } from './dataSources'

const typeDefs = gql`
  type Planet {
    pl_name: ID!
    hostname: String!
    pl_bmassj: String!
    disc_year: Int!
    disc_locale: String!
  }

  type Query {
    suitablePlanets: [Planet!]!
  }

  type Mutation {
    installStation(id: String!): Planet
  }
`;

const resolvers = {
  Query: {
    suitablePlanets: async (obj, args, context) => {
      return context.dataSources.planetsList.getPlanet();
    },
  },

  // Mutation: {
  //   installStation: (_, args) => {
  //     const planetSearched = .find((planet) => planet.pl_name === args.id)
  //     const installed = planetSearched.createStation = true
  //     return installed
  //   }
  // }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      planetsList: new getPlanetsList()
    };
  }
});


server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});