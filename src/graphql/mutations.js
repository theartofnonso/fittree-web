/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCreator = /* GraphQL */ `
  mutation CreateCreator(
    $input: CreateCreatorInput!
    $condition: ModelCreatorConditionInput
  ) {
    createCreator(input: $input, condition: $condition) {
      id
      cognitoId
      username
      preferred_username
      displayBrief
      displayProfile
      workouts {
        items {
          id
          creatorId
          preferred_username
          title
          description
          intensityLevel
          bodyParts
          equipments
          rounds
          roundsInterval
          exerciseInterval
          setsInterval
          thumbnailUrl
          workoutExercises
          type
          isLive
          duration
          numOfPlays
          createdAt
          updatedAt
          publishedAt
          owner
        }
        nextToken
      }
      instagram
      facebook
      twitter
      spotify
      tiktok
      youtube
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateCreator = /* GraphQL */ `
  mutation UpdateCreator(
    $input: UpdateCreatorInput!
    $condition: ModelCreatorConditionInput
  ) {
    updateCreator(input: $input, condition: $condition) {
      id
      cognitoId
      username
      preferred_username
      displayBrief
      displayProfile
      workouts {
        items {
          id
          creatorId
          preferred_username
          title
          description
          intensityLevel
          bodyParts
          equipments
          rounds
          roundsInterval
          exerciseInterval
          setsInterval
          thumbnailUrl
          workoutExercises
          type
          isLive
          duration
          numOfPlays
          createdAt
          updatedAt
          publishedAt
          owner
        }
        nextToken
      }
      instagram
      facebook
      twitter
      spotify
      tiktok
      youtube
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteCreator = /* GraphQL */ `
  mutation DeleteCreator(
    $input: DeleteCreatorInput!
    $condition: ModelCreatorConditionInput
  ) {
    deleteCreator(input: $input, condition: $condition) {
      id
      cognitoId
      username
      preferred_username
      displayBrief
      displayProfile
      workouts {
        items {
          id
          creatorId
          preferred_username
          title
          description
          intensityLevel
          bodyParts
          equipments
          rounds
          roundsInterval
          exerciseInterval
          setsInterval
          thumbnailUrl
          workoutExercises
          type
          isLive
          duration
          numOfPlays
          createdAt
          updatedAt
          publishedAt
          owner
        }
        nextToken
      }
      instagram
      facebook
      twitter
      spotify
      tiktok
      youtube
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createWorkout = /* GraphQL */ `
  mutation CreateWorkout(
    $input: CreateWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    createWorkout(input: $input, condition: $condition) {
      id
      creatorId
      preferred_username
      title
      description
      intensityLevel
      bodyParts
      equipments
      rounds
      roundsInterval
      exerciseInterval
      setsInterval
      thumbnailUrl
      workoutExercises
      type
      isLive
      duration
      numOfPlays
      createdAt
      updatedAt
      publishedAt
      owner
    }
  }
`;
export const updateWorkout = /* GraphQL */ `
  mutation UpdateWorkout(
    $input: UpdateWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    updateWorkout(input: $input, condition: $condition) {
      id
      creatorId
      preferred_username
      title
      description
      intensityLevel
      bodyParts
      equipments
      rounds
      roundsInterval
      exerciseInterval
      setsInterval
      thumbnailUrl
      workoutExercises
      type
      isLive
      duration
      numOfPlays
      createdAt
      updatedAt
      publishedAt
      owner
    }
  }
`;
export const deleteWorkout = /* GraphQL */ `
  mutation DeleteWorkout(
    $input: DeleteWorkoutInput!
    $condition: ModelWorkoutConditionInput
  ) {
    deleteWorkout(input: $input, condition: $condition) {
      id
      creatorId
      preferred_username
      title
      description
      intensityLevel
      bodyParts
      equipments
      rounds
      roundsInterval
      exerciseInterval
      setsInterval
      thumbnailUrl
      workoutExercises
      type
      isLive
      duration
      numOfPlays
      createdAt
      updatedAt
      publishedAt
      owner
    }
  }
`;
