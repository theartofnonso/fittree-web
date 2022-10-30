/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCreator = /* GraphQL */ `
  subscription OnCreateCreator($owner: String) {
    onCreateCreator(owner: $owner) {
      id
      cognitoId
      username
      preferred_username
      displayBrief
      displayProfile
      exercises {
        items {
          id
          creatorId
          title
          description
          bodyParts
          equipments
          videoUrls
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
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
  subscription OnUpdateCreator($owner: String) {
    onUpdateCreator(owner: $owner) {
      id
      cognitoId
      username
      preferred_username
      displayBrief
      displayProfile
      exercises {
        items {
          id
          creatorId
          title
          description
          bodyParts
          equipments
          videoUrls
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
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
  subscription OnDeleteCreator($owner: String) {
    onDeleteCreator(owner: $owner) {
      id
      cognitoId
      username
      preferred_username
      displayBrief
      displayProfile
      exercises {
        items {
          id
          creatorId
          title
          description
          bodyParts
          equipments
          videoUrls
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
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
export const onCreateExercise = /* GraphQL */ `
  subscription OnCreateExercise($owner: String) {
    onCreateExercise(owner: $owner) {
      id
      creatorId
      title
      description
      bodyParts
      equipments
      videoUrls
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateExercise = /* GraphQL */ `
  subscription OnUpdateExercise($owner: String) {
    onUpdateExercise(owner: $owner) {
      id
      creatorId
      title
      description
      bodyParts
      equipments
      videoUrls
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteExercise = /* GraphQL */ `
  subscription OnDeleteExercise($owner: String) {
    onDeleteExercise(owner: $owner) {
      id
      creatorId
      title
      description
      bodyParts
      equipments
      videoUrls
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateWorkout = /* GraphQL */ `
  subscription OnCreateWorkout($owner: String) {
    onCreateWorkout(owner: $owner) {
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
      createdAt
      updatedAt
      publishedAt
      owner
    }
  }
`;
export const onUpdateWorkout = /* GraphQL */ `
  subscription OnUpdateWorkout($owner: String) {
    onUpdateWorkout(owner: $owner) {
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
      createdAt
      updatedAt
      publishedAt
      owner
    }
  }
`;
export const onDeleteWorkout = /* GraphQL */ `
  subscription OnDeleteWorkout($owner: String) {
    onDeleteWorkout(owner: $owner) {
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
      createdAt
      updatedAt
      publishedAt
      owner
    }
  }
`;
