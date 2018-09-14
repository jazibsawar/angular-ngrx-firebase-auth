import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as actions from '../post.actions';
import * as fromPost from '../post.reducer';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: Observable<any>;
  constructor(private store: Store<fromPost.State>, private afs: AngularFirestore) { }

  ngOnInit() {
    this.posts = this.store.select(fromPost.selectAll);
    this.store.dispatch(new actions.Query());
  }
  
  addPost() {
    const id: string = new Date().getUTCMilliseconds().toString();
    const post: fromPost.Post = {
      title: `Title #${id}`,
      content: `Title #${id} Content`,
    };
    this.afs.collection('posts').doc(id).set(post);
  }

  updatePost(id, content) {
    this.store.dispatch( new actions.Update(id, { content }) )
  }
}
