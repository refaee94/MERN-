import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCreateComponent } from '../posts/post-create/post-create.component';
import { PostListComponent } from '../posts/post-list/post-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModuleModule } from '../angular-material-module/angular-material-module.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PostCreateComponent, PostListComponent,
  ],
  imports: [
    ReactiveFormsModule, AngularMaterialModuleModule, CommonModule, RouterModule

  ]
})
export class PostModuleModule { }
