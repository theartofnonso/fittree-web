
/**
 * This class represents a duration
 */
export const constructDuration = (value, type) => {
 return {
     value, type
 }
}

export const updateDurationValue = (value, prevDuration) => {
    return {
        ...prevDuration,
        value
    }
}

export const updateDurationType = (type, prevDuration) => {
    return {
        ...prevDuration,
        type
    }
}

