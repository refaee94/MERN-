import { Injectable } from "@angular/core";
import { post } from "./postModel";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { map } from "rxjs/operators";
/**
 * @description
 * @class
 */
@Injectable({
  providedIn: "root",
})
export class PostsService {
  private posts: post[] = [];
  postsUpdated = new Subject<post[]>();
  constructor(private http: HttpClient) { }

  getPostsUpdatedListner() {
    return this.postsUpdated.asObservable();
  }
  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(
        "http://localhost:3000/api/posts"
      )
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };

        });
      }))
      .subscribe((frontposts) => {
        this.posts = frontposts;
        this.postsUpdated.next([...this.posts])
      });
  }

  addPost(title: string, content: string) {
    const post: post = { id: null, title: title, content: content };
    this.http.
      post<{ message: string,postId:string }>(
        "http://localhost:3000/api/posts", post
      ).subscribe((response) => {
post.id=response.postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);

      })

  }


  deletePost(postId: string) {

    this.http.delete('http://localhost:3000/api/posts/' + postId).subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id != postId );
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts])
    });

  }
}
