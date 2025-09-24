import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import {
  injectStripe,
  StripeCardComponent
} from 'ngx-stripe';
import {
  StripeElementsOptions,
  StripeCardElementOptions
} from '@stripe/stripe-js';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomDetailsService } from '../../services/room-details.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  standalone: false
})
export class PaymentComponent implements OnInit {

  @ViewChild(StripeCardComponent) cardElement!: StripeCardComponent;
  private readonly fb = inject(UntypedFormBuilder);
  bookingId!: string
  totalPrice!: string | null
  constructor(private _route: ActivatedRoute, private _roomDetailsService: RoomDetailsService, private _router: Router) { }
  ngOnInit(): void {
    this.bookingId = this._route.snapshot.queryParamMap.get('bookingId') || '';
    this.totalPrice = this._route.snapshot.queryParamMap.get('totalPrice');
  }
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  checkoutForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });

  // Replace with your own public key
  stripe = injectStripe('pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8');

  createToken() {
    const name = this.checkoutForm.get('name')?.value;
    this.stripe
      .createToken(this.cardElement.element, { name })
      .subscribe({
        next: (res) => {
          if (res.token) {
            // Use the token
            console.log(res.token.id);
            this._roomDetailsService.payment(res.token.id, this.bookingId).subscribe({
              next: () => {
                this.checkoutForm.reset()
                console.log(this._router); 
                this._router.navigate(['/completedPayment'])
              }
            })
          }
        },
        complete: () => {
        }
      })
  }
}
