import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AllProductsComponent } from './components/pages/all-products/all-products.component';
import { SingleProductComponent } from './components/pages/single-product/single-product.component';
import { LoginComponent } from './components/pages/login/login.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { UserInterceptor } from './providers/user.interceptor';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { EditUserComponent } from './components/pages/edit-user/edit-user.component';
import { CartComponent } from './components/pages/user/cart/cart.component';
import { WishlistComponent } from './components/pages/user/wishlist/wishlist.component';
import { OrdersComponent } from './components/pages/user/orders/orders.component';
import { MyOrdersComponent } from './components/pages/admin/my-orders/my-orders.component';
import { MyProductsComponent } from './components/pages/admin/my-products/my-products.component';
import { AddProductComponent } from './components/pages/admin/add-product/add-product.component';
import { EditProductComponent } from './components/pages/admin/edit-product/edit-product.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    AllProductsComponent,
    SingleProductComponent,
    LoginComponent,
    FooterComponent,
    ProfileComponent,
    EditUserComponent,
    CartComponent,
    WishlistComponent,
    OrdersComponent,
    MyOrdersComponent,
    MyProductsComponent,
    AddProductComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:UserInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
