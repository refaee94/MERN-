import { Injectable } from "@angular/core";
import { post } from './postModel';
import { Observable, Subject } from 'rxjs';

/**
 * @description
 * @class
 */
@Injectable(
  {
    providedIn: 'root'

  }
)
export class PostsService {
  private posts: post[] = [];
  postsUpdated = new Subject<post[]>();
  constructor() {

  }


  getPostsUpdatedListner() {

    return this.postsUpdated.asObservable();

  }
  getPosts() {


    return [...this.posts]
  }

  addPost(title: string, content: string) {

    const post: post = { title: title, content: content };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }

}
