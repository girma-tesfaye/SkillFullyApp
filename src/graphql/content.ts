import gql from 'graphql-tag';


export const GET_CONTENTS = gql`
query GetAllTrainingContent($trainingId: String!) {
  getAllTrainingContent(trainingId: $trainingId) {
    id
    title
  }
}`


export const GET_CONTENT_BY_ID = gql`
query GetContentById($contentId: String!) {
  getContentById(id: $contentId) {
    id
    content
  }
}`

export const GET_CONTENT = gql`
query GetContent($contentId: String!) {
  getContent(contentId: $contentId) {
    id
    title
    content
    isCompleted
  }
}
`


export const COMPLETE_CONTENT = gql`
mutation CompleteContent($input: CompleteContentInput!) {
  completeContent(input: $input)
}
`