import {FETCH_POSTS, FETCH_POST, DELETE_POST} from '../actions';
import _ from 'lodash';

export default function (state ={}, action){
  switch(action.type){
    case DELETE_POST:
      //looks at state object. Checks for key of payload (id) then drop it from object
      // Will then create state without that id.
      return _.omit(state, action.payload);
    case FETCH_POST:
      // const post = action.payload.data;
      // const newState = {...state,};
      // newState[post.id] = post;
      // return newState;
      //This is the same as below. 
      return {...state, [action.payload.data.id]:action.payload.data};
    case FETCH_POSTS:
        //Returns the array but with the ids mapped for routing purposes.
      return _.mapKeys(action.payload.data, 'id');
    
    default:
      return state;
  }
}