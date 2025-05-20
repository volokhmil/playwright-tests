// tests/utils/graphqlClient.js
class GraphQLClient {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   * @param {string} baseURL
   * @param {string} token
   */
  constructor(request, baseURL, token) {
    this.request = request;
    this.baseURL = baseURL;
    this.token = token;
  }

  async execute(query, variables = {}) {
    const response = await this.request.post(this.baseURL, {
      data: { query, variables },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    });
    const json = await response.json();
    if (json.errors) {
      throw new Error(JSON.stringify(json.errors));
    }
    return json.data;
  }

  createOrganization(domain, name) {
    const query = `
      mutation CreateMasterOrganization($data: CreateMasterOrganizationInput!) {
        createMasterOrganization(data: $data) {
          name
          masterOrganizationId
        }
      }
    `;
    return this.execute(query, { data: { domain, name } })
      .then(data => data.createMasterOrganization);
  }

  deleteOrganization(id) {
    const query = `
      mutation DeleteMasterOrganization($id: ID!) {
        deleteMasterOrganization(id: $id) {
          success
        }
      }
    `;
    return this.execute(query, { id })
      .then(data => data.deleteMasterOrganization.success);
  }
}

module.exports = { GraphQLClient };
