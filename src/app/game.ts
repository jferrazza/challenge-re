import { Time } from '@angular/common';

export interface Game {
    $key: string,
    name: string,
    venue: string,
    court: number,
    date: Date,
    time: Time,
    paidby: string,
    amount: string
}
