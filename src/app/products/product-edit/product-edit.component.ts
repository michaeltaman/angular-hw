import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs";

import * as productActions from "../state/product.actions";
import * as fromProduct from "../state/product.reducer";
import { Product } from "../product.model";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromProduct.AppState>
  ) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      title: ["", Validators.required],
      link: ["", Validators.required],
      price: ["", Validators.required],
      gender: ["", Validators.required],
      id: null
    })

    const product$: Observable<Product> = this.store.select(
      fromProduct.getCurrentProduct
    )

    product$.subscribe(currentProduct => {
      if (currentProduct) {
        this.productForm.patchValue({
          title: currentProduct.title,
          link: currentProduct.link,
          price: currentProduct.price,
          gender: currentProduct.gender,
          id: currentProduct.id
        });
      }
    })
  }

  updateProduct() {
    const updatedProduct: Product = {
      title: this.productForm.get("title").value,
      link: this.productForm.get("link").value,
      price: this.productForm.get("price").value,
      gender: this.productForm.get("gender").value,
      id: this.productForm.get("id").value
    };

    this.store.dispatch(new productActions.UpdateProduct(updatedProduct))
  }

}
