/**
 * 🎄 Coca-Cola Christmas Theme Test File
 * This file demonstrates the theme's syntax highlighting capabilities
 * across various JavaScript/TypeScript constructs and patterns.
 */

// Import statements - should show in frosted blue
import React, { useState, useEffect } from 'react';
import { ChristmasTree, SnowFlake, HolidayLights } from './holiday-components';
import * as HolidayUtils from '../utils/holiday-helpers';

// Constants - should show in golden yellow
const CHRISTMAS_COLORS = {
    COCA_COLA_RED: '#ec1c24',
    SNOW_WHITE: '#ffffff',
    HOLLY_GREEN: '#006400',
    GOLDEN_YELLOW: '#ffd700',
    FROSTED_BLUE: '#e6f0ff'
};

const HOLIDAY_MESSAGES = [
    "Merry Christmas!", // Strings in holly green
    "Happy Holidays!",
    "Season's Greetings!",
    "Joy to the World!"
];

// Class definition - class name in golden yellow
class ChristmasThemeDemo {
    constructor(themeName = 'Coca-Cola Christmas') {
        this.themeName = themeName; // Variables in snow white
        this.isActive = false; // Booleans
        this.activationCount = 0; // Numbers in bright golden
        this.features = new Set(); // Built-in objects
    }

    // Method - function names in frosted blue
    activateTheme() {
        console.log(`🎄 Activating ${this.themeName} theme...`);
        
        // Keywords in Coca-Cola red
        if (!this.isActive) {
            this.isActive = true;
            this.activationCount++;
            
            // Template literals
            const message = `Theme activated ${this.activationCount} times`;
            console.log(message);
            
            // Arrow functions
            const showFeatures = () => {
                this.features.forEach(feature => {
                    console.log(`✨ Feature: ${feature}`);
                });
            };
            
            showFeatures();
        } else {
            console.warn('⚠️ Theme is already active!');
        }
    }

    // Async/await example
    async loadHolidayAssets() {
        try {
            const snowflakes = await fetch('/api/snowflakes');
            const lights = await fetch('/api/christmas-lights');
            
            return {
                snowflakes: await snowflakes.json(),
                lights: await lights.json()
            };
        } catch (error) {
            console.error('❌ Failed to load holiday assets:', error);
            throw new Error('Holiday assets unavailable');
        }
    }

    // Generator function
    *generateSnowflakes(count = 10) {
        for (let i = 0; i < count; i++) {
            yield {
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 5 + 1,
                symbol: ['❄', '❅', '❆'][Math.floor(Math.random() * 3)]
            };
        }
    }
}

// Function declarations
function createHolidayGreeting(name, language = 'en') {
    // Switch statement
    switch (language) {
        case 'en':
            return `🎅 Merry Christmas, ${name}!`;
        case 'es':
            return `🎄 ¡Feliz Navidad, ${name}!`;
        case 'fr':
            return `🎁 Joyeux Noël, ${name}!`;
        case 'de':
            return `⭐ Frohe Weihnachten, ${name}!`;
        default:
            return `🌟 Happy Holidays, ${name}!`;
    }
}

// React component example
const HolidayApp = ({ theme = 'coca-cola-christmas' }) => {
    // Hooks
    const [isSnowing, setIsSnowing] = useState(false);
    const [lightPattern, setLightPattern] = useState('twinkle');
    const [giftCount, setGiftCount] = useState(0);

    // useEffect hook
    useEffect(() => {
        const interval = setInterval(() => {
            setIsSnowing(prev => !prev);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Event handlers
    const handleGiftClick = (event) => {
        event.preventDefault();
        setGiftCount(prev => prev + 1);
        
        // Show celebration animation
        if (giftCount > 0 && giftCount % 5 === 0) {
            console.log('🎉 Celebration time!');
        }
    };

    // JSX with holiday theme
    return (
        <div className={`holiday-app theme-${theme}`}>
            <header className="holiday-header">
                <h1>🎄 Holiday Coding Experience</h1>
                <p>Powered by Coca-Cola Christmas Theme</p>
            </header>
            
            <main className="holiday-content">
                {/* Conditional rendering */}
                {isSnowing && (
                    <div className="snowfall">
                        {Array.from({ length: 50 }, (_, i) => (
                            <SnowFlake key={i} delay={i * 100} />
                        ))}
                    </div>
                )}
                
                <ChristmasTree 
                    lights={lightPattern}
                    ornaments={['🔴', '🟡', '🟢', '🔵']}
                    star="⭐"
                />
                
                <div className="gift-counter">
                    <button onClick={handleGiftClick}>
                        🎁 Open Gift ({giftCount})
                    </button>
                </div>
                
                <HolidayLights pattern={lightPattern} />
            </main>
            
            <footer className="holiday-footer">
                <p>Made with ❤️ and holiday spirit</p>
            </footer>
        </div>
    );
};

// Advanced JavaScript features
const holidayFeatures = {
    // Object destructuring
    ...CHRISTMAS_COLORS,
    
    // Computed property names
    [`theme_${Date.now()}`]: 'coca-cola-christmas',
    
    // Method shorthand
    greet(name) {
        return `🎅 Ho ho ho, ${name}!`;
    },
    
    // Getter/setter
    get currentSeason() {
        const month = new Date().getMonth();
        return month === 11 ? 'Christmas' : 'Regular';
    },
    
    set themeMode(mode) {
        this._mode = mode;
        console.log(`🎨 Theme mode set to: ${mode}`);
    }
};

// Array methods and functional programming
const holidayTasks = [
    'Decorate the tree',
    'Wrap presents',
    'Bake cookies',
    'Send holiday cards',
    'Plan family dinner'
];

const completedTasks = holidayTasks
    .map((task, index) => ({ id: index, task, completed: Math.random() > 0.5 }))
    .filter(item => item.completed)
    .sort((a, b) => a.task.localeCompare(b.task));

// Regular expressions
const holidayPattern = /🎄|🎅|🎁|❄️|⭐/g;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Error handling
class HolidayError extends Error {
    constructor(message, code = 'HOLIDAY_ERROR') {
        super(message);
        this.name = 'HolidayError';
        this.code = code;
    }
}

// Module exports
export default HolidayApp;
export { 
    ChristmasThemeDemo, 
    createHolidayGreeting, 
    holidayFeatures,
    CHRISTMAS_COLORS,
    HolidayError
};

// Type annotations (if using TypeScript)
/*
interface HolidayTheme {
    name: string;
    colors: {
        primary: string;
        secondary: string;
        accent: string;
    };
    features: string[];
}

type ThemeVariant = 'regular' | 'soft' | 'high-contrast';

const themeConfig: HolidayTheme = {
    name: 'Coca-Cola Christmas',
    colors: CHRISTMAS_COLORS,
    features: ['snowfall', 'lights', 'ornaments']
};
*/

// Comments showcase
/* 
 * Multi-line comment
 * This demonstrates how comments look in the theme
 * They should be in a muted color for readability
 */

// Single-line comment with TODO
// TODO: Add more holiday animations

/**
 * JSDoc comment example
 * @param {string} message - The holiday message
 * @param {Object} options - Configuration options
 * @returns {Promise<string>} Formatted holiday greeting
 */
async function sendHolidayGreeting(message, options = {}) {
    // Implementation here
    return `🎄 ${message}`;
}

console.log('🎄 Coca-Cola Christmas Theme test file loaded successfully!');
console.log('✨ Check out the beautiful syntax highlighting!');
console.log('🎅 Happy Holiday Coding!');
