import { Injectable } from "@angular/core";
import { post } from "./postModel";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';

/**
 * @description
 * @class
 */
  const B_URL=environment.API_URL+"/posts/";
@Injectable({
  providedIn: "root",
})
export class PostsService {



  private posts: post[] = [];
  postsUpdated = new Subject<{ posts: post[], length: number }>();
  constructor(private http: HttpClient, private router: Router) { }

  getPostsUpdatedListner() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {

    return this.http.get<{ _id: string, title: string, content: string, imagePath: string ,creator:string}>(B_URL + id);


  }
  getPosts(currentpage: number, pageSize: number) {
    const queryParams = '?' + 'currentPage=' + currentpage + '&pageSize=' + pageSize;
    this.http
      .get<{ message: string; posts: any, postsCount: number }>(
      B_URL + queryParams
      )
      .pipe(map((postData) => {
        return {
          posts: postData.posts.map((post: { title: any; content: any; _id: any; imagePath: any; creator: any; }) => {

            return {
              title: post.title,
              content: post.content,
              id: post._id
              , imagePath: post.imagePath,
              creator: post.creator

            };


          }), length: postData.postsCount
        };
      }))
      .subscribe((frontposts) => {
        this.posts = frontposts.posts;
        this.postsUpdated.next({ posts: [...this.posts], length: frontposts.length })
      });
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);

    this.http.
      post<{ message: string, post: post }>(
      B_URL, postData
      ).subscribe(response => {
        console.log(response.post)
        const post: post = {
          id: response.post.id
          , title: title, content: content, imagePath: response.post.imagePath, creator: response.post.creator
        };
console.log(post);

        this.posts.push(post);
        this.router.navigate(['/'])

      })


  }


  updatePost(id: string, title: string, content: string, image: any) {
    let postData: any;
    if (typeof (image) === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);

    }
    else {
      postData = { id: id, title: title, content: content, imagePath: image };
    }
    this.http.
      put<{ message: string, postId: string }>(
        B_URL + id, postData
      ).subscribe(response => {
        this.router.navigate(['/'])


      });

  }

  deletePost(postId: string) {

    return this.http.delete(B_URL+ postId);

  }
}
