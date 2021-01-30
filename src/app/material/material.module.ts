import { NgModule } from '@angular/core';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';

const MateralComponents:any[]=[
                              MatDatepickerModule,
                               MatNativeDateModule
                              ]

@NgModule({
  imports: [MateralComponents],
  exports:[MateralComponents]})
export class MaterialModule { }
