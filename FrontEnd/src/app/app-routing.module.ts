import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/pages/admin/add-product/add-product.component';
import { EditProductComponent } from './components/pages/admin/edit-product/edit-product.component';
import { MyOrdersComponent } from './components/pages/admin/my-orders/my-orders.component';
import { MyProductsComponent } from './components/pages/admin/my-products/my-products.component';
import { AllProductsComponent } from './components/pages/all-products/all-products.component';
import { EditUserComponent } from './components/pages/edit-user/edit-user.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { SingleProductComponent } from './components/pages/single-product/single-product.component';
import { CartComponent } from './components/pages/user/cart/cart.component';
import { OrdersComponent } from './components/pages/user/orders/orders.component';
import { WishlistComponent } from './components/pages/user/wishlist/wishlist.component';
import { AdminAuthGuard } from './providers/guards/admin-auth.guard';
import { AuthGuard } from './providers/guards/auth.guard';
import { NotAuthGuard } from './providers/guards/not-auth.guard';
import { UserAuthGuard } from './providers/guards/user-auth.guard';

const routes: Routes = [
  {path:'', component:AllProductsComponent},
  {path: 'register', component:RegisterComponent, canActivate:[AuthGuard]},
  {path:"single/:id", component:SingleProductComponent},
  {path: 'login', component: LoginComponent, canActivate:[AuthGuard]},
  {path:'profile', component:ProfileComponent, canActivate:[NotAuthGuard]},
  {path: 'edit', component:EditUserComponent, canActivate:[NotAuthGuard]},
  {path: 'cart', component:CartComponent, canActivate:[UserAuthGuard]},
  {path: 'wishlist', component:WishlistComponent, canActivate:[UserAuthGuard]},
  {path: 'orders', component:OrdersComponent, canActivate:[UserAuthGuard]},
  {path: 'adminProducts', component:MyProductsComponent, canActivate:[AdminAuthGuard]},
  {path: 'adminOrders', component:MyOrdersComponent, canActivate:[AdminAuthGuard]},
  {path: 'addProduct', component:AddProductComponent, canActivate:[AdminAuthGuard]},
  {path: 'editProduct/:id', component:EditProductComponent, canActivate:[AdminAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
