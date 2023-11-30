import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '@app/components/components.module';
import { FormsModule } from '@angular/forms';
import { PipeModule } from '@app/pipes/pipe.module';
import { AutoShipRoutingModule } from './auto-ship-routing.module';
import { AutoshipRegistrationDetailsComponent } from './autoship-registration-details/autoship-registration-details.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { autoShipFeatureKey, AutoShipReducer } from '@app/reducers/myoffice/auto-ship/auto-ship.reducer';
import { AutoShipEffect } from '@app/effects/myoffice/auto-ship/auto-ship.effects';
import { AutoshipRegisterModule } from './autoship-register/autoship-register.module';
import { adoRegisterFeatureKey, adoRegisterReducer } from '@app/reducers/myoffice/auto-ship/ado-register.reducer';
import { ADORegisterEffect } from '@app/effects/myoffice/auto-ship/ado-register.effect';
import { NgxPaginationModule } from 'ngx-pagination';
import { DirectiveModule } from '@app/directive/directive.module';
import { AutoshipPaymentStatusComponent } from './autoship-payment-status/autoship-payment-status.component';
import { AutoshipEditModule } from './autoship-edit/autoship-edit.module';
import { bankFeatureKey, bankReducer } from '@app/reducers/system/bank.reducer';
import { BankEffect } from '@app/effects/system/bank.effect';
import { adoPopupFeatureKey, adoPopupReducer } from '@app/reducers/myoffice/auto-ship/ado-popup.reducer';
import { ADOPopupEffect } from '@app/effects/myoffice/auto-ship/ado-popup.effect';
import { adoInfoFeatureKey, adoInfoReducer } from '@app/reducers/myoffice/auto-ship/ado-info.reducer';
import { ADOInfoEffect } from '@app/effects/myoffice/auto-ship/ado-info.effect';


@NgModule({
  declarations: [  
    AutoshipPaymentStatusComponent,
    AutoshipRegistrationDetailsComponent,
  ],
  imports: [
    CommonModule,
    AutoShipRoutingModule,
    ComponentsModule,
    AutoshipRegisterModule,
    AutoshipEditModule,
    FormsModule,
    PipeModule,
    StoreModule.forFeature(autoShipFeatureKey, AutoShipReducer),
    StoreModule.forFeature(adoPopupFeatureKey, adoPopupReducer),
    StoreModule.forFeature(adoRegisterFeatureKey, adoRegisterReducer),
    StoreModule.forFeature(adoInfoFeatureKey, adoInfoReducer),
    StoreModule.forFeature(bankFeatureKey, bankReducer),
    EffectsModule.forFeature([AutoShipEffect, ADORegisterEffect, ADOPopupEffect, ADOInfoEffect, BankEffect]),
    NgxPaginationModule,
    DirectiveModule 
  ],
})
export class AutoShipModule { }
