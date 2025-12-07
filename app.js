/**
 * Coca-Cola Christmas Theme - VS Code Extension Entry Point
 * Brings festive holiday spirit to your coding environment
 */

const vscode = require('vscode');

/**
 * Called when the extension is activated
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
    console.log('🎄 Coca-Cola Christmas Theme extension is now active!');
    
    // Register command to show welcome message manually
    const welcomeCommand = vscode.commands.registerCommand('coca-cola-christmas.showWelcome', () => {
        showWelcomeMessage();
    });
    
    context.subscriptions.push(welcomeCommand);
    
    // Check if this is the first time the extension is activated (installation)
    const hasShownWelcome = context.globalState.get('hasShownWelcome', false);
    
    if (!hasShownWelcome) {
        // Mark that we've shown the welcome message
        await context.globalState.update('hasShownWelcome', true);
        
        // Automatically show welcome message on first installation
        showWelcomeMessage();
    }
}

/**
 * Shows the welcome message in a webview panel
 */
function showWelcomeMessage() {
    const panel = vscode.window.createWebviewPanel(
        'cocaColaChristmasWelcome',
        '🎄 Coca-Cola Christmas Theme',
        vscode.ViewColumn.One,
        {
            enableScripts: true,
            retainContextWhenHidden: true
        }
    );
    
    panel.webview.html = getWelcomeHtml();
    
    // Handle messages from the webview
    panel.webview.onDidReceiveMessage(
        message => {
            switch (message.command) {
                case 'activateTheme':
                    vscode.commands.executeCommand('workbench.action.selectTheme');
                    break;
                case 'openSettings':
                    vscode.commands.executeCommand('workbench.action.openSettings', 'workbench.colorTheme');
                    break;
            }
        }
    );
}

/**
 * Generates the HTML content for the welcome webview
 */
