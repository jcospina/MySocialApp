import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

import {Post} from "../../model/post";

@Injectable()
export class RestClientProvider {

  url: string = "http://localhost:3366/api/";
  needToUpdate: boolean = false;

  constructor(public http: Http) {
  }

  // --------------------------- User API ----------------------------------
  getUser(id: string) {
    return this.http.get(this.url + "getUser/" + id).map(res => res.json());
  }

  getUsersToFollow(id: string) {
    return this.http.get(this.url + "getUsersToFollow/" + id).map(res => res.json());
  }

  searchUsersToFollow(id: string, search: string) {
    return this.http.get(this.url + "searchUsers/" + id + "/" + search).map(res => res.json());
  }

  newUser(user: any) {
    let body = JSON.stringify(user);
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.url + "newUser", body, {headers: headers}).map(res => res.json());
  }

  login(email: string, password: string) {
    let body = {
      email: email,
      password: password
    };
    let params = JSON.stringify(body);
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.url + "login", params, {headers: headers}).map(res => res.json());
  }

  followUser(myId: string, otherId: string) {
    let body = {
      myId: myId,
      otherId: otherId
    };
    let params = JSON.stringify(body);
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.url + "followUser", params, {headers: headers}).map(res => res.json());
  }

  unfollowUser(myId: string, otherId: string) {
    let body = {
      myId: myId,
      otherId: otherId
    };
    let params = JSON.stringify(body);
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.url + "unfollowUser", params, {headers: headers}).map(res => res.json());
  }

  getFollowers(id: string) {
    return this.http.get(this.url + "getFollowers/" + id).map(res => res.json());
  }


  //----------------------------- Posts API -------------------------------------

  newPost(post: Post) {
    let body = JSON.stringify(post);
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.url + "newPost", body, {headers: headers}).map(res => res.json());
  }

  getMyPosts(userId: string) {
    return this.http.get(this.url + "getMyPosts/" + userId).map(res => res.json());
  }

  getPost(postId: string) {
    return this.http.get(this.url + "getPost/" + postId).map(res => res.json());
  }

  deletePost(postId: string) {
    return this.http.delete(this.url + "deletePost/" + postId).map(res => res.json());
  }

  getFeed(userId: string) {
    return this.http.get(this.url + "getFeed/" + userId).map(res => res.json());
  }

  likePost(postId: string, userId: string) {
    let body = {
      id: postId,
      userId: userId
    };
    let params = JSON.stringify(body);
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(this.url + "likePost", params, {headers: headers}).map(res => res.json());
  }

  dislikePost(postId: string, userId: string) {
    let body = {
      id: postId,
      userId: userId
    };
    let params = JSON.stringify(body);
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(this.url + "dislikePost", params, {headers: headers}).map(res => res.json());
  }

}
