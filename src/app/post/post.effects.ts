import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { Post } from './post.reducer';
import * as postActions from './post.actions';

import { AngularFirestore } from '@angular/fire/firestore';

import { switchMap, mergeMap, map } from 'rxjs/operators';

@Injectable()
export class PostEffects {

    constructor(private actions$: Actions, private afs: AngularFirestore) { }

    @Effect()
    query$: Observable<Action> = this.actions$.ofType(postActions.QUERY).pipe(
        switchMap(action => {
            return this.afs.collection<Post>('posts', query => query.orderBy('title')).stateChanges()
        }),
        mergeMap(actions => actions),
        map(action => {
            return {
                type: `[Post] ${action.type}`,
                payload: { id: action.payload.doc.id, ...action.payload.doc.data() }
            };
        })
    );



    @Effect()
    update$: Observable<Action> = this.actions$.ofType(postActions.UPDATE).pipe(
        map((action: postActions.Update) => action),
        switchMap(data => {
            const ref = this.afs.doc<Post>(`posts/${data.id}`)
            return from(ref.update(data.changes))
        }),
        map(() => new postActions.Success())
    )
}