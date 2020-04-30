import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
exports:[    MatCardModule,MatDialogModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatInputModule,
  MatToolbarModule,
  MatPaginatorModule]
})
export class AngularMaterialModuleModule { }
