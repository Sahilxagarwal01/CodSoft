class Calculator {
    constructor() {
        this.primaryDisplay = document.getElementById('primaryDisplay');
        this.secondaryDisplay = document.getElementById('secondaryDisplay');
        this.themeToggle = document.getElementById('themeToggle');
        this.calculator = document.querySelector('.calculator');
        
        this.currentInput = '0';
        this.previousInput = null;
        this.operation = null;
        this.shouldResetDisplay = false;
        this.lastOperation = null;
        this.lastOperand = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupTheme();
        this.updateDisplay();
    }
    
    setupEventListeners() {
        // Button clicks
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleButtonClick(e.target);
                this.animateButton(e.target);
            });
        });
        
        // Theme toggle
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardInput(e);
        });
        
        // Prevent context menu on buttons
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('contextmenu', (e) => {
                e.preventDefault();
            });
        });
    }
    
    setupTheme() {
        const savedTheme = localStorage.getItem('calculator-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('calculator-theme', newTheme);
        this.updateThemeIcon(newTheme);
        
        // Animate theme toggle button
        this.themeToggle.classList.add('pulse');
        setTimeout(() => {
            this.themeToggle.classList.remove('pulse');
        }, 300);
    }
    
    updateThemeIcon(theme) {
        const icon = this.themeToggle.querySelector('.theme-icon');
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    
    handleButtonClick(button) {
        const action = button.dataset.action;
        const number = button.dataset.number;
        
        if (number !== undefined) {
            this.inputNumber(number);
        } else if (action) {
            this.handleAction(action);
        }
    }
    
    handleKeyboardInput(e) {
        e.preventDefault();
        
        const key = e.key;
        const keyMappings = {
            '0': () => this.inputNumber('0'),
            '1': () => this.inputNumber('1'),
            '2': () => this.inputNumber('2'),
            '3': () => this.inputNumber('3'),
            '4': () => this.inputNumber('4'),
            '5': () => this.inputNumber('5'),
            '6': () => this.inputNumber('6'),
            '7': () => this.inputNumber('7'),
            '8': () => this.inputNumber('8'),
            '9': () => this.inputNumber('9'),
            '.': () => this.handleAction('decimal'),
            '+': () => this.handleAction('add'),
            '-': () => this.handleAction('subtract'),
            '*': () => this.handleAction('multiply'),
            '/': () => this.handleAction('divide'),
            '=': () => this.handleAction('equals'),
            'Enter': () => this.handleAction('equals'),
            'Escape': () => this.handleAction('clear'),
            'Backspace': () => this.handleAction('backspace'),
            '%': () => this.handleAction('percent')
        };
        
        if (keyMappings[key]) {
            keyMappings[key]();
            this.highlightKeyboardButton(key);
        }
    }
    
    highlightKeyboardButton(key) {
        const buttonMappings = {
            '0': '[data-number="0"]',
            '1': '[data-number="1"]',
            '2': '[data-number="2"]',
            '3': '[data-number="3"]',
            '4': '[data-number="4"]',
            '5': '[data-number="5"]',
            '6': '[data-number="6"]',
            '7': '[data-number="7"]',
            '8': '[data-number="8"]',
            '9': '[data-number="9"]',
            '.': '[data-action="decimal"]',
            '+': '[data-action="add"]',
            '-': '[data-action="subtract"]',
            '*': '[data-action="multiply"]',
            '/': '[data-action="divide"]',
            '=': '[data-action="equals"]',
            'Enter': '[data-action="equals"]',
            'Escape': '[data-action="clear"]',
            '%': '[data-action="percent"]'
        };
        
        if (buttonMappings[key]) {
            const button = document.querySelector(buttonMappings[key]);
            if (button) {
                this.animateButton(button);
            }
        }
    }
    
    animateButton(button) {
        button.classList.add('pulse');
        setTimeout(() => {
            button.classList.remove('pulse');
        }, 300);
    }
    
    inputNumber(num) {
        if (this.shouldResetDisplay) {
            this.currentInput = '0';
            this.shouldResetDisplay = false;
        }
        
        if (this.currentInput === '0' && num !== '.') {
            this.currentInput = num;
        } else {
            this.currentInput += num;
        }
        
        this.updateDisplay();
        this.animateDisplay();
    }
    
    handleAction(action) {
        switch (action) {
            case 'clear':
                this.clear();
                break;
            case 'backspace':
                this.backspace();
                break;
            case 'decimal':
                this.inputDecimal();
                break;
            case 'percent':
                this.percent();
                break;
            case 'toggle-sign':
                this.toggleSign();
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                this.setOperation(action);
                break;
            case 'equals':
                this.calculate();
                break;
        }
    }
    
    clear() {
        this.currentInput = '0';
        this.previousInput = null;
        this.operation = null;
        this.shouldResetDisplay = false;
        this.lastOperation = null;
        this.lastOperand = null;
        this.updateDisplay();
        this.clearOperatorStates();
    }
    
    backspace() {
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
        this.updateDisplay();
    }
    
    inputDecimal() {
        if (this.shouldResetDisplay) {
            this.currentInput = '0';
            this.shouldResetDisplay = false;
        }
        
        if (!this.currentInput.includes('.')) {
            this.currentInput += '.';
            this.updateDisplay();
        }
    }
    
    percent() {
        const current = parseFloat(this.currentInput);
        this.currentInput = (current / 100).toString();
        this.updateDisplay();
        this.animateDisplay();
    }
    
    toggleSign() {
        if (this.currentInput !== '0') {
            if (this.currentInput.startsWith('-')) {
                this.currentInput = this.currentInput.slice(1);
            } else {
                this.currentInput = '-' + this.currentInput;
            }
            this.updateDisplay();
        }
    }
    
    setOperation(op) {
        if (this.operation && !this.shouldResetDisplay) {
            this.calculate();
        }
        
        this.operation = op;
        this.previousInput = this.currentInput;
        this.shouldResetDisplay = true;
        
        this.updateSecondaryDisplay();
        this.highlightOperator(op);
    }
    
    calculate() {
        if (this.operation && this.previousInput !== null) {
            const prev = parseFloat(this.previousInput);
            const current = parseFloat(this.currentInput);
            let result;
            
            try {
                switch (this.operation) {
                    case 'add':
                        result = prev + current;
                        break;
                    case 'subtract':
                        result = prev - current;
                        break;
                    case 'multiply':
                        result = prev * current;
                        break;
                    case 'divide':
                        if (current === 0) {
                            throw new Error('Division by zero');
                        }
                        result = prev / current;
                        break;
                    default:
                        return;
                }
                
                // Store for repeat calculations
                this.lastOperation = this.operation;
                this.lastOperand = current;
                
                this.currentInput = this.formatResult(result);
                this.previousInput = null;
                this.operation = null;
                this.shouldResetDisplay = true;
                
                this.updateDisplay();
                this.updateSecondaryDisplay();
                this.clearOperatorStates();
                this.animateDisplay();
                
            } catch (error) {
                this.handleError(error.message);
            }
        } else if (this.lastOperation && this.lastOperand !== null) {
            // Repeat last operation
            const current = parseFloat(this.currentInput);
            let result;
            
            try {
                switch (this.lastOperation) {
                    case 'add':
                        result = current + this.lastOperand;
                        break;
                    case 'subtract':
                        result = current - this.lastOperand;
                        break;
                    case 'multiply':
                        result = current * this.lastOperand;
                        break;
                    case 'divide':
                        if (this.lastOperand === 0) {
                            throw new Error('Division by zero');
                        }
                        result = current / this.lastOperand;
                        break;
                }
                
                this.currentInput = this.formatResult(result);
                this.shouldResetDisplay = true;
                this.updateDisplay();
                this.animateDisplay();
                
            } catch (error) {
                this.handleError(error.message);
            }
        }
    }
    
    formatResult(result) {
        if (isNaN(result) || !isFinite(result)) {
            throw new Error('Invalid calculation');
        }
        
        // Handle very large or very small numbers
        if (Math.abs(result) > 1e15 || (Math.abs(result) < 1e-6 && result !== 0)) {
            return result.toExponential(6);
        }
        
        // Round to avoid floating point precision issues
        const rounded = Math.round(result * 1e12) / 1e12;
        return rounded.toString();
    }
    
    handleError(message) {
        this.currentInput = 'Error';
        this.primaryDisplay.textContent = message;
        this.calculator.classList.add('error');
        
        setTimeout(() => {
            this.calculator.classList.remove('error');
            this.clear();
        }, 2000);
    }
    
    updateDisplay() {
        this.primaryDisplay.textContent = this.currentInput;
    }
    
    updateSecondaryDisplay() {
        if (this.operation && this.previousInput !== null) {
            const operatorSymbols = {
                'add': '+',
                'subtract': '-',
                'multiply': '×',
                'divide': '÷'
            };
            this.secondaryDisplay.textContent = `${this.previousInput} ${operatorSymbols[this.operation]}`;
        } else {
            this.secondaryDisplay.textContent = '';
        }
    }
    
    animateDisplay() {
        this.primaryDisplay.classList.add('animate');
        setTimeout(() => {
            this.primaryDisplay.classList.remove('animate');
        }, 300);
    }
    
    highlightOperator(operation) {
        this.clearOperatorStates();
        
        const operatorButtons = {
            'add': '[data-action="add"]',
            'subtract': '[data-action="subtract"]',
            'multiply': '[data-action="multiply"]',
            'divide': '[data-action="divide"]'
        };
        
        if (operatorButtons[operation]) {
            const button = document.querySelector(operatorButtons[operation]);
            if (button) {
                button.classList.add('active');
            }
        }
    }
    
    clearOperatorStates() {
        document.querySelectorAll('.btn-operator').forEach(btn => {
            btn.classList.remove('active');
        });
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});

// Add some nice sound effects (optional)
class SoundManager {
    constructor() {
        this.audioContext = null;
        this.init();
    }
    
    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Audio not supported');
        }
    }
    
    playTone(frequency, duration) {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }
    
    playClickSound() {
        this.playTone(800, 0.1);
    }
    
    playOperatorSound() {
        this.playTone(600, 0.15);
    }
    
    playEqualsSound() {
        this.playTone(1000, 0.2);
    }
}

// Optional: Initialize sound manager
// const soundManager = new SoundManager();