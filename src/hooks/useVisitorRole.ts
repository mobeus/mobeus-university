/**
 * useVisitorRole Hook
 * 
 * Manages the visitor's role state (candidate or recruiter).
 * Provides role switching capability and persists to localStorage.
 * 
 * Usage:
 *   const { role, isRecruiter, switchRole } = useVisitorRole();
 * 
 * Role switching is triggered by:
 *   1. Tele detecting recruiter/candidate intent
 *   2. Direct call to switchRole()
 *   3. Window event 'visitorRoleChange'
 */

import { useState, useEffect, useCallback } from 'react';
import { VisitorRole } from '@/types/recruiter';

const STORAGE_KEY = 'visitorRole';

// Custom event type for role changes
declare global {
    interface WindowEventMap {
        'visitorRoleChange': CustomEvent<{ role: VisitorRole }>;
    }
}

// Helper to get initial role from localStorage (runs synchronously on first render)
const getInitialRole = (): VisitorRole => {
    if (typeof window === 'undefined') return 'candidate';
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'recruiter') return 'recruiter';
    } catch (error) {
        console.warn('[useVisitorRole] Failed to read initial role:', error);
    }
    return 'candidate';
};

export const useVisitorRole = () => {
    // Initialize with localStorage value (synchronous read on first render)
    const [role, setRole] = useState<VisitorRole>(getInitialRole);
    const [isInitialized, setIsInitialized] = useState(false);

    // Mark as initialized after first render
    useEffect(() => {
        setIsInitialized(true);
        console.log('[useVisitorRole] Initialized with role:', role);
    }, []);

    // Listen for role change events from Tele or other sources
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleRoleChange = (e: CustomEvent<{ role: VisitorRole }>) => {
            const newRole = e.detail.role;
            console.log('[useVisitorRole] Event received:', newRole);
            if (newRole === 'recruiter' || newRole === 'candidate') {
                console.log('[useVisitorRole] Setting role to:', newRole);
                setRole(newRole);
                try {
                    localStorage.setItem(STORAGE_KEY, newRole);
                } catch (error) {
                    console.warn('[useVisitorRole] Failed to persist role:', error);
                }
            }
        };

        // Also listen for storage changes (for cross-tab sync)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY && e.newValue) {
                const newRole = e.newValue as VisitorRole;
                if (newRole === 'recruiter' || newRole === 'candidate') {
                    console.log('[useVisitorRole] Storage change detected:', newRole);
                    setRole(newRole);
                }
            }
        };

        window.addEventListener('visitorRoleChange', handleRoleChange);
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('visitorRoleChange', handleRoleChange);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Switch role programmatically
    const switchRole = useCallback((newRole: VisitorRole) => {
        if (newRole !== 'recruiter' && newRole !== 'candidate') {
            console.warn('[useVisitorRole] Invalid role:', newRole);
            return;
        }

        setRole(newRole);

        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem(STORAGE_KEY, newRole);
            } catch (error) {
                console.warn('[useVisitorRole] Failed to persist role:', error);
            }

            // Dispatch event so other components can react
            window.dispatchEvent(
                new CustomEvent('visitorRoleChange', { detail: { role: newRole } })
            );
        }
    }, []);

    // Toggle between roles
    const toggleRole = useCallback(() => {
        const newRole = role === 'candidate' ? 'recruiter' : 'candidate';
        switchRole(newRole);
    }, [role, switchRole]);

    return {
        role,
        isRecruiter: role === 'recruiter',
        isCandidate: role === 'candidate',
        isInitialized,
        switchRole,
        toggleRole,
    };
};

// ============================================
// GLOBAL API FOR TELE INTEGRATION
// ============================================

/**
 * Expose role switching to window for Tele to call
 * This is set up once when the app loads
 */
export const exposeVisitorRoleAPI = () => {
    if (typeof window === 'undefined') return;

    // Function for Tele to switch to recruiter mode
    (window as any).switchToRecruiter = () => {
        // Update localStorage FIRST so any component reading it gets the new value
        try {
            localStorage.setItem(STORAGE_KEY, 'recruiter');
        } catch (error) {
            console.warn('[VisitorRole] Failed to persist recruiter role:', error);
        }

        // Then dispatch event to notify React components
        window.dispatchEvent(
            new CustomEvent('visitorRoleChange', { detail: { role: 'recruiter' } })
        );

        // Flash Tele for visual feedback (like avatar connection)
        if (typeof (window as any).UIFramework?.flashTele === 'function') {
            (window as any).UIFramework.flashTele();
        }

        console.log('[VisitorRole] Switched to recruiter mode');
    };

    // Function for Tele to switch to candidate mode
    (window as any).switchToCandidate = () => {
        // Update localStorage FIRST so any component reading it gets the new value
        try {
            localStorage.setItem(STORAGE_KEY, 'candidate');
        } catch (error) {
            console.warn('[VisitorRole] Failed to persist candidate role:', error);
        }

        // Then dispatch event to notify React components
        window.dispatchEvent(
            new CustomEvent('visitorRoleChange', { detail: { role: 'candidate' } })
        );

        // Flash Tele for visual feedback (like avatar connection)
        if (typeof (window as any).UIFramework?.flashTele === 'function') {
            (window as any).UIFramework.flashTele();
        }

        console.log('[VisitorRole] Switched to candidate mode');
    };

    // Function to get current role
    (window as any).getVisitorRole = (): VisitorRole => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored === 'recruiter' ? 'recruiter' : 'candidate';
    };

    // Function to check if recruiter
    (window as any).isRecruiterMode = (): boolean => {
        return localStorage.getItem(STORAGE_KEY) === 'recruiter';
    };
};

export default useVisitorRole;
