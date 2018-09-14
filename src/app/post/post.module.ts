import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { postReducer } from './post.reducer';
import { PostEffects } from './post.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('post', postReducer),
    EffectsModule.forFeature([PostEffects])
  ],
  exports: [PostComponent],
  declarations: [PostComponent]
})
export class PostModule { }