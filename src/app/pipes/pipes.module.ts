import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosterPipe } from '../pipe/poster.pipe';



@NgModule({
  declarations: [
    PosterPipe,
  ],
  exports: [
    PosterPipe,
  ],
  imports: [
    CommonModule,
  ]
})
export class PipesModule { }
