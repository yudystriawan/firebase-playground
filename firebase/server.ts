import admin from "firebase-admin";
import { getApps, ServiceAccount } from "firebase-admin/app";
import { Auth, getAuth } from "firebase-admin/auth";
import { Firestore, getFirestore } from "firebase-admin/firestore";

let firestore: Firestore;
let auth: Auth;
const currentApps = getApps();

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

if (!currentApps.length) {
  const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });
  firestore = getFirestore(app);
  auth = getAuth(app);
} else {
  const app = currentApps[0];
  firestore = getFirestore(app);
  auth = getAuth(app);
}

export { auth, firestore };

export const getTotalPages = async (
  firestoreQuery: FirebaseFirestore.Query<
    FirebaseFirestore.DocumentData,
    FirebaseFirestore.DocumentData
  >,
  pageSize: number
) => {
  const queryCount = firestoreQuery.count();
  const countSnapshot = await queryCount.get();
  const countData = countSnapshot.data();
  const total = countData?.count || 0;
  const totalPages = Math.ceil(total / pageSize);
  return totalPages;
};
