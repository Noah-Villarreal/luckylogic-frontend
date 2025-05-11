import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from 'firebase/firestore';
import db from './firebase';

const REFERRALS_COLLECTION = 'referrals';

// Register a new code (if it's not in Firestore yet)
export async function registerReferralCode(code) {
  const codeDoc = doc(db, REFERRALS_COLLECTION, code);
  const snapshot = await getDoc(codeDoc);

  if (!snapshot.exists()) {
    await setDoc(codeDoc, {
      uses: 0,
      createdAt: serverTimestamp(),
    });
  }
}

// Redeem a referral code (boost inviter + return true if it worked)
export async function redeemReferralCode(code) {
  if (!code) return false;

  const codeDoc = doc(db, REFERRALS_COLLECTION, code);
  const snapshot = await getDoc(codeDoc);

  if (snapshot.exists()) {
    await updateDoc(codeDoc, {
      uses: increment(1),
      lastUsed: serverTimestamp(),
    });
    return true;
  } else {
    return false;
  }
}

// (Optional) Get how many people used a code
export async function getReferralStats(code) {
  const snapshot = await getDoc(doc(db, REFERRALS_COLLECTION, code));
  return snapshot.exists() ? snapshot.data() : null;
}