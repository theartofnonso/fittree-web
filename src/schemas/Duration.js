
/**
 * This class represents a duration
 */
export const constructDuration = (value, type) => {
 return {
     value, type
 }
}

export const updateDurationValue = (prevDuration, value) => {
    return {
        ...prevDuration,
        value
    }
}

export const updateDurationType = (prevDuration, type) => {
    return {
        ...prevDuration,
        type
    }
}

