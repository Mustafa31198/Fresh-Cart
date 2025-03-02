import { Component, inject } from '@angular/core';
import { BrandesService } from '../../core/services/brands/brandes.service';
import { IBrand } from '../../shared/interfaces/ibrand';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {

  private readonly _BrandesService =inject(BrandesService)
  products: IBrand[]=[];


  ngOnInit(): void {
    this._BrandesService.getAllProducts().subscribe({
      next: (res) => {
console.log(res);

        this.products = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });

  }

}