function getWelcomeHtml() {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Coca-Cola Christmas Theme</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Fredoka+One:wght@400&family=Open+Sans:wght@400;600;700&display=swap');
            
            body {
                background: linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 50%, #080808 100%);
                color: #ffffff;
                font-family: 'Open Sans', sans-serif;
                margin: 0;
                padding: 20px;
                min-height: 100vh;
                overflow-x: hidden;
                position: relative;
            }
            
            /* Animated snowflakes */
            .snowflakes {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: -1;
            }
            
            .snowflake {
                position: absolute;
                color: #ffffff;
                font-size: 1em;
                animation: fall linear infinite;
                opacity: 0.8;
            }
            
            @keyframes fall {
                0% {
                    transform: translateY(-100vh) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
            
            /* Christmas lights animation */
            .lights {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 20px;
                background: repeating-linear-gradient(
                    90deg,
                    #ec1c24 0px,
                    #ec1c24 20px,
                    #ffd700 20px,
                    #ffd700 40px,
                    #006400 40px,
                    #006400 60px
                );
                animation: twinkle 2s ease-in-out infinite alternate;
                z-index: 10;
            }
            
            @keyframes twinkle {
                0% { opacity: 0.7; }
                100% { opacity: 1; }
            }
            
            .container {
                max-width: 900px;
                margin: 40px auto 0;
                text-align: center;
                position: relative;
                z-index: 1;
            }
            
            .coca-cola-title {
                font-family: 'Fredoka One', cursive;
                font-size: 4em;
                font-weight: bold;
                color: #ec1c24;
                margin-bottom: 10px;
                text-shadow: 
                    0 0 10px #ec1c24,
                    0 0 20px #ec1c24,
                    0 0 30px #ec1c24,
                    3px 3px 0px #ffffff;
                animation: glow 3s ease-in-out infinite alternate;
                letter-spacing: 2px;
            }
            
            .christmas-subtitle {
                font-family: 'Fredoka One', cursive;
                font-size: 2.5em;
                color: #ffd700;
                margin-bottom: 30px;
                text-shadow: 
                    0 0 10px #ffd700,
                    2px 2px 0px #006400;
                animation: sparkle 2s ease-in-out infinite alternate;
            }
            
            @keyframes glow {
                from { 
                    text-shadow: 
                        0 0 10px #ec1c24,
                        0 0 20px #ec1c24,
                        0 0 30px #ec1c24,
                        3px 3px 0px #ffffff;
                }
                to { 
                    text-shadow: 
                        0 0 20px #ec1c24,
                        0 0 30px #ec1c24,
                        0 0 40px #ec1c24,
                        3px 3px 0px #ffffff;
                }
            }
            
            @keyframes sparkle {
                from { 
                    text-shadow: 
                        0 0 10px #ffd700,
                        2px 2px 0px #006400;
                }
                to { 
                    text-shadow: 
                        0 0 20px #ffd700,
                        0 0 30px #ffd700,
                        2px 2px 0px #006400;
                }
            }
            
            .welcome-box {
                background: rgba(26, 26, 26, 0.9);
                border: 3px solid #ec1c24;
                border-radius: 20px;
                padding: 40px;
                margin: 30px 0;
                box-shadow: 
                    0 0 30px rgba(236, 28, 36, 0.5),
                    inset 0 0 20px rgba(236, 28, 36, 0.1);
                backdrop-filter: blur(10px);
                position: relative;
                overflow: hidden;
            }
            
            .welcome-box::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle, #ec1c24 0%, transparent 70%);
                opacity: 0.05;
                animation: rotate 20s linear infinite;
                z-index: -1;
            }
            
            @keyframes rotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .feature-list {
                text-align: left;
                margin: 30px 0;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 15px;
            }
            
            .feature-item {
                padding: 20px;
                background: rgba(236, 28, 36, 0.1);
                border-left: 4px solid #ec1c24;
                border-radius: 10px;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }
            
            .feature-item::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.2), transparent);
                transition: left 0.5s;
            }
            
            .feature-item:hover::before {
                left: 100%;
            }
            
            .feature-item:hover {
                background: rgba(236, 28, 36, 0.2);
                transform: translateX(10px);
                border-left-color: #ffd700;
            }
            
            .button {
                background: linear-gradient(45deg, #ec1c24, #ff3333);
                border: none;
                color: #ffffff;
                padding: 18px 35px;
                margin: 15px;
                border-radius: 30px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                text-transform: uppercase;
                letter-spacing: 2px;
                position: relative;
                overflow: hidden;
                font-size: 1.1em;
                box-shadow: 0 5px 15px rgba(236, 28, 36, 0.3);
            }
            
            .button::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                transition: left 0.5s;
            }
            
            .button:hover::before {
                left: 100%;
            }
            
            .button:hover {
                transform: translateY(-3px);
                box-shadow: 0 10px 25px rgba(236, 28, 36, 0.5);
                background: linear-gradient(45deg, #ff3333, #ec1c24);
            }
            
            .button-secondary {
                background: linear-gradient(45deg, #006400, #228b22);
                box-shadow: 0 5px 15px rgba(0, 100, 0, 0.3);
            }
            
            .button-secondary:hover {
                background: linear-gradient(45deg, #228b22, #006400);
                box-shadow: 0 10px 25px rgba(0, 100, 0, 0.5);
            }
            
            .theme-preview {
                display: flex;
                justify-content: space-around;
                margin: 40px 0;
                flex-wrap: wrap;
                gap: 20px;
            }
            
            .theme-card {
                background: rgba(8, 8, 8, 0.9);
                border: 2px solid #ec1c24;
                border-radius: 20px;
                padding: 30px;
                flex: 1;
                min-width: 280px;
                max-width: 400px;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }
            
            .theme-card::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle, #ffd700 0%, transparent 70%);
                opacity: 0;
                transition: opacity 0.3s ease;
                z-index: -1;
            }
            
            .theme-card:hover::before {
                opacity: 0.1;
            }
            
            .theme-card:hover {
                transform: translateY(-10px);
                border-color: #ffd700;
                box-shadow: 0 20px 40px rgba(236, 28, 36, 0.4);
            }
            
            .theme-name {
                color: #ffd700;
                font-size: 1.4em;
                font-weight: bold;
                margin-bottom: 15px;
                text-shadow: 0 0 10px #ffd700;
            }
            
            .ascii-art {
                font-family: 'Courier New', monospace;
                font-size: 0.4em;
                color: #ec1c24;
                white-space: pre;
                margin: 30px 0;
                text-shadow: 0 0 10px #ec1c24;
                line-height: 1.1;
                animation: pulse 3s ease-in-out infinite;
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 0.8; }
                50% { opacity: 1; }
            }
            
            .instructions {
                background: rgba(0, 100, 0, 0.1);
                border: 2px solid #006400;
                border-radius: 15px;
                padding: 25px;
                margin: 30px 0;
                text-align: left;
            }
            
            .step {
                margin: 12px 0;
                padding: 8px 0;
                font-size: 1.1em;
            }
            
            .step-number {
                color: #ffd700;
                font-weight: bold;
                font-size: 1.2em;
            }
            
            .subtitle {
                color: #f2f2f2;
                font-size: 1.2em;
                margin-bottom: 25px;
                font-weight: 600;
            }
            
            .emoji {
                font-size: 1.8em;
                margin: 0 8px;
                animation: bounce 2s ease-in-out infinite;
            }
            
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-10px); }
                60% { transform: translateY(-5px); }
            }
            
            .holiday-message {
                background: rgba(255, 215, 0, 0.1);
                border: 2px solid #ffd700;
                border-radius: 15px;
                padding: 25px;
                margin: 30px 0;
                font-size: 1.1em;
                font-style: italic;
            }
        </style>
    </head>
    <body>
        <!-- Christmas lights -->
        <div class="lights"></div>
        
        <!-- Animated snowflakes -->
        <div class="snowflakes" id="snowflakes"></div>
        
        <div class="container">
            <div class="coca-cola-title">COCA-COLA</div>
            <div class="christmas-subtitle">CHRISTMAS</div>
            
            <div class="ascii-art">
    ░█████╗░░█████╗░░█████╗░░█████╗░░░░░░░█████╗░░█████╗░██╗░░░░░░█████╗░
    ██╔══██╗██╔══██╗██╔══██╗██╔══██╗░░░░░██╔══██╗██╔══██╗██║░░░░░██╔══██╗
    ██║░░╚═╝██║░░██║██║░░╚═╝██║░░██║█████╗██║░░╚═╝██║░░██║██║░░░░░███████║
    ██║░░██╗██║░░██║██║░░██╗██║░░██║╚════╝██║░░██╗██║░░██║██║░░░░░██╔══██║
    ╚█████╔╝╚█████╔╝╚█████╔╝╚█████╔╝░░░░░░╚█████╔╝╚█████╔╝███████╗██║░░██║
    ░╚════╝░░╚════╝░░╚════╝░░╚════╝░░░░░░░░╚════╝░░╚════╝░╚══════╝╚═╝░░╚═╝
    
    ░█████╗░██╗░░██╗██████╗░██╗░██████╗████████╗███╗░░░███╗░█████╗░░██████╗
    ██╔══██╗██║░░██║██╔══██╗██║██╔════╝╚══██╔══╝████╗░████║██╔══██╗██╔════╝
    ██║░░╚═╝███████║██████╔╝██║╚█████╗░░░░██║░░░██╔████╔██║███████║╚█████╗░
    ██║░░██╗██╔══██║██╔══██╗██║░╚═══██╗░░░██║░░░██║╚██╔╝██║██╔══██║░╚═══██╗
    ╚█████╔╝██║░░██║██║░░██║██║██████╔╝░░░██║░░░██║░╚═╝░██║██║░░██║██████╔╝
    ░╚════╝░╚═╝░░╚═╝╚═╝░░╚═╝╚═╝╚═════╝░░░░╚═╝░░░╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═════╝░
            </div>
            
            <div class="welcome-box">
                <h2><span class="emoji">🎄</span>WELCOME TO THE HOLIDAY CODING EXPERIENCE<span class="emoji">🎄</span></h2>
                <p class="subtitle">Thank you for installing the <strong>Coca-Cola Christmas Theme</strong>!</p>
                <p><span class="emoji">❄️</span>Transform your VS Code into a festive winter wonderland with classic holiday colors.</p>
            </div>
            
            <div class="theme-preview">
                <div class="theme-card">
                    <div class="theme-name">🎅 Coca-Cola Christmas</div>
                    <p>Full festive experience with deep winter night backgrounds, snow-white text, and classic Coca-Cola red accents. Perfect for getting into the holiday spirit while coding!</p>
                </div>
                <div class="theme-card">
                    <div class="theme-name">🕯️ Coca-Cola Christmas Soft</div>
                    <p>Softer holiday variant with muted winter colors, ideal for extended coding sessions during those long winter nights.</p>
                </div>
            </div>
            
            <div class="feature-list">
                <div class="feature-item">🌨️ Deep winter night backgrounds for that cozy coding feeling</div>
                <div class="feature-item">❄️ Snow-white text that's easy on the eyes</div>
                <div class="feature-item">🎅 Classic Coca-Cola red for keywords and important elements</div>
                <div class="feature-item">🎄 Holly green accents for strings and success states</div>
                <div class="feature-item">✨ Warm golden highlights for constants and special elements</div>
                <div class="feature-item">🔔 Frosted glass blue for functions and information</div>
                <div class="feature-item">🎁 Two festive variants to match your holiday mood</div>
                <div class="feature-item">🌟 Full semantic highlighting with Christmas spirit</div>
            </div>
            
            <div class="instructions">
                <h3>🎯 How to activate your festive theme:</h3>
                <div class="step"><span class="step-number">1.</span> Open VS Code Command Palette (Ctrl+Shift+P / Cmd+Shift+P)</div>
                <div class="step"><span class="step-number">2.</span> Type "Preferences: Color Theme"</div>
                <div class="step"><span class="step-number">3.</span> Select "Coca-Cola Christmas" or "Coca-Cola Christmas Soft"</div>
                <div class="step"><span class="step-number">4.</span> Enjoy coding with holiday spirit! 🎄</div>
            </div>
            
            <div class="holiday-message">
                <p><strong>🎄 Holiday Coding Tips:</strong></p>
                <p>• Use the regular theme for that classic Christmas feeling</p>
                <p>• Switch to the soft variant for late-night holiday coding sessions</p>
                <p>• Perfect for working on holiday projects and year-end deadlines</p>
                <p>• Share the festive spirit with your development team!</p>
            </div>
            
            <div style="margin: 40px 0;">
                <button class="button" onclick="activateTheme()">🎨 Choose Theme</button>
                <button class="button button-secondary" onclick="openSettings()">⚙️ Open Settings</button>
            </div>
            
            <p style="margin-top: 50px; color: #ffd700; font-size: 1.2em; font-weight: bold;">
                <span class="emoji">🎅</span>Happy Holiday Coding!<span class="emoji">🎄</span>
            </p>
            
            <p style="color: #d0d0d0; font-style: italic; margin-top: 20px;">
                May your code be bug-free and your holidays be bright! ✨
            </p>
        </div>
        
        <script>
            const vscode = acquireVsCodeApi();
            
            // Generate animated snowflakes
            function createSnowflakes() {
                const snowflakesContainer = document.getElementById('snowflakes');
                const numberOfSnowflakes = 50;
                const snowflakeSymbols = ['❄', '❅', '❆', '✻', '✼', '❋'];
                
                for (let i = 0; i < numberOfSnowflakes; i++) {
                    const snowflake = document.createElement('div');
                    snowflake.className = 'snowflake';
                    snowflake.innerHTML = snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)];
                    snowflake.style.left = Math.random() * 100 + '%';
                    snowflake.style.animationDelay = Math.random() * 10 + 's';
                    snowflake.style.animationDuration = (Math.random() * 10 + 10) + 's';
                    snowflake.style.fontSize = (Math.random() * 0.8 + 0.8) + 'em';
                    snowflakesContainer.appendChild(snowflake);
                }
            }
            
            function activateTheme() {
                vscode.postMessage({
                    command: 'activateTheme'
                });
            }
            
            function openSettings() {
                vscode.postMessage({
                    command: 'openSettings'
                });
            }
            
            // Initialize snowflakes when page loads
            createSnowflakes();
            
            // Add some interactive holiday magic
            document.addEventListener('click', function(e) {
                // Create a small sparkle effect on click
                const sparkle = document.createElement('div');
                sparkle.style.position = 'fixed';
                sparkle.style.left = e.clientX + 'px';
                sparkle.style.top = e.clientY + 'px';
                sparkle.style.color = '#ffd700';
                sparkle.style.fontSize = '20px';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.zIndex = '1000';
                sparkle.innerHTML = '✨';
                sparkle.style.animation = 'sparkleEffect 1s ease-out forwards';
                document.body.appendChild(sparkle);
                
                setTimeout(() => {
                    document.body.removeChild(sparkle);
                }, 1000);
            });
            
            // Add sparkle effect CSS
            const style = document.createElement('style');
            style.textContent = \`
                @keyframes sparkleEffect {
                    0% {
                        transform: scale(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(1.5) rotate(180deg);
                        opacity: 0;
                    }
                }
            \`;
            document.head.appendChild(style);
        </script>
    </body>
    </html>
    `;
}

/**
 * Called when the extension is deactivated
 */
function deactivate() {
    console.log('🎄 Coca-Cola Christmas Theme extension deactivated. Happy holidays!');
}

module.exports = {
    activate,
    deactivate
};
