import * as actions from './post.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

// Main data interface

export interface Post {
    title: string;
    content: string;
    id?: string;
}

// Entity adapter
export const postAdapter = createEntityAdapter<Post>();
export interface State extends EntityState<Post> { }

export const initialState: State = postAdapter.getInitialState();

export function postReducer(
    state: State = initialState,
    action: actions.PostActions) {

    switch (action.type) {
        
        case actions.ADDED:
            return postAdapter.addOne(action.payload, state);

        case actions.MODIFIED:
            return postAdapter.updateOne({
                id: action.payload.id, 
                changes: action.payload 
            }, state);
        
        case actions.REMOVED:
            return postAdapter.removeOne(action.payload.id, state)

        default:
            return state;
        }

}

export const getPostState = createFeatureSelector<State>('post');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = postAdapter.getSelectors(getPostState);