import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loadPdtCate } from '@app/actions/shoppingmall/pdt-cate.action';
import { MyProgramConstant } from '@app/common/constant/my-program.constant';
import { ValidationUtil } from '@app/common/util/validation.util';
import { PdtCateModel } from '@app/models/shoppingmall/pdt-cate.model';
import { getPdtCates, PdtCateState } from '@app/selectors/shoppingmall/pdt-cate.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';




@Component({
  selector: 'hp-categories',
  templateUrl: './hp-categories.component.html',
  styleUrls: ['./hp-categories.component.css']
})
export class HpCategoriesComponent implements OnInit {
  @Input() urlWownet : String = "";

  pdtCates$ = new Observable<PdtCateModel[]>;
  contentsPdtCates : any = "";

  
  constructor(private _pdtCateStore: Store<PdtCateState>,   private _router: Router,) { 
    this.pdtCates$ = this._pdtCateStore.select(getPdtCates);
  }

  ngOnInit(): void {
    this.loadDataPdtCate();

    let e = document.getElementById("st-product-sets") as HTMLElement;
    
  }

  loadDataPdtCate() :void {
    this._pdtCateStore.dispatch(loadPdtCate({ key: "" }));
    this.pdtCates$.subscribe(res => {
      if (ValidationUtil.isNotNullAndNotEmpty(res)) {
        this.contentsPdtCates = res.filter(x => x.lv == "1");
      }
    });
  }

  goToShoppingMall(item : any) {
    this._router.navigateByUrl(MyProgramConstant.urlShopping + `?cate=${item.cateCd}`);
  }
}
