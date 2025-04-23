import gql from 'graphql-tag';



export const GET_ASSESSMENT_BY_ID = gql`
query GetAssessmentById($getAssessmentByIdId: String!) {
  getAssessmentById(id: $getAssessmentByIdId) {
    _id
    title
    description
    duration
    passPercentage
    isPublished
    createdAt
    updatedAt
    questions {
      _id
      text
      type
      choices {
        _id
        text
        order
      }
    }
      
  }
}`
