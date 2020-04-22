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

  constructor(public postService: PostsService) {


  }

  private postSub: Subscription;

  ngOnInit(): void {
    this.postService.getPosts();
    this.postService.getPostsUpdatedListner().subscribe((postslist) => {

      this.posts = postslist;
    });

  }
  ngOnDestroy(): void {
    this.postSub.unsubscribe();

  }

  onDelete(id:string){
this.postService.deletePost(id);


  }
}
