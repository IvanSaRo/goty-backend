import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import * as express from "express";
import * as cors from "cors";


const serviceAccount = require("./serviceAccountKey.json")


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://firestore-graph-85545.firebaseio.com"
  });

const db = admin.firestore();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
 export const helloWorld = functions.https.onRequest((request, response) => {
   functions.logger.info("Hello logs!", {structuredData: true});
   response.json({mensaje: "Hola mundo desde funciones!"});
 });

 export const getGOTY = functions.https.onRequest(async (request, response) => {
    
    const gotyRef  = db.collection("goty");
    const docsSnap = await gotyRef.get();
    const games    = docsSnap.docs.map( doc => doc.data() );

    response.json( games );
  });

 
 //Express

 
