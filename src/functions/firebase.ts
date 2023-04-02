
import { initializeApp } from 'firebase/app';
import{ getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
import { ref, getDatabase } from 'firebase/database';

import {config} from '../config';


const app = initializeApp(config);
const db = getFirestore(app);
const auth = getAuth(app)
const storage = getStorage(app)
const database = getDatabase(app)

const fb = {
    app:app,
    db:db,
    auth:auth,
    storage:storage,
    database:database,
}

export {fb}
