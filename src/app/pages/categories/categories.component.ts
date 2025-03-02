import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  private readonly categoriesService = inject(CategoriesService);

    categories: ICategory[] = [];
  

    ngOnInit(): void {
   
  
      this.categoriesService.getAllCategories().subscribe({
        next: (res) => {
          console.log(res.data);
          this.categories = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
}
