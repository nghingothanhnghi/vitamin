import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MyProgramConstant } from '@app/common/constant/my-program.constant';
import { ConvertUtil } from '@app/common/util/convert.util';

@Component({
  selector: 'product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  constructor(
    private _activatedRoute: ActivatedRoute, 
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let cate = ConvertUtil.convertToSring(params.get("cateCd"));
      this._router.navigateByUrl(MyProgramConstant.urlShopping + `?cate=${cate}`);
    });
  }
}
