import { test, expect } from '@playwright/test';

let orgId;

test('Create organization via GraphQL', async ({ request }) => {
  const orgName = `org-${Date.now()}`;

  const response = await request.post('https://pre-production-api.creativelysquared.com/graphql', {
    data: {
      query: `
        mutation CreateMasterOrganization($data: CreateMasterOrganizationInput!) {
          createMasterOrganization(data: $data) {
            name
            masterOrganizationId
          }
        }
      `,
      variables: {
        data: {
          domain: 'rolique.io',
          name: orgName
        },
      },
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidXNlciIsInVzZXJJZCI6IjdjMDRlMGY5LTUzMzEtNGQwNC05MmU4LTM5YTJhYzg5NWVmZiIsInJvbGUiOiJjc19zdXBlcmFkbWluIiwiZW1haWwiOiJ3aXBlZC03YzA0ZTBmOS01MzMxLTRkMDQtOTJlOC0zOWEyYWM4OTVlZmZAY3JlYXRpdmVseXNxdWFyZWQuY29tIiwibmFtZSI6IkNTIiwic3VybmFtZSI6IkFkbWluIiwiaXNCb3QiOmZhbHNlLCJvcmdhbml6YXRpb25JZCI6bnVsbCwibWFzdGVyT3JnYW5pemF0aW9uSWQiOm51bGwsInNlc3Npb25JZCI6ImM4MzA3OWYwLWRiY2EtNDRhZC1hOGYwLWQzYzRiMDNmMzllMyIsImlhdCI6MTc0NzIzNzk1MSwiZXhwIjoxNzQ3MzI0MzUxfQ.1G21VjtkN1RWsAr8_zfn1Zae-Xq0Qy29y2_KxGn9nL4',
    },
  });

  const data = await response.json();
  console.log(data);
  

  orgId = data.data.createMasterOrganization.masterOrganizationId;
  console.log('Organization ID:', orgId);
});

test('Destroy Master Organization via GraphQL', async ({ request }) => { 
  const response = await request.post('https://pre-production-api.creativelysquared.com/graphql', {
    data: {
      query: `mutation DestroyMasterOrganization($masterOrganizationId: ID!) {
  destroyMasterOrganization(masterOrganizationId: $masterOrganizationId) {
    name
  }
}
      `,
      variables: {
        masterOrganizationId: orgId,
      },
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidXNlciIsInVzZXJJZCI6IjdjMDRlMGY5LTUzMzEtNGQwNC05MmU4LTM5YTJhYzg5NWVmZiIsInJvbGUiOiJjc19zdXBlcmFkbWluIiwiZW1haWwiOiJ3aXBlZC03YzA0ZTBmOS01MzMxLTRkMDQtOTJlOC0zOWEyYWM4OTVlZmZAY3JlYXRpdmVseXNxdWFyZWQuY29tIiwibmFtZSI6IkNTIiwic3VybmFtZSI6IkFkbWluIiwiaXNCb3QiOmZhbHNlLCJvcmdhbml6YXRpb25JZCI6bnVsbCwibWFzdGVyT3JnYW5pemF0aW9uSWQiOm51bGwsInNlc3Npb25JZCI6ImM4MzA3OWYwLWRiY2EtNDRhZC1hOGYwLWQzYzRiMDNmMzllMyIsImlhdCI6MTc0NzIzNzk1MSwiZXhwIjoxNzQ3MzI0MzUxfQ.1G21VjtkN1RWsAr8_zfn1Zae-Xq0Qy29y2_KxGn9nL4',
    },
  });
   const data = await response.json();
  console.log(data);
})