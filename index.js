import { ApolloServer, gql } from 'apollo-server';
import { getPlanetsList } from './dataSources'

import schema from './infosDB';

const typeDefs = gql`
  type Planet {
    _id: ID!
    hostname: String!
    pl_bmassj: String!
    disc_year: Int!
    hasstation: Boolean!
    recharge: String
  }

  input InputTypeStation {
    hasstation: Boolean!
  }

  type Query {
    suitablePlanets: [Planet!]!
    planets: [Planet!]!
    stations: [Planet!]!
  }

  type Mutation {
    installStation(id: ID!, data: InputTypeStation!): Planet!
    recharge(id: ID!): Planet!
  }
`;

const resolvers = {
  Query: {
    suitablePlanets: async (obj, args, context) => {
      const planetsList = await context.dataSources.planetsList.getPlanet();
      return schema.insertMany(planetsList)
    },
    // Query para montar o banco de dados com o rsultado da API
    planets: () => schema.find(), // Lista os planetas atualizados
    stations: () => schema.find({ hasstation: { $eq: true } }), // Listar somente os planetas que contém uma estação instalada
  },

  Mutation: {
    // Instala uma estação de abastecimento no planeta
    installStation: (_, { id, data }) => schema.findByIdAndUpdate(id, data, { new: true }),
    recharge: (_, { id }) => schema.findByIdAndUpdate(id, {$set: {recharge: new Date(new Date().getTime() + 1000 * 86400 * 15)}}),
  }
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
