// Initialize Supabase
const SUPABASE_URL = 'https://fgouqngfrxlfipufgxpy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnb3VxbmdmcnhsZmlwdWZneHB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5NzU5NzcsImV4cCI6MjA1MzU1MTk3N30.sb_publishable_ua8lZLKTyC-WZxf-1-h99A_FqH6ci9O';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Generate referral code
function generateReferralCode(firstName) {
    const randomDigits = Math.floor(10 + Math.random() * 90);
    return `MET-${firstName}-${randomDigits}`.toUpperCase();
}

// Check if code exists
async function isCodeUnique(code) {
    const { data, error } = await supabase
        .from('referral_users')
        .select('referral_code')
        .eq('referral_code', code)
        .single();
    
    return !data;
}

// Generate unique code
async function generateUniqueCode(firstName) {
    let code = generateReferralCode(firstName);
    let attempts = 0;
    
    while (!(await isCodeUnique(code)) && attempts < 10) {
        code = generateReferralCode(firstName);
        attempts++;
    }
    
    return code;
}

// Handle form submission
document.getElementById('referral-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const errorDiv = document.getElementById('error-message');
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    
    // Clear previous errors
    errorDiv.textContent = '';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';
    
    try {
        // Check for duplicate email
        const { data: existingUser } = await supabase
            .from('referral_users')
            .select('email')
            .eq('email', email)
            .single();
        
        if (existingUser) {
            errorDiv.textContent = 'This email is already registered.';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Get My Referral Code';
            return;
        }
        
        // Generate unique referral code
        const firstName = fullName.split(' ')[0];
        const referralCode = await generateUniqueCode(firstName);
        
        // Insert into Supabase
        const { data, error } = await supabase
            .from('referral_users')
            .insert([
                {
                    full_name: fullName,
                    email: email,
                    referral_code: referralCode,
                    created_at: new Date().toISOString()
                }
            ])
            .select();
        
        if (error) throw error;
        
        // Show success view
        showSuccessView(referralCode);
        
    } catch (error) {
        console.error('Error:', error);
        errorDiv.textContent = 'Something went wrong. Please try again.';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Get My Referral Code';
    }
});

// Show success view
function showSuccessView(code) {
    const form = document.getElementById('referral-form').parentElement;
    form.querySelector('form').style.display = 'none';
    document.getElementById('success-view').style.display = 'block';
    document.getElementById('referral-code').textContent = code;
    
    const shareMessage = `Check out Modern Edge Technologies (MET)\nhttps://modernedgetech.co.za\n\nUse my referral code: ${code}`;
    document.getElementById('share-text').textContent = shareMessage;
    
    // Copy code button
    document.getElementById('copy-btn').addEventListener('click', () => {
        copyToClipboard(code, 'copy-btn');
    });
    
    // Copy message button
    document.getElementById('copy-message-btn').addEventListener('click', () => {
        copyToClipboard(shareMessage, 'copy-message-btn');
    });
}

// Copy to clipboard
function copyToClipboard(text, btnId) {
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById(btnId);
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.backgroundColor = '#27ae60';
        btn.style.color = 'white';
        btn.style.borderColor = '#27ae60';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = '';
            btn.style.color = '';
            btn.style.borderColor = '';
        }, 2000);
    });
}

// Form focus functionality
const formItems = document.querySelectorAll('.form-item');
formItems.forEach(item => {
    const input = item.querySelector('input');
    const title = item.querySelector('h3');
    
    if (input && title) {
        title.addEventListener('click', () => {
            item.classList.add('focused');
            input.focus();
        });
        
        input.addEventListener('focus', () => {
            item.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                item.classList.remove('focused');
            }
        });
    }
});

