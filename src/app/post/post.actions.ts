import { Action } from '@ngrx/store';
import { Post }  from './post.reducer';

export const QUERY    = '[Post] query posts';

export const ADDED    = '[Post] added';
export const MODIFIED = '[Post] modified';
export const REMOVED  = '[Post] removed';

export const UPDATE   = '[Post] update';
export const SUCCESS  = '[Post] update success';

export class Query implements Action {
    readonly type = QUERY;
    constructor() {}
}

export class Added  implements Action {
    readonly type = ADDED;
    constructor(public payload: Post) { }
}

export class Modified implements Action {
    readonly type = MODIFIED;
    constructor(public payload: Post) {}
}

export class Removed implements Action {
    readonly type = REMOVED;
    constructor(public payload: Post) {}
}


// Run a Firestore Update
export class Update implements Action {
    readonly type = UPDATE;
    constructor(
        public id: string,
        public changes: Partial<Post>,
      ) { }
}

export class Success implements Action {
    readonly type = SUCCESS;
    constructor() {}
}

export type PostActions
= Query | 
Added | 
Modified | 
Removed | 
Update | 
Success;