import { Component, OnInit, Inject } from "@angular/core";
import { inject } from "@angular/core/testing";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.scss"],
})
export class ErrorComponent{
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}


}
