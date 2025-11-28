import { gql } from "@apollo/client";

const GET_JOBS = gql`
  query GetJobs {
    jobs {
      jobId
      organisation
      years
    }
  }
`;

const CREATE_JOB = gql`
  mutation CreateJob($jobId: ID!, $organisation: String!, $years: Int!) {
    createJob(jobId: $jobId, organisation: $organisation, years: $years) {
      jobId
      organisation
      years
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($id: ID!, $name: String!, $age: Int!, $jobId: ID) {
    createUser(id: $id, name: $name, age: $age, jobId: $jobId) {
      id
      name
      age
      job {
        organisation
      }
    }
  }
`;

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      age
      job {
        organisation
      }
    }
  }
`;

export { GET_JOBS, CREATE_JOB, CREATE_USER, GET_USERS };
