"use strict";

import { auth } from "./auth.reducer";
import { loadingSpinnerReducer } from "./loading.reducer";
import { MessageReducer } from "./message.reducer";
import { CustomerReducer } from './customer.reducer';
import { AdminReducer } from './admin.reducer';

export default {
    loading: loadingSpinnerReducer,
    auth: auth,
    message: MessageReducer,
    customer: CustomerReducer,
    admin: AdminReducer
}