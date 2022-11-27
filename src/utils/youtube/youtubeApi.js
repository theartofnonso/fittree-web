import axios from "axios";

const DEV_KEY = "AIzaSyBkKTUrlLvDFobTj5co40soHCe2lcOShzA"
const PROD_KEY = "AIzaSyCu2UqeJeeUirUv-B2DOzDnV8EvGcYcj3E"
const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3"

export default axios.create({
    baseURL: YOUTUBE_BASE_URL,
    params: {
        part: 'snippet',
        maxResults: 5,
        safeSearch: "strict",
        type: 'video',
        videoDuration: 'short',
        key: DEV_KEY
    },
    headers: {}
})
