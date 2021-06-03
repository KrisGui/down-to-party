import axios from 'axios'
import queryString from 'query-string'

const SET_LISTINGS = 'SET_LISTINGS'

const setListings = fetchedListings => ({type: SET_LISTINGS, fetchedListings})

export const fetchListings = filterOptions => async dispatch => {
  const params = queryString.parse(filterOptions)
  try {
    const {data} = await axios.get('/api/listings', {params})
    dispatch(setListings(data))
  } catch (err) {
    console.log(err)
  }
}

export const fetchListing = listingId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/listings/${listingId}`)
    dispatch(setListings(data))
  } catch (err) {
    console.log(err)
  }
}

export default function listings(state = [], action) {
  switch (action.type) {
    case SET_LISTINGS:
      return action.fetchedListings
    default:
      return state
  }
}
