import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatSort } from '@angular/material/sort';
import { ChunkPipe } from '../landpage/pipes/chunk.pipe';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    LayoutComponent,
    ProfileComponent,
  ],
  providers: [provideNativeDateAdapter()],

  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCardModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    DragDropModule,
    NgxDropzoneModule,
    CarouselModule,
    MatSort,
    ChunkPipe,
    MatTimepickerModule,
    MatDatepickerModule,
    TranslateModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCardModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    DragDropModule,
    NgxDropzoneModule,
    CarouselModule,
    MatSort,
    ChunkPipe,
    MatTimepickerModule,
    MatDatepickerModule,
    TranslateModule,
  ],
})
export class SharedModule { }
