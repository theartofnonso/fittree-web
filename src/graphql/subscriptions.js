/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCreator = /* GraphQL */ `
  subscription OnCreateCreator(
    $filter: ModelSubscriptionCreatorFilterInput
    $owner: String
  ) {
    onCreateCreator(filter: $filter, owner: $owner) {
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
export const onUpdateCreator = /* GraphQL */ `
  subscription OnUpdateCreator(
    $filter: ModelSubscriptionCreatorFilterInput
    $owner: String
  ) {
    onUpdateCreator(filter: $filter, owner: $owner) {
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
export const onDeleteCreator = /* GraphQL */ `
  subscription OnDeleteCreator(
    $filter: ModelSubscriptionCreatorFilterInput
    $owner: String
  ) {
    onDeleteCreator(filter: $filter, owner: $owner) {
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
export const onCreateWorkout = /* GraphQL */ `
  subscription OnCreateWorkout(
    $filter: ModelSubscriptionWorkoutFilterInput
    $owner: String
  ) {
    onCreateWorkout(filter: $filter, owner: $owner) {
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
export const onUpdateWorkout = /* GraphQL */ `
  subscription OnUpdateWorkout(
    $filter: ModelSubscriptionWorkoutFilterInput
    $owner: String
  ) {
    onUpdateWorkout(filter: $filter, owner: $owner) {
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
export const onDeleteWorkout = /* GraphQL */ `
  subscription OnDeleteWorkout(
    $filter: ModelSubscriptionWorkoutFilterInput
    $owner: String
  ) {
    onDeleteWorkout(filter: $filter, owner: $owner) {
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
