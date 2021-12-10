import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store, State, select } from "@ngrx/store";
import * as productActions from "../state/product.actions";
import * as fromProduct from "../state/product.reducer";
import { Product } from "../product.model";

@Component({
  selector: "app-product-add",
  templateUrl: "./product-add.component.html",
  styleUrls: ["./product-add.component.css"]
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromProduct.AppState>
  ) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      title: ["", Validators.required],
      link: ["", Validators.required],
      price: ["", Validators.required],
      gender: ["", Validators.required]
    });
  }

  createProduct() {
    const newProduct: Product = {
      title: this.productForm.get("title").value,
      link: this.productForm.get("link").value,
      price: this.productForm.get("price").value,
      gender: this.productForm.get("gender").value
    };

    this.store.dispatch(new productActions.CreateProduct(newProduct));

    this.productForm.reset();
  }
}