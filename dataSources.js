import { RESTDataSource } from 'apollo-datasource-rest';

export class getPlanetsList extends RESTDataSource {
  constructor() {
    // Always call super()
    super();
    this.baseURL = 'https://exoplanetarchive.ipac.caltech.edu';
  }
  
  async getPlanet() {
    // Send a GET request to the specified endpoint
    return this.get(`/TAP/sync?query=select+*+from+ps+where+pl_bmassj+between+10+and+80&format=json`);
  }
}
