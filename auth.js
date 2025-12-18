// Firebase Authentication Manager
// Handles Google Sign-In, user state, and Firestore sync

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut as firebaseSignOut,
    onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import firebaseConfig from './firebase-config.js';

class AuthManager {
    constructor() {
        this.app = null;
        this.auth = null;
        this.db = null;
        this.currentUser = null;
        this.isInitialized = false;
        this.syncInProgress = false;

        this.init();

        // Listen for learned state changes from app
        window.addEventListener('learnedStateChanged', (e) => {
            if (this.isSignedIn()) {
                this.saveUserData({ learned: e.detail });
            }
        });
    }

    async init() {
        try {
            // Check if Firebase config is valid
            if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'YOUR_API_KEY_HERE') {
                console.warn('⚠️ Firebase not configured. Using localStorage only.');
                this.isInitialized = false;
                return;
            }

            // Initialize Firebase
            this.app = initializeApp(firebaseConfig);
            this.auth = getAuth(this.app);
            this.db = getFirestore(this.app);
            this.isInitialized = true;

            console.log('✅ Firebase initialized successfully');

            // Set up auth state listener
            onAuthStateChanged(this.auth, async (user) => {
                await this.handleAuthStateChange(user);
            });

        } catch (error) {
            console.error('❌ Firebase initialization failed:', error);
            console.warn('⚠️ Falling back to localStorage only');
            this.isInitialized = false;
        }
    }

    async handleAuthStateChange(user) {
        this.currentUser = user;

        if (user) {
            console.log('👤 User signed in:', user.email);

            // Update UI
            this.updateAuthUI(true);

            // Load user data from Firestore
            const userData = await this.loadUserData();

            // Dispatch event for app to react
            window.dispatchEvent(new CustomEvent('authStateChanged', {
                detail: {
                    user,
                    isSignedIn: true,
                    learned: userData?.learned || {}
                }
            }));

        } else {
            console.log('👤 User signed out');

            // Update UI
            this.updateAuthUI(false);

            // Dispatch event for app to react
            window.dispatchEvent(new CustomEvent('authStateChanged', {
                detail: { user: null, isSignedIn: false }
            }));
        }
    }

    updateAuthUI(isSignedIn) {
        const signInBtn = document.getElementById('signInBtn');
        const userProfile = document.getElementById('userProfile');
        const userAvatar = document.getElementById('userAvatar');
        const userName = document.getElementById('userName');

        if (isSignedIn && this.currentUser) {
            // Hide sign in button
            if (signInBtn) signInBtn.classList.add('hidden');

            // Show user profile
            if (userProfile) {
                userProfile.classList.remove('hidden');

                // Set avatar
                if (userAvatar && this.currentUser.photoURL) {
                    userAvatar.src = this.currentUser.photoURL;
                }

                // Set name
                if (userName) {
                    userName.textContent = this.currentUser.displayName || this.currentUser.email;
                }
            }
        } else {
            // Show sign in button
            if (signInBtn) signInBtn.classList.remove('hidden');

            // Hide user profile
            if (userProfile) userProfile.classList.add('hidden');
        }
    }

    async signInWithGoogle() {
        if (!this.isInitialized) {
            alert('Firebase is not configured. Please add your Firebase config to firebase-config.js');
            return;
        }

        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(this.auth, provider);

            console.log('✅ Sign in successful:', result.user.email);

            // Check if this is first sign in - migrate local data
            const userDoc = await this.getUserDoc();
            if (!userDoc.exists()) {
                console.log('📦 First sign in - migrating local data to cloud');
                await this.migrateLocalData();
            }

            // Track sign in event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'login', {
                    method: 'Google'
                });
            }

        } catch (error) {
            console.error('❌ Sign in failed:', error);

            if (error.code === 'auth/popup-blocked') {
                alert('Pop-up blocked! Please allow pop-ups for this site and try again.');
            } else if (error.code === 'auth/popup-closed-by-user') {
                console.log('User closed the sign-in popup');
            } else {
                alert('Sign in failed. Please try again.');
            }
        }
    }

    async signOut() {
        if (!this.isInitialized || !this.currentUser) return;

        try {
            await firebaseSignOut(this.auth);
            console.log('✅ Sign out successful');

            // Track sign out event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'logout');
            }

        } catch (error) {
            console.error('❌ Sign out failed:', error);
            alert('Sign out failed. Please try again.');
        }
    }

    async getUserDoc() {
        if (!this.currentUser) return null;

        const userRef = doc(this.db, 'users', this.currentUser.uid);
        return await getDoc(userRef);
    }

    async loadUserData() {
        if (!this.currentUser) return null;

        try {
            const userDoc = await this.getUserDoc();

            if (userDoc.exists()) {
                const data = userDoc.data();
                console.log('📥 Loaded user data from cloud:', data);
                return data.preferences;
            } else {
                console.log('📝 No cloud data found - will use local data');
                return null;
            }

        } catch (error) {
            console.error('❌ Failed to load user data:', error);
            return null;
        }
    }

    async saveUserData(preferences) {
        if (!this.isInitialized || !this.currentUser) {
            // Not signed in - save to localStorage only
            this.saveToLocalStorage(preferences);
            return;
        }

        // Prevent concurrent saves
        if (this.syncInProgress) {
            console.log('⏳ Sync already in progress, skipping...');
            return;
        }

        this.syncInProgress = true;

        try {
            // Show sync indicator
            this.showSyncIndicator(true);

            const userRef = doc(this.db, 'users', this.currentUser.uid);

            await setDoc(userRef, {
                preferences: {
                    ...preferences,
                    lastUpdated: serverTimestamp()
                },
                email: this.currentUser.email,
                displayName: this.currentUser.displayName,
                photoURL: this.currentUser.photoURL
            }, { merge: true });

            console.log('📤 Saved user data to cloud:', preferences);

            // Also save to localStorage as backup
            this.saveToLocalStorage(preferences);

            // Hide sync indicator after short delay
            setTimeout(() => this.showSyncIndicator(false), 500);

        } catch (error) {
            console.error('❌ Failed to save user data:', error);

            // Fallback to localStorage
            this.saveToLocalStorage(preferences);

            this.showSyncIndicator(false);
        } finally {
            this.syncInProgress = false;
        }
    }

    saveToLocalStorage(preferences) {
        if (preferences.progress !== undefined) {
            localStorage.setItem('hiragana-progress', preferences.progress);
        }
        if (preferences.theme !== undefined) {
            localStorage.setItem('hiragana-theme', preferences.theme);
        }
        if (preferences.darkMode !== undefined) {
            localStorage.setItem('hiragana-dark-mode', preferences.darkMode);
        }
        if (preferences.learned !== undefined) {
            localStorage.setItem('hiragana-learned', JSON.stringify(preferences.learned));
        }
    }

    async migrateLocalData() {
        // Get current localStorage data
        const localProgress = localStorage.getItem('hiragana-progress');
        const localTheme = localStorage.getItem('hiragana-theme');
        const localDarkMode = localStorage.getItem('hiragana-dark-mode');
        const localLearned = localStorage.getItem('hiragana-learned');

        const preferences = {
            progress: localProgress ? parseInt(localProgress) : 0,
            theme: localTheme || 'forest',
            darkMode: localDarkMode === 'true',
            showStrokeOrder: true, // default
            learned: localLearned ? JSON.parse(localLearned) : {}
        };

        console.log('📦 Migrating local data to cloud:', preferences);

        await this.saveUserData(preferences);
    }

    showSyncIndicator(show) {
        const indicator = document.getElementById('syncIndicator');
        if (indicator) {
            if (show) {
                indicator.classList.remove('hidden');
            } else {
                indicator.classList.add('hidden');
            }
        }
    }

    isSignedIn() {
        return this.isInitialized && this.currentUser !== null;
    }

    getUser() {
        return this.currentUser;
    }
}

// Create global instance
window.authManager = new AuthManager();

// Export for use in other modules
export default window.authManager;
