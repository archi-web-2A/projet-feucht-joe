import { Routes } from '@angular/router';
import { HeroComponent } from "./features/hero/hero.component";
import {CardsComponent} from "./shared/modules/cards/cards/cards.component";

export const routes: Routes = [
  { path: '', component: HeroComponent },
  {
    path: 'signup-validation',
    loadComponent: () => import('./features/sign-forms/signup-validation/signup-validation.component').then(c => c.SignupValidationComponent)
  },
  { path: 'sign-forms',
    loadComponent: () => import('./features/sign-forms/sign-forms.component').then(c => c.SignFormsComponent)
  },
  { path: 'cards', component: CardsComponent},
  {
    path: 'shopping-card',
    loadComponent: () => import('./features/shopping-card/shopping-card.component').then(c => c.ShoppingCardComponent)
  }
];
