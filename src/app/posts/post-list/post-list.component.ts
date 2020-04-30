import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { post } from '../postModel';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit,OnDestroy {
  public posts: post[] = [];
  public isLoading=false;
  public totalPosts=0;
  public pageSize=2;
  public userId:string;
  public pageSizeOptions=[1,2,5,10];
public currentPage=1;
private authListenerSub:Subscription;
isAuthentacated=false;
  constructor(public postService: PostsService,private auth:AuthService) {


  }
  ngOnDestroy(): void {
    this.authListenerSub.unsubscribe();  }


  private postSub: Subscription;

  ngOnInit(): void {
    this.userId=this.auth.getUserId();
this.postService.getPosts(this.currentPage,this.pageSize);

    this.postSub=this.postService.getPostsUpdatedListner().subscribe((postData:{posts:post[],length:number}) => {

    ;this.isLoading=false;
      this.posts = postData.posts;

      this.totalPosts=postData.length;
    });

    this.isAuthentacated=this.auth.getIsAuth();

    this.authListenerSub=this.auth.getAuthStatusListener().subscribe(res=>{
      console.log(res);

this.isAuthentacated=res;
this.userId=this.auth.getUserId();


    });
    this.isLoading=true;


  }


  onDelete(id:string){
    this.isLoading=true;

this.postService.deletePost(id).subscribe(()=>{
  this.postService.getPosts(this.currentPage,this.pageSize);
},()=>{this.isLoading=false;});


  }

  onChangePage(pageData:PageEvent){
    this.isLoading=true;
this.currentPage=pageData.pageIndex+1;
this.pageSize=pageData.pageSize;
    this.postService.getPosts(this.currentPage,this.pageSize);

  }
}
