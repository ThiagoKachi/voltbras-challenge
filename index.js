const { ApolloServer, gql } = require('apollo-server');
import { getGithubUser } from './dataSources'

const typeDefs = gql`
  type Planet {
    pl_name: String!
    pl_bmassj: String!
  }

  type Query {
    suitablePlanets: [Planet]
  }
`;

const resolvers = {
  Query: {
    suitablePlanets: async (obj, args, context) => {
      return context.dataSources.githubUser.getUser();
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      githubUser: new getGithubUser()
    };
  }
});


server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});