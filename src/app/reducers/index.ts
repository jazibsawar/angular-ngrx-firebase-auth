import { ActionReducerMap } from '@ngrx/store';
import { postReducer } from '../post/post.reducer';

export const reducers: ActionReducerMap<any> = {
    post: postReducer
};