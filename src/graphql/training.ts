import gql from 'graphql-tag';


export const GET_TRAINING = gql`
query GetTraining($getTrainingId: String!) {
  getTraining(id: $getTrainingId) {
    id
    title
    description
    estimatedDuration
    type
    startDate
    endDate
    deadline
    tags
    isRequired
    isEnrolled
    progress
    materials {
      id
      title
      description
      duration
      contents {
        id
        title
        isCompleted
      }
    }
  }
}
`;

export const GET_ORG_TRAININGS = gql`
  query GetAllOrgTrainings($status: String, $type: String) {
    getAllOrgTrainings(status: $status, type: $type) {
      id
      title
      description
      type
      status
      startDate
      endDate
      deadline
      isRequired
      estimatedDuration
      createdAt
      updatedAt
    }
  }
`;



export const ENROLL_FOR_TRAINING = gql`
mutation Enroll($trainingId: String!) {
  enroll(trainingId: $trainingId)
}`

export const GET_USER_TRAININGS = gql`
query Query {
  getUserTrainings {
    id
    title
    progress
    materials {
      id
      title
      contents {
        id
        title
        isCompleted
      }
    }
  }
}`
