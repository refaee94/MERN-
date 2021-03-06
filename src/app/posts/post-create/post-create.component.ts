import { Component, OnInit, EventEmitter, Output, OnDestroy } from "@angular/core";
import { post } from "../postModel";
import { PostsService } from "../posts.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.scss"],
})
export class PostCreateComponent implements OnInit,OnDestroy {
  constructor(public postService: PostsService, public route: ActivatedRoute,private auth:AuthService) {}
  ngOnDestroy(): void {
this.authSub.unsubscribe();  }
  public mode = "create";
  private postId: string;
  public isLoading = false;
  public form: FormGroup;
  public imagePreview: string;
  authSub:Subscription;

  public post: post;

  ngOnInit(): void {
    this.authSub=this.auth.getAuthStatusListener().subscribe(res=>{


      this.isLoading=false;
    })
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      image: new FormControl(null, { validators: [Validators.required] }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";

        this.postId = paramMap.get("postId");
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe((postData) => {
          this.imagePreview = postData.imagePath;
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath,
            creator:postData.creator
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath,


          });
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }

  onSavePost() {
    if (!this.form.valid) {
      return;
    }
    this.isLoading = true;

    if (this.mode === "create") {
      this.postService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    } else {
      this.postService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );

      this.form.reset();
    }
  }

  onFileChoose(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }
}
