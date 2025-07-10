import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }, { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) }, { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }, { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) }, { path: 'place-order', loadChildren: () => import('./place-order/place-order.module').then(m => m.PlaceOrderModule) }, { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) }, { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) }, { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) }, { path: 'success', loadChildren: () => import('./success/success.module').then(m => m.SuccessModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
