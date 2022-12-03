/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCreator = /* GraphQL */ `
  query GetCreator($id: ID!) {
    getCreator(id: $id) {
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
export const listCreators = /* GraphQL */ `
  query ListCreators(
    $filter: ModelCreatorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCreators(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getWorkout = /* GraphQL */ `
  query GetWorkout($id: ID!) {
    getWorkout(id: $id) {
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
export const listWorkouts = /* GraphQL */ `
  query ListWorkouts(
    $filter: ModelWorkoutFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkouts(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const searchWorkouts = /* GraphQL */ `
  query SearchWorkouts(
    $filter: SearchableWorkoutFilterInput
    $sort: [SearchableWorkoutSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableWorkoutAggregationInput]
  ) {
    searchWorkouts(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
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
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
