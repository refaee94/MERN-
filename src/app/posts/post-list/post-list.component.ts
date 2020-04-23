import { Component, OnInit, Input } from '@angular/core';
import { post } from '../postModel';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  public posts: post[] = [];
  public isLoading=false;

  constructor(public postService: PostsService) {


  }

  private postSub: Subscription;

  ngOnInit(): void {
    this.isLoading=true;

    this.postService.getPosts();

    this.postService.getPostsUpdatedListner().subscribe((postslist) => {
    this.isLoading=false;

      this.posts = postslist;
    });

  }


  onDelete(id:string){
this.postService.deletePost(id);


  }
}
