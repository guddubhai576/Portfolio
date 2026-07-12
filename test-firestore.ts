import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { readFileSync } from 'fs';

const config = JSON.parse(readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function test() {
  try {
    const statRef = doc(db, 'siteStats', 'global');
    await updateDoc(statRef, { visits: increment(1) });
    console.log("Success update");
  } catch(e) {
    console.error("Update failed:", e);
  }
  process.exit(0);
}
test();
