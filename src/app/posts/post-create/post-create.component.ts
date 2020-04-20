import { Component, OnInit ,EventEmitter,Output} from "@angular/core";
import { post } from '../postModel';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.scss"]
})

export class PostCreateComponent  {

constructor(public postService:PostsService) {


}


  onClickCreate(form:NgForm){
    if(!form.valid){

      return;
    }
const post:post=
{title:form.value.title,
content:form.value.content};
this.postService.addPost(form.value.title,form.value.content);
form.reset();


}


}
