/**
 * Socials base url
 */
export const INSTAGRAM = 'https://instagram.com/'
export const FACEBOOK = 'https://facebook.com/'
export const TWITTER = 'https://twitter.com/'
const SPOTIFY = 'https://spotify.com/'
export const TIKTOK = 'https://tiktok.com/@'
export const YOUTUBE = 'https://youtube.com/'

/**
 * App Constants
 */
export const APP_NAME = 'Fittree';
export const INSTAGRAM_NAME = 'fittree.io';
export const TWITTER_NAME = 'fittreeio';
export const APP_STORE_URL = 'https://apps.apple.com/gb/app/fittree-for-creators/id6443335947'

/**
 * Messages
 */
export const PAUSED_ERROR_MESSAGE = 'Something has gone wrong'

/**
 * Default values for exerices and workouts
 * @type {{DEFAULT_VALUE_MILLISECONDS: number, DEFAULT_VALUE_OF_ONE: number, DEFAULT_VALUE_OF_ZERO: number, DEFAULT_VALUE_DESCRIPTION: string, DEFAULT_VALUE_BODYPART: string, DEFAULT_VALUE_EQUIPMENT: string}}
 */
const workoutsExerciseDefaults = {
    DEFAULT_VALUE_OF_ZERO: 0,
    DEFAULT_VALUE_OF_ONE: 1,
    DEFAULT_VALUE_MILLISECONDS: 5000,
    DEFAULT_VALUE_DESCRIPTION: 'No description',
    DEFAULT_VALUE_BODYPART: 'Full Body',
    DEFAULT_VALUE_EQUIPMENT: 'No Equipment',
};

export default {
    workoutsExerciseDefaults,
};
