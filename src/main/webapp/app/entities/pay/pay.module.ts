import { NgModule } from '@angular/core';
import { StepperPayComponent } from './stepper/stepper-pay.component';
import { Step1TipoOrdenComponent } from './stepper/step1-tipo-orden/step1-tipo-orden.component';
import { Step2MedioPagoComponent } from './stepper/step2-medio-pago/step2-medio-pago.component';
import { Step3ConfirmarPagoComponent } from './stepper/step3-confirmar-pago/step3-confirmar-pago.component';
import { ListPayComponent } from './list/list-pay.component';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { PAY_ROUTE } from './route/payment.route';
import { CuentaCorrienteComponent } from './stepper/step1-tipo-orden/cuenta-corriente/cuenta-corriente.component';
import { DirectoComponent } from './stepper/step1-tipo-orden/directo/directo.component';
import { LoteComponent } from './stepper/step1-tipo-orden/lote/lote.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(PAY_ROUTE), NgxMaskModule.forChild()],
  declarations: [
    ListPayComponent,
    StepperPayComponent,
    Step1TipoOrdenComponent,
    Step2MedioPagoComponent,
    Step3ConfirmarPagoComponent,
    CuentaCorrienteComponent,
    DirectoComponent,
    LoteComponent,
  ],
})
export class PayModule {}
