import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeroComponent } from './features/hero/hero.component';
import { ProductComponent } from './features/product/product.component';
import { CardsModule } from './shared/modules/cards/cards.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    ProductComponent,
    CardsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'projet_feucht_joe';
}
