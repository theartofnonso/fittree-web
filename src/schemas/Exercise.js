
export const constructExercise = (title = "", duration = defaultDuration, sets = 1) => {
    return {
        id: generateRandomString(),
        title,
        duration,
        sets
    }
}
