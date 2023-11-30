import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HpNoticeComponent } from './hp-notice/hp-notice.component';
import { HpProductsComponent } from './hp-products/hp-products.component';
import { HpSliderComponent } from './hp-slider/hp-slider.component';
import { HpMediaComponent } from './hp-media/hp-media.component';
import { StoreModule } from "@ngrx/store";
import { bannerSearchFeatureKey, bannerSearchReducer } from "@app/reducers/homepage/banner.reducer";
import { EffectsModule } from "@ngrx/effects";
import { BannerEffect } from "@app/effects/homepage/banner.effect";
import { PdtCateEffect } from "@app/effects/shoppingmall/pdt-cate.effect";
import { NoticeEffect } from "@app/effects/myoffice/notice/notice.effects";
import { noticeSearchFeatureKey, noticeSearchReducer } from "@app/reducers/myoffice/notice/notice.reducer";
import { PopBoardEffect } from "@app/effects/homepage/pop-board.effect";
import { popBoardFeatureKey, popBoardReducer } from "@app/reducers/homepage/pop-board.reducer";
import { ComponentsModule } from "@app/components/components.module";
import { HpAboutComponent } from './hp-about/hp-about.component';
import { HpAboutUsComponent } from './hp-about-us/hp-about-us.component';
import { HpRegisterComponent } from './hp-register/hp-register.component';
import { NgxPaginationModule } from "ngx-pagination";
import { PipeModule } from "@app/pipes/pipe.module";
import { RouterModule } from "@angular/router";
import { BoardPopupComponent } from './board-popup/board-popup.component';
import { HpFeaturesComponent } from "./hp-features/hp-features.component";

@NgModule({
    declarations: [        
        HpNoticeComponent,
        HpProductsComponent,
        HpSliderComponent,
        HpMediaComponent,
        HpAboutComponent,
        HpAboutUsComponent,
        HpRegisterComponent,
        HpFeaturesComponent,
        BoardPopupComponent
    ],
    imports: [
        CommonModule,
        ComponentsModule,
        NgxPaginationModule,
        PipeModule,
        RouterModule,
        StoreModule.forFeature(bannerSearchFeatureKey, bannerSearchReducer),
        StoreModule.forFeature(noticeSearchFeatureKey, noticeSearchReducer),
        StoreModule.forFeature(popBoardFeatureKey, popBoardReducer),
        EffectsModule.forFeature([BannerEffect, NoticeEffect, PopBoardEffect])
    ],
    exports: [
        HpNoticeComponent,
        HpProductsComponent,
        HpSliderComponent,
        HpMediaComponent,
        HpAboutComponent,
        HpAboutUsComponent,
        HpRegisterComponent,
        HpFeaturesComponent,
        BoardPopupComponent
    ]
})
export class HomeIndexModule { }